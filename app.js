/* JS Quest UI. Plain JavaScript, no build step. */
(function () {
  "use strict";
  var JSQ = window.JSQ;
  var lectures = JSQ.lectures;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); };

  /* ───────── language (EN / UK) ───────── */
  var lang = "en";
  try { lang = localStorage.getItem("jsquest.lang") || (/^uk|^ru/.test(navigator.language) ? "uk" : "en"); } catch (e) {}
  function t(key) {
    var d = JSQ.ui[lang][key]; if (d === undefined) d = JSQ.ui.en[key];
    var a = arguments;
    return typeof d === "string" ? d.replace(/\{(\d)\}/g, function (m, i) { return a[+i + 1]; }) : d;
  }
  // texts of a level in the current language (English fills any gap)
  function tr(entry) {
    var lv = entry.lv, u = lang === "uk" && JSQ.uk && JSQ.uk[entry.lec.id], l = (u && u.levels[lv.id]) || {}, c = (u && u.chapters[entry.ch.id]) || {};
    return {
      title: l.title || lv.title, story: l.story || lv.story, learn: l.learn || lv.learn, task: l.task || lv.task,
      starter: l.starter !== undefined ? l.starter : lv.starter, hints: l.hints || lv.hints || [],
      goals: (lv.goals || []).map(function (g, i) { return (l.goals && l.goals[i]) || g.text; }),
      why: function (i) { return (l.why && l.why[i]) || lv.questions[i].why; },
      chTitle: c.title || entry.ch.title, chPart: c.part || entry.ch.part,
      lecTitle: (u && u.title) || entry.lec.title
    };
  }

  /* ───────── state (progress is saved in this browser only) ───────── */
  var STORE = "jsquest.v1";
  var save = { done: {} };
  try { save = JSON.parse(localStorage.getItem(STORE)) || save; } catch (e) {}
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(save)); } catch (e) {} }

  var flat = [];   // every level with its lecture & chapter
  lectures.forEach(function (lec) {
    lec.chapters.forEach(function (ch) {
      ch.levels.forEach(function (lv) { flat.push({ lec: lec, ch: ch, lv: lv, key: lec.id + "/" + lv.id }); });
    });
  });
  var cur = null;       // current entry in flat
  var penalty = 0;      // stars lost on this level (hints, wrong guesses)
  var hintsShown = 0;
  var usedSolution = false;

  /* ───────── syntax highlighting (tiny tokenizer) ───────── */
  var KW = /^(const|let|var|if|else|for|while|do|switch|case|break|continue|function|return|typeof|new|of|in|class|try|catch|throw|async|await)$/;
  var LIT = /^(true|false|null|undefined|NaN|Infinity)$/;
  function hl(code) {
    var re = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\.|[^`\\])*`?)|(\b0x[\da-fA-F]+n?\b|\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?n?\b)|([A-Za-z_$][\w$]*)|([\s\S])/g;
    var out = "", m;
    while ((m = re.exec(code))) {
      if (m[1]) out += '<span class="tk-c">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tk-s">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tk-n">' + esc(m[3]) + "</span>";
      else if (m[4]) {
        var w = m[4];
        if (KW.test(w)) out += '<span class="tk-k">' + w + "</span>";
        else if (LIT.test(w)) out += '<span class="tk-l">' + w + "</span>";
        else if (code.charAt(re.lastIndex) === "(") out += '<span class="tk-f">' + w + "</span>";
        else out += esc(w);
      } else out += esc(m[5]);
    }
    return out;
  }
  function gutter(from, count) { var s = []; for (var i = 0; i < count; i++) s.push(from + i); return s.join("\n"); }

  /* ───────── level rendering ───────── */
  function entryFromHash() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    return flat.filter(function (e) { return e.key === h; })[0];
  }
  function firstUndone() { return flat.filter(function (e) { return !save.done[e.key]; })[0] || flat[0]; }

  function open(entry) {
    cur = entry; cur.tv = tr(entry); penalty = 0; hintsShown = 0; usedSolution = false;
    if (location.hash !== "#" + entry.key) history.replaceState(null, "", "#" + entry.key);
    var lv = entry.lv, tv = entry.tv, idx = flat.indexOf(entry);
    $("#lecName").textContent = t("lecture", entry.lec.num);
    $("#levelNo").textContent = t("level", idx + 1, flat.length);
    document.title = tv.title + " · JS Quest";
    $("#win").hidden = true;
    $("#bubble").innerHTML = tv.story;
    setBit("idle");

    var prev = flat[idx - 1], next = flat[idx + 1];
    $("#lesson").innerHTML =
      '<span class="tag">' + entry.ch.emoji + " " + esc(tv.chTitle) + " · " + esc(tv.chPart) + "</span>" +
      "<h1>" + esc(tv.title) + "</h1>" +
      "<h3>" + t("learn") + "</h3>" + tv.learn +
      '<div class="mission"><b class="t">' + t("mission") + "</b>" + tv.task + "</div>" +
      '<div class="hints" id="hints"></div>' +
      '<div class="row"><button class="btn" id="hintBtn"></button><button class="ghost" id="solBtn" hidden>' + t("showSol") + '</button></div>' +
      '<div class="nav"><button class="btn" id="prevBtn"' + (prev ? "" : " disabled") + ">" + t("prev") + "</button>" +
      '<button class="btn" id="nextBtn"' + (next ? "" : " disabled") + ">" + t("next") + "</button></div>";
    Array.prototype.forEach.call(document.querySelectorAll("#lesson pre.ex"), function (p) { p.innerHTML = hl(p.textContent); });
    $("#prevBtn").onclick = function () { prev && open(prev); };
    $("#nextBtn").onclick = function () { next && open(next); };
    $("#hintBtn").onclick = showHint;
    $("#solBtn").onclick = showSolution;
    updateHintBtn();

    renderFun(entry);
    if (lv.type === "predict") renderPredict(); else renderEditor();
    renderStage(null);
    updateProgress();
    window.scrollTo({ top: 0 });
  }

  /* "Fun corner": facts, jokes and memes under the lesson (only if the level has some) */
  function renderFun(entry) {
    var box = $("#fun"), f = JSQ.fun && JSQ.fun[entry.lec.id] && JSQ.fun[entry.lec.id][entry.lv.id];
    var items = f && (f[lang] || f.en);
    if (!items || !items.length) { box.hidden = true; box.innerHTML = ""; return; }
    box.innerHTML = "<h3>" + t("funTitle") + "</h3>" + items.map(function (it) {
      return '<div class="fi ' + it.k + '"><span class="fk">' + t(it.k) + "</span><p>" + it.t + "</p>" +
        (it.code ? '<pre class="ex">' + hl(it.code) + "</pre>" : "") +
        (it.img ? '<img src="' + it.img + '" alt="" loading="lazy">' : "") + "</div>";
    }).join("");
    box.hidden = false;
  }

  function updateHintBtn() {
    var n = cur.tv.hints.length;
    if (!n) { $("#hintBtn").hidden = true; return; }
    var left = n - hintsShown;
    $("#hintBtn").textContent = left ? t("hint", left) : t("noHints");
    $("#hintBtn").disabled = !left;
    $("#solBtn").hidden = left > 0 || cur.lv.type === "predict";
  }
  function showHint() {
    var h = cur.tv.hints[hintsShown++];
    var d = document.createElement("div"); d.className = "hint"; d.innerHTML = "💡 " + h;
    $("#hints").appendChild(d);
    penalty = Math.min(2, penalty + 1);
    updateHintBtn();
  }
  function showSolution() {
    usedSolution = true; penalty = 2;
    setCode(cur.lv.solution);
    $("#solBtn").hidden = true;
    say(t("solMsg"));
  }

  /* ───────── editor ───────── */
  var ta, hlPre, gut;
  function renderEditor() {
    var lv = cur.lv, pre = lv.prelude || "";
    var preLines = pre ? pre.split("\n").length : 0;
    $("#play").innerHTML =
      '<div class="editor">' +
      (pre ? '<div class="code-block given"><div class="gutter">' + gutter(1, preLines) + "</div><pre>" + hl(pre) + '</pre><span class="lock">' + t("given") + '</span></div>' : "") +
      '<div class="code-block"><div class="gutter" id="gut"></div><div class="codearea"><pre id="hlPre" aria-hidden="true"></pre>' +
      '<textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor"></textarea></div></div></div>' +
      '<div class="toolbar"><button class="btn primary" id="runBtn">' + t("run") + '</button><button class="btn" id="resetBtn">' + t("reset") + '</button>' +
      '<span class="sp"></span><small>' + t("runKeys") + '</small></div>' +
      '<div class="console" id="console" aria-live="polite"><div class="hd">' + t("console") + '</div><div class="l dim">' + t("pressRun") + '</div></div>';
    ta = $("#code"); hlPre = $("#hlPre"); gut = $("#gut");
    gut.dataset.from = preLines + 1;
    var saved = sessionStorage.getItem("jsq-code-" + cur.key);
    setCode(saved !== null ? saved : cur.tv.starter);
    ta.addEventListener("input", function () { paint(); try { sessionStorage.setItem("jsq-code-" + cur.key, ta.value); } catch (e) {} });
    ta.addEventListener("keydown", onKey);
    $("#runBtn").onclick = runCode;
    $("#resetBtn").onclick = function () { setCode(cur.tv.starter); try { sessionStorage.removeItem("jsq-code-" + cur.key); } catch (e) {} ta.focus(); };
  }
  function setCode(v) { ta.value = v; paint(); }
  function paint() {
    var lines = Math.max(ta.value.split("\n").length, 5);
    hlPre.innerHTML = hl(ta.value) + "\n" + new Array(Math.max(0, lines - ta.value.split("\n").length) + 1).join("\n");
    gut.textContent = gutter(+gut.dataset.from, lines);
  }
  function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); runCode(); return; }
    var s = ta.selectionStart, t = ta.selectionEnd, v = ta.value;
    if (e.key === "Tab") {
      e.preventDefault();
      ta.setRangeText("  ", s, t, "end"); ta.dispatchEvent(new Event("input"));
    } else if (e.key === "Enter") {
      var lineStart = v.lastIndexOf("\n", s - 1) + 1;
      var indent = /^[ \t]*/.exec(v.slice(lineStart, s))[0];
      var extra = /[{(\[]\s*$/.test(v.slice(lineStart, s)) ? "  " : "";
      e.preventDefault();
      ta.setRangeText("\n" + indent + extra, s, t, "end"); ta.dispatchEvent(new Event("input"));
    }
  }

  /* ───────── running ───────── */
  var running = false;
  async function runCode() {
    if (running) return; running = true;
    var btn = $("#runBtn"); btn.disabled = true; btn.textContent = t("running");
    var code = ta.value;
    var r = await JSQ.run(cur.lv.prelude || "", code, cur.lv.capture || []);
    r.code = code;
    btn.disabled = false; btn.textContent = t("run"); running = false;
    renderConsole(r);
    var pass = renderStage(r);
    if (r.error) { setBit("sad"); say(explainError(r.error)); }
    else if (pass) win();
    else { setBit("idle"); say(t("notQuite")); }
  }

  function explainError(e) {
    var m = esc(e.message);
    if (e.name === "Timeout") return t("eTimeout");
    if (e.name === "SyntaxError") return t("eSyntax", m);
    if (/before initialization/.test(e.message)) return t("eTdz", m);
    if (/is not defined/.test(e.message)) return t("eNotDef", m);
    if (/constant variable/.test(e.message)) return t("eConst", m);
    if (/is not a function/.test(e.message)) return t("eFn", m);
    return t("eGeneric", esc(e.name + ": " + e.message));
  }

  function renderConsole(r) {
    var c = $("#console"), h = '<div class="hd">' + t("console") + '</div>';
    if (!r.logs.length && !r.error) h += '<div class="l dim">' + t("nothing") + '</div>';
    r.logs.forEach(function (l) { h += '<div class="l ' + l.type + '">' + (l.type === "error" ? "✖ " : l.type === "warn" ? "⚠ " : "› ") + esc(l.text) + "</div>"; });
    if (r.error) h += '<div class="l err">✖ ' + esc(r.error.name + ": " + r.error.message) + "</div>";
    c.innerHTML = h; c.scrollTop = c.scrollHeight;
  }

  /* stage: crates + goals. Returns true if all goals pass and there's no error. */
  function renderStage(r) {
    var lv = cur.lv, crates = lv.crates || (lv.capture || []).map(function (n) { return { name: n }; });
    $("#crates").innerHTML = crates.map(function (c) {
      var v = r && r.vars[c.name];
      var cls = "crate";
      if (v) cls += " t-" + v.type + (c.type ? (v.type === c.type ? " ok" : " wrong") : "");
      else cls += " empty";
      var label = c.type ? '<span>' + c.type + "?</span>" : "";
      return '<div class="' + cls + '"><div class="nm"><span>' + esc(c.name) + "</span>" + label + "</div>" +
        '<div class="vl">' + (v ? esc(v.text) : t("empty")) + '</div><div class="ty">' + (v ? v.type : t("notCreated")) + "</div></div>";
    }).join("");
    var all = true;
    $("#goals").innerHTML = (lv.goals || []).map(function (g, gi) {
      var ok = false;
      if (r) { try { ok = !!g.test(r); } catch (e) { ok = false; } }
      if (!ok) all = false;
      return '<li class="' + (r ? (ok ? "ok" : "no") : "") + '"><i>' + (r ? (ok ? "✓" : "✗") : "") + "</i><span>" + esc(cur.tv.goals[gi]) + "</span></li>";
    }).join("");
    return !!r && !r.error && all;
  }

  /* ───────── predict levels ───────── */
  function renderPredict() {
    var lv = cur.lv, answered = 0;
    $("#play").innerHTML = '<div class="predict" id="pq"></div>';
    var root = $("#pq");
    $("#crates").innerHTML = ""; $("#goals").innerHTML = "";
    lv.questions.forEach(function (q, qi) {
      q = Object.assign({}, q, { why: cur.tv.why(qi) });
      var box = document.createElement("div"); box.className = "q";
      box.innerHTML = '<pre class="ex">' + hl(q.code) + '</pre><div class="opts"></div><div class="res"></div>';
      var opts = $(".opts", box);
      q.options.forEach(function (o) {
        var b = document.createElement("button");
        b.textContent = o === "error" ? t("anError") : o;
        b.dataset.v = o;
        b.onclick = function () { answer(q, box, b, o); };
        opts.appendChild(b);
      });
      root.appendChild(box);
    });
    function answer(q, box, btn, choice) {
      Array.prototype.forEach.call($$(".opts button", box), function (x) { x.disabled = true; });
      JSQ.run("", q.code, []).then(function (r) {
        var actual = r.error ? "error" : r.logs[0] ? r.logs[0].text : "";
        var right = actual === choice;
        if (!right) penalty = Math.min(2, penalty + 1);
        Array.prototype.forEach.call($$(".opts button", box), function (x) {
          if (x.dataset.v === actual) x.classList.add("right");
          else if (x === btn) x.classList.add("miss");
        });
        $(".res", box).innerHTML = (right ? t("correct") : t("wrong")) + t("itPrints") + '<span class="out">' + esc(actual) + "</span>. " + q.why;
        setBit(right ? "happy" : "sad");
        say(right ? t("yes") : t("ha"));
        answered++;
        if (answered === lv.questions.length) setTimeout(win, 900);
      });
    }
  }
  function $$(s, el) { return (el || document).querySelectorAll(s); }

  /* ───────── win ───────── */
  function stars() { return usedSolution ? 1 : Math.max(1, 3 - penalty); }
  function win() {
    var s = stars(), prevStars = save.done[cur.key] || 0;
    if (s > prevStars) save.done[cur.key] = s; persist();
    updateProgress();
    setBit("happy"); say(t("done") + t("praise")[s]);
    var idx = flat.indexOf(cur), next = flat[idx + 1];
    var w = $("#win");
    w.innerHTML = "<h2>" + t("winTitle") + "</h2><div class='st'>" + "★".repeat(s) + "☆".repeat(3 - s) + "</div>" +
      "<p>" + (next ? t("readyNext") : t("finished")) + "</p>" +
      "<div class='row'><button class='btn' id='stay'>" + t("stay") + "</button>" +
      (next ? "<button class='btn primary' id='go'>" + t("nextLevel") + "</button>" : "<button class='btn primary' id='all'>" + t("seeAll") + "</button>") + "</div>";
    w.hidden = false;
    $("#stay").onclick = function () { w.hidden = true; };
    if (next) { $("#go").onclick = function () { open(next); }; $("#go").focus(); }
    else $("#all").onclick = openMenu;
    confetti();
  }

  /* ───────── mascot & bubble ───────── */
  function setBit(state) { $("#bit").setAttribute("class", "bit " + state); }
  function say(html) { $("#bubble").innerHTML = html; }

  /* ───────── progress & menu ───────── */
  function updateProgress() {
    var done = flat.filter(function (e) { return save.done[e.key]; }).length;
    var st = flat.reduce(function (a, e) { return a + (save.done[e.key] || 0); }, 0);
    $("#bar").style.width = (100 * done / flat.length) + "%";
    $("#progText").textContent = done + "/" + flat.length;
    $("#starTotal").textContent = "★ " + st + "/" + flat.length * 3;
  }
  function openMenu() {
    var h = "";
    lectures.forEach(function (lec) {
      h += "<h2 style='font-size:1rem;margin:12px 0 0'>" + esc(t("lectureLine", lec.num, tr({ lec: lec, ch: lec.chapters[0], lv: lec.chapters[0].levels[0] }).lecTitle)) + "</h2>";
      lec.chapters.forEach(function (ch) {
        var ct = tr({ lec: lec, ch: ch, lv: ch.levels[0] });
        h += '<div class="mch"><h3>' + ch.emoji + " " + esc(ct.chTitle) + "</h3><small>" + esc(ct.chPart) + '</small><div class="lv-grid">';
        ch.levels.forEach(function (lv) {
          var lt = tr({ lec: lec, ch: ch, lv: lv }).title;
          var key = lec.id + "/" + lv.id, i = flat.findIndex(function (e) { return e.key === key; }), s = save.done[key] || 0;
          h += '<button class="lv' + (cur && cur.key === key ? " cur" : "") + '" data-k="' + key + '"><b>' + t("level", i + 1, flat.length).replace(/\/\d+$/, "") + '</b>' + esc(lt) +
            '<span class="s">' + (s ? "★".repeat(s) + "☆".repeat(3 - s) : "&nbsp;") + "</span></button>";
        });
        h += "</div></div>";
      });
    });
    $("#menuBody").innerHTML = h;
    Array.prototype.forEach.call($$("#menuBody .lv"), function (b) {
      b.onclick = function () { $("#menu").close(); open(flat.filter(function (e) { return e.key === b.dataset.k; })[0]); };
    });
    $("#menu").showModal();
  }

  /* ───────── confetti ───────── */
  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cv = $("#confetti"), ctx = cv.getContext("2d");
    cv.width = innerWidth; cv.height = innerHeight;
    var colors = ["#f7df1e", "#7c5cff", "#3ddc97", "#ff6b7d", "#6cb6ff"];
    var ps = [];
    for (var i = 0; i < 120; i++) ps.push({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 12 - 3, r: 4 + Math.random() * 5, c: colors[i % 5], a: Math.random() * 6 });
    var t0 = performance.now();
    (function frame(t) {
      var dt = t - t0; ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(function (p) { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += .2; ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - dt / 1800); ctx.fillRect(p.x, p.y, p.r, p.r * .6); });
      if (dt < 1800) requestAnimationFrame(frame); else ctx.clearRect(0, 0, cv.width, cv.height);
    })(t0);
  }

  /* ───────── boot ───────── */
  $("#menuBtn").onclick = openMenu;
  $("#brand").onclick = function (e) { e.preventDefault(); open(firstUndone()); };
  $("#resetAll").onclick = function () {
    if (confirm(t("resetConfirm"))) { save = { done: {} }; persist(); updateProgress(); $("#menu").close(); open(flat[0]); }
  };
  function applyStatic() {
    document.documentElement.lang = lang;
    $("#menuTitle").textContent = t("chooseLevel"); $("#resetAll").textContent = t("resetAll");
    $("#videoLink").textContent = t("watch"); $("#langBtn").textContent = lang === "uk" ? "EN" : "УК";
    $("#langBtn").title = lang === "uk" ? "Switch to English" : "Перемкнути на українську";
  }
  $("#langBtn").onclick = function () {
    lang = lang === "uk" ? "en" : "uk"; try { localStorage.setItem("jsquest.lang", lang); } catch (e) {}
    applyStatic(); open(cur);
  };
  applyStatic();
  var vurl = lectures[0] && lectures[0].videoUrl;
  if (vurl) { $("#videoLink").href = vurl; $("#videoLink").hidden = false; }
  window.addEventListener("hashchange", function () { var e = entryFromHash(); if (e && e !== cur) open(e); });
  open(entryFromHash() || firstUndone());
})();
