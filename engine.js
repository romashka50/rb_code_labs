/* JS Quest engine: runs the learner's code safely (Web Worker, 2 s timeout) and reports what happened.
   Classic script (no modules) so index.html also works when double-clicked. */
(function (root) {
  // ---- everything between here and "end of worker code" is also stringified into the Worker ----
  function ser(v, depth) {
    depth = depth || 0;
    var t = v === null ? "null" : Array.isArray(v) ? "array" : typeof v;
    var text, out;
    try {
      if (t === "string") text = JSON.stringify(v);
      else if (t === "number") text = Object.is(v, -0) ? "-0" : String(v);
      else if (t === "bigint") text = v + "n";
      else if (t === "symbol") text = v.toString();
      else if (t === "function") text = "ƒ " + (v.name || "(anonymous)") + "()";
      else if (t === "array") text = depth > 1 ? "[…]" : "[" + v.map(function (x) { return ser(x, depth + 1).text; }).join(", ") + "]";
      else if (t === "object") {
        if (v instanceof String || v instanceof Number || v instanceof Boolean) text = v.constructor.name + " {" + ser(v.valueOf(), depth + 1).text + "}";
        else if (depth > 1) text = "{…}";
        else text = "{ " + Object.keys(v).map(function (k) { return k + ": " + ser(v[k], depth + 1).text; }).join(", ") + " }";
      } else text = String(v);
    } catch (e) { text = "[unprintable]"; }
    out = { type: t, text: text };
    if (t === "string" || t === "number" || t === "boolean" || t === "bigint" || t === "undefined" || t === "null") out.value = v;
    if (t === "array" && depth === 0) out.items = v.map(function (x) { return ser(x, 1); });
    return out;
  }

  function execute(prelude, code, capture) {
    var logs = [], vars = {}, error = null, raw = {};
    function fmt(x) { return typeof x === "string" ? x : ser(x).text; }
    function mk(type) {
      return function () {
        var a = Array.prototype.slice.call(arguments);
        if (logs.length < 200) logs.push({ type: type, args: a.map(function (x) { return ser(x); }), text: a.map(fmt).join(" ") });
      };
    }
    var con = { log: mk("log"), info: mk("log"), debug: mk("log"), warn: mk("warn"), error: mk("error") };
    var grab = capture.map(function (n) { return "try{__v[" + JSON.stringify(n) + "]=" + n + ";}catch(_e){}"; }).join("\n");
    try {
      var fn = new Function("console", "__v", (prelude || "") + "\n" + code + "\n" + grab);
      fn(con, raw);
    } catch (e) {
      error = { name: (e && e.name) || "Error", message: String((e && e.message) || e) };
    }
    Object.keys(raw).forEach(function (k) { vars[k] = ser(raw[k]); });
    return { logs: logs, vars: vars, error: error };
  }
  // ---- end of worker code ----

  var WORKER_SRC = "var ser=" + ser.toString() + ";var execute=" + execute.toString() +
    ";onmessage=function(e){var d=e.data;postMessage(execute(d.prelude,d.code,d.capture));};";

  // Runs code in a Worker (infinite-loop safe). Falls back to running inline if Workers are unavailable.
  function run(prelude, code, capture, timeoutMs) {
    timeoutMs = timeoutMs || 2000;
    return new Promise(function (resolve) {
      var worker, url, done = false, timer;
      function finish(r) {
        if (done) return; done = true;
        clearTimeout(timer);
        if (worker) worker.terminate();
        if (url) URL.revokeObjectURL(url);
        resolve(r);
      }
      function inline() { finish(execute(prelude, code, capture)); }
      try {
        url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
        worker = new Worker(url);
      } catch (e) { return inline(); }
      worker.onmessage = function (e) { finish(e.data); };
      worker.onerror = function (e) { e.preventDefault && e.preventDefault(); inline(); };
      timer = setTimeout(function () {
        finish({ logs: [], vars: {}, error: { name: "Timeout", message: "The code ran for more than 2 seconds. Is there an endless loop?" } });
      }, timeoutMs);
      worker.postMessage({ prelude: prelude || "", code: code, capture: capture || [] });
    });
  }

  root.JSQ = root.JSQ || {};
  root.JSQ.ser = ser;
  root.JSQ.execute = execute;
  root.JSQ.run = run;
  root.JSQ.lectures = root.JSQ.lectures || [];
})(typeof window !== "undefined" ? window : globalThis);
