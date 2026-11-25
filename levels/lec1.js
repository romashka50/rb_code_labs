/* Lecture 1 — JavaScript: Intro & Data Types.
   Level = { id, title, story, learn (HTML), task (HTML), prelude, starter, capture, crates, goals, hints, solution }
   or a "predict" level = { id, title, story, learn, task, type: "predict", questions }.
   Every level is verified by test/verify.mjs (solution passes, starter does not). */
(function (root) {
  var $ = function () { return Array.prototype.join.call(arguments, "\n"); };
  var out = function (r) { return r.logs.map(function (l) { return l.text; }); };
  var same = function (a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); };
  var V = function (r, n) { return r.vars[n]; };
  var is = function (r, n, type, value) {
    var v = V(r, n);
    return !!v && v.type === type && (value === undefined || Object.is(v.value, value));
  };
  // Strip comments (string-aware) so a keyword inside a comment never counts.
  var strip = function (code) {
    return code.replace(/("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, function (m, str) { return str || " "; });
  };
  var has = function (r, re) { return re.test(strip(r.code)); };
  var hasRaw = function (r, re) { return re.test(r.code); };
  var goal = function (text, test) { return { text: text, test: test }; };

  var chapters = [
    /* ───────────────────────── 1. Console ───────────────────────── */
    {
      id: "console", emoji: "🤖", title: "Wake up Bit", part: "Part 1 · Tools & first code",
      levels: [
        {
          id: "hello", title: "Hello, world!",
          story: "Hi! I'm Bit, a tiny robot who only understands JavaScript. I'm asleep. Say something to wake me up!",
          learn: `<p>JavaScript programs are lists of <b>statements</b>: one instruction each, usually ending with <code>;</code>.
                  The most useful instruction at the start is <code>console.log()</code>: it prints whatever you put in the brackets to the <b>console</b>
                  (in a real browser: DevTools → Console, or the terminal with Node.js).</p>
                  <pre class="ex">console.log('Text goes in quotes');
console.log("double quotes work too");
console.log(42);   // numbers don't need quotes</pre>
                  <p><b>Quotes:</b> single <code>'text'</code> and double <code>"text"</code> mean exactly the same, and you may use either. In this course we write <b>single quotes</b>; use double quotes when the text itself contains an apostrophe: <code>"it's fine"</code>. (A third kind, backticks, comes later.) The labs accept both.</p>
                  <p class="tip">💡 <b>Life hack:</b> <code>console.log</code> is the cheapest debugger in the world. When something is weird, print it.</p>`,
          task: `Print exactly <code>Hello, world!</code> to the console.`,
          starter: $("// Write your first line of JavaScript below", "console.log();"),
          capture: [],
          goals: [goal("The console shows Hello, world!", function (r) { return same(out(r), ["Hello, world!"]); })],
          hints: ["Text must be wrapped in quotes: <code>'like this'</code> (double quotes <code>\"like this\"</code> work too).", "Put the text between the brackets: <code>console.log('…');</code>"],
          solution: "console.log('Hello, world!');"
        },
        {
          id: "comments", title: "Silence the alarms",
          story: "I'm awake, but my alarm program is too noisy! I only want to hear “All quiet”. Don't delete the alarms, just mute them.",
          learn: `<p>A <b>comment</b> is text that JavaScript ignores. Programmers use it for notes and for temporarily switching code off.</p>
                  <pre class="ex">// a one-line comment
console.log('runs');
// console.log('does NOT run');

/* a comment that
   spans many lines */</pre>
                  <p class="tip">💡 <b>Life hack:</b> in VS Code select a line and press <kbd>Cmd/Ctrl</kbd>+<kbd>/</kbd> to comment it in one keystroke.</p>`,
          task: `Use comments so only <code>All quiet</code> is printed. Keep the alarm lines in the file.`,
          starter: $("console.log('All quiet');", "console.log('ALARM! Intruder!');", "console.log('ALARM! Fire!');"),
          capture: [],
          goals: [
            goal("Only “All quiet” is printed", function (r) { return same(out(r), ["All quiet"]); }),
            goal("The alarms are commented out, not deleted", function (r) { return hasRaw(r, /ALARM! Intruder/) && hasRaw(r, /ALARM! Fire/) && hasRaw(r, /\/\/|\/\*/); })
          ],
          hints: ["Put <code>//</code> at the start of a line to turn it into a comment.", "You need <code>//</code> in front of <b>both</b> ALARM lines. Or wrap both lines in one <code>/* … */</code> block."],
          solution: $("console.log('All quiet');", "// console.log('ALARM! Intruder!');", "// console.log('ALARM! Fire!');")
        },
        {
          id: "operators", title: "Cookie maths",
          story: "I have 17 cookies for 5 robot friends. Everyone gets the same, and I eat the leftovers. How many are left over?",
          learn: `<p>JavaScript is a calculator too. Besides <code>+ - * /</code> there are two handy operators:</p>
                  <ul><li><code>%</code> — <b>remainder</b> after division: <code>17 % 5</code> is <code>2</code> (3 each, 2 left)</li>
                  <li><code>**</code> — <b>power</b>: <code>2 ** 3</code> is <code>8</code></li></ul>
                  <pre class="ex">console.log(10 % 3);   // 1
console.log(2 ** 3);   // 8</pre>
                  <p class="tip">💡 <code>n % 2 === 0</code> is the classic “is this number even?” test.</p>`,
          task: `Print the leftover cookies (<code>17</code> by <code>5</code>), then on a second line print <code>2</code> to the power of <code>10</code>. Use the operators, don't type the answers.`,
          starter: $("// 1) leftover cookies", "// 2) two to the power of ten"),
          capture: [],
          goals: [
            goal("Output is 2 and then 1024", function (r) { return same(out(r), ["2", "1024"]); }),
            goal("You used the % operator and ** (Math.pow is fine too)", function (r) { return has(r, /%/) && has(r, /\*\*|Math\.pow/); })
          ],
          hints: ["Leftover = <code>17 % 5</code>.", "Two <code>console.log</code> lines: <code>console.log(17 % 5);</code> and <code>console.log(2 ** 10);</code>"],
          solution: $("console.log(17 % 5);", "console.log(2 ** 10);")
        }
      ]
    },

    /* ───────────────────────── 2. Variables ───────────────────────── */
    {
      id: "variables", emoji: "📦", title: "Crates", part: "Part 2 · Variables",
      levels: [
        {
          id: "let", title: "Your first crate",
          story: "I keep my things in labelled crates. A crate has a name and holds one value. Build me one!",
          learn: `<p>A <b>variable</b> is a named box for a value. Create it with <code>let</code>, give it a value with <code>=</code>.
                  Later you can put a new value into the same box:</p>
                  <pre class="ex">let lives = 3;      // create the box and fill it
lives = lives - 1;  // now it holds 2</pre>
                  <p>Notice: <code>let</code> is written only <b>once</b>, when the variable is born.</p>`,
          task: `Create a variable <code>coins</code> with <code>let</code>, holding <code>10</code>. Then add <code>5</code> more, so it holds <code>15</code>.`,
          starter: $("// 1) create coins with 10", "// 2) add 5 more to it"),
          capture: ["coins"],
          goals: [
            goal("Crate coins holds 15", function (r) { return is(r, "coins", "number", 15); }),
            goal("You created it with let", function (r) { return has(r, /\blet\s+coins\b/); })
          ],
          hints: ["Start with <code>let coins = 10;</code>", "On the next line: <code>coins = coins + 5;</code> (no <code>let</code> this time!)"],
          solution: $("let coins = 10;", "coins = coins + 5;")
        },
        {
          id: "const", title: "Locked crates",
          story: "My planet's name never changes, but the number of visitors does. Use the right crate for each!",
          learn: `<p><code>const</code> is a crate with a <b>lock</b>: you fill it once and can't put anything else in. Use it by default;
                  switch to <code>let</code> only when the value really has to change.</p>
                  <pre class="ex">const planet = 'Mars';   // never reassigned
let visitors = 0;        // will change
visitors = visitors + 1;</pre>
                  <p class="tip">💡 <b>Rule of thumb:</b> start with <code>const</code>. The day the code complains, you'll know you need <code>let</code>.</p>`,
          task: `Create <code>const planet</code> = <code>'Mars'</code>, and <code>let visitors</code> = <code>0</code>. Then add <code>3</code> visitors.`,
          starter: $("// planet: never changes", "// visitors: starts at 0, then +3"),
          capture: ["planet", "visitors"],
          crates: [{ name: "planet", type: "string" }, { name: "visitors", type: "number" }],
          goals: [
            goal("planet is the string “Mars”, made with const", function (r) { return is(r, "planet", "string", "Mars") && has(r, /\bconst\s+planet\b/); }),
            goal("visitors holds 3, made with let", function (r) { return is(r, "visitors", "number", 3) && has(r, /\blet\s+visitors\b/); })
          ],
          hints: ["<code>const planet = 'Mars';</code>", "<code>let visitors = 0;</code> then <code>visitors = visitors + 3;</code>"],
          solution: $("const planet = 'Mars';", "let visitors = 0;", "visitors = visitors + 3;")
        },
        {
          id: "const-error", title: "The lock bites back",
          story: "Oops. I tried to change a locked crate and my program crashed. Read my error message, it's actually helpful!",
          learn: `<p>Error messages are your friend: they say <b>what</b> went wrong. Here JavaScript throws
                  <code>TypeError: Assignment to constant variable.</code> because a <code>const</code> can't get a second value.</p>
                  <p>Two ways to fix it: use <code>let</code> if the value has to change, or stop changing it. Today we need to change it.</p>`,
          task: `Fix the program so it prints <code>10</code> and no error appears.`,
          starter: $("const score = 0;", "score = 10;", "console.log(score);"),
          capture: ["score"],
          goals: [
            goal("It prints 10", function (r) { return same(out(r), ["10"]); }),
            goal("score is a number: 10", function (r) { return is(r, "score", "number", 10); })
          ],
          hints: ["The value must be allowed to change. Which keyword allows that?", "Change <code>const</code> to <code>let</code> on the first line."],
          solution: $("let score = 0;", "score = 10;", "console.log(score);")
        },
        {
          id: "names", title: "Name it right",
          story: "I tried to name my crates, but JavaScript refuses some names. Help me find ones it accepts!",
          learn: `<p>Rules for variable names:</p>
                  <ul><li>letters, digits, <code>_</code> and <code>$</code> only (no spaces, no <code>-</code>)</li>
                  <li>can't start with a digit</li>
                  <li>can't be a reserved word like <code>class</code>, <code>let</code>, <code>if</code></li>
                  <li>case matters: <code>age</code> and <code>Age</code> are different</li></ul>
                  <p>By convention we write <code>camelCase</code>: <code>userName</code>, <code>totalPrice</code>.</p>`,
          task: `Rename the three variables to <code>speed2x</code>, <code>myName</code> and <code>className</code> so the last line can use them.`,
          starter: $("let 2fast = 1;", "let my-name = 'Bit';", "let class = 'robot';", "console.log(speed2x, myName, className);"),
          capture: [],
          goals: [goal("It prints: 1 Bit robot", function (r) { return same(out(r), ["1 Bit robot"]); })],
          hints: ["A name can't start with a digit: <code>2fast</code> → <code>speed2x</code>.", "Dashes aren't allowed (JS reads <code>my-name</code> as “my minus name”). Use camelCase: <code>myName</code>.", "<code>class</code> is reserved. Use <code>className</code>."],
          solution: $("let speed2x = 1;", "let myName = 'Bit';", "let className = 'robot';", "console.log(speed2x, myName, className);")
        },
        {
          id: "block-scope", title: "Treasure in the cave",
          story: "I buried my treasure inside a cave (curly braces) and now I can't see it from outside. Why?",
          learn: `<p><code>let</code> and <code>const</code> live only inside the <b>block</b> <code>{ … }</code> where they were created.
                  Outside of it the name doesn't exist: <code>ReferenceError: treasure is not defined</code>.</p>
                  <pre class="ex">if (true) {
  let secret = 1;   // visible only in here
}
console.log(secret); // 💥 ReferenceError</pre>
                  <p>To use a value outside, create the variable <b>outside</b> the block, then assign inside.</p>`,
          task: `Make the program print <code>gold</code> without removing the <code>if</code> block.`,
          starter: $("if (true) {", "  let treasure = 'gold';", "}", "console.log(treasure);"),
          capture: [],
          goals: [
            goal("It prints gold", function (r) { return same(out(r), ["gold"]); }),
            goal("The if block is still there", function (r) { return has(r, /if\s*\(/); })
          ],
          hints: ["Declare <code>let treasure;</code> <b>above</b> the <code>if</code>.", "Inside the block write only <code>treasure = 'gold';</code> (no <code>let</code>, or you'd create a second, inner variable)."],
          solution: $("let treasure;", "if (true) {", "  treasure = 'gold';", "}", "console.log(treasure);")
        },
        {
          id: "hoisting", title: "The ghost of var",
          story: "Old JavaScript used <code>var</code>. It behaves strangely. Look: I print the level before I set it, and I get a ghost: <code>undefined</code>.",
          learn: `<p><code>var</code> is the pre-2015 way to make variables. Two oddities:</p>
                  <ul><li><b>Hoisting:</b> the declaration is lifted to the top, but the value isn't. Reading it early gives <code>undefined</code>, not an error.</li>
                  <li><b>Function scope:</b> <code>var</code> ignores <code>{ }</code> blocks and leaks out of them.</li></ul>
                  <pre class="ex">console.log(a); // undefined (ghost!)
var a = 1;

console.log(b); // 💥 ReferenceError: Cannot access 'b' before initialization
let b = 1;</pre>
                  <p>That's why modern code uses <code>let</code> / <code>const</code>: mistakes are loud, not silent.</p>`,
          task: `Make the program print <code>3</code>. Also replace <code>var</code> with <code>let</code>: nobody uses <code>var</code> in new code.`,
          starter: $("console.log(level);", "var level = 3;"),
          capture: [],
          goals: [
            goal("It prints 3", function (r) { return same(out(r), ["3"]); }),
            goal("No var anywhere", function (r) { return !has(r, /\bvar\b/); })
          ],
          hints: ["A variable must get its value <b>before</b> you read it. Swap the two lines.", "<code>let level = 3;</code> first, then <code>console.log(level);</code>"],
          solution: $("let level = 3;", "console.log(level);")
        }
      ]
    },

    /* ───────────────────────── 3. Types ───────────────────────── */
    {
      id: "types", emoji: "🦁", title: "The type zoo", part: "Part 2 · Data types",
      levels: [
        {
          id: "types-1", title: "Meet three animals",
          story: "Every value in JavaScript has a <b>type</b>. Let's fill three crates with the three most common ones.",
          learn: `<p>JavaScript has 8 types: 7 <b>primitives</b> and objects. The three you'll use every day:</p>
                  <ul><li><b>string</b> — text in quotes: <code>'hello'</code> or <code>"hello"</code></li>
                  <li><b>number</b> — all numbers, whole or decimal: <code>42</code>, <code>3.14</code></li>
                  <li><b>boolean</b> — only <code>true</code> or <code>false</code></li></ul>
                  <p>Check a type with <code>typeof</code>: <code>typeof 'hi'</code> → <code>'string'</code>.</p>`,
          task: `Fill the crates: <code>title</code> with a string, <code>lives</code> with a number, <code>isAlive</code> with a boolean. Any values you like!`,
          starter: $("// title: a string", "// lives: a number", "// isAlive: a boolean"),
          capture: ["title", "lives", "isAlive"],
          crates: [{ name: "title", type: "string" }, { name: "lives", type: "number" }, { name: "isAlive", type: "boolean" }],
          goals: [
            goal("title is a string", function (r) { return is(r, "title", "string"); }),
            goal("lives is a number", function (r) { return is(r, "lives", "number"); }),
            goal("isAlive is a boolean", function (r) { return is(r, "isAlive", "boolean"); })
          ],
          hints: ["<code>let title = 'Bit';</code>", "<code>let lives = 3;</code> and <code>let isAlive = true;</code> (no quotes around true!)"],
          solution: $("let title = 'Bit';", "let lives = 3;", "let isAlive = true;")
        },
        {
          id: "types-2", title: "The rare ones",
          story: "Four more animals live deeper in the zoo. They look weird, but each has a job.",
          learn: `<ul><li><b>null</b> — “intentionally empty”: <code>let selected = null;</code></li>
                  <li><b>undefined</b> — “no value yet”. A variable you declare without a value is <code>undefined</code>: <code>let x;</code></li>
                  <li><b>bigint</b> — huge integers, with an <code>n</code> at the end: <code>123n</code></li>
                  <li><b>symbol</b> — a guaranteed-unique value: <code>Symbol('id')</code></li></ul>
                  <p class="tip">💡 <code>null</code> is something you set on purpose. <code>undefined</code> is what JavaScript gives you when nothing was set.</p>`,
          task: `<code>nothing</code> → null, <code>notSet</code> → undefined (declare it without a value), <code>big</code> → a bigint, <code>id</code> → a symbol.`,
          starter: $("// nothing: null", "// notSet: undefined (declare it, but give no value)", "// big: a bigint", "// id: a symbol"),
          capture: ["nothing", "notSet", "big", "id"],
          crates: [{ name: "nothing", type: "null" }, { name: "notSet", type: "undefined" }, { name: "big", type: "bigint" }, { name: "id", type: "symbol" }],
          goals: [
            goal("nothing is null", function (r) { return is(r, "nothing", "null"); }),
            goal("notSet is undefined", function (r) { return is(r, "notSet", "undefined"); }),
            goal("big is a bigint", function (r) { return is(r, "big", "bigint"); }),
            goal("id is a symbol", function (r) { return is(r, "id", "symbol"); })
          ],
          hints: ["<code>let nothing = null;</code> and <code>let notSet;</code>", "bigint: <code>let big = 10n;</code>, symbol: <code>let id = Symbol('id');</code>"],
          solution: $("let nothing = null;", "let notSet;", "let big = 10n;", "let id = Symbol('id');")
        },
        {
          id: "typeof-null", title: "typeof tells a lie",
          story: "There's a famous bug in JavaScript, older than most of my friends. Let's meet it.",
          learn: `<p><code>typeof</code> returns the type name as a string. It's right almost always, except:</p>
                  <pre class="ex">typeof null      // 'object'  ← a 1995 bug that can never be fixed
typeof []        // 'object'
typeof function(){} // 'function'</pre>
                  <p>So never use <code>typeof</code> to detect <code>null</code>. Compare directly: <code>value === null</code>.</p>`,
          task: `<code>thing</code> is <code>null</code>. Store <code>typeof thing</code> in <code>reported</code> (see the lie!) and the honest answer to “is it null?” in <code>isNull</code>.`,
          prelude: "const thing = null;",
          starter: $("// let reported = ...", "// let isNull = ..."),
          capture: ["reported", "isNull"],
          goals: [
            goal("reported is the string “object”, made with typeof", function (r) { return is(r, "reported", "string", "object") && has(r, /typeof\s*\(?\s*thing/); }),
            goal("isNull is true, worked out from thing (=== null is the best way)", function (r) { return is(r, "isNull", "boolean", true) && has(r, /\bthing\b/); })
          ],
          hints: ["<code>let reported = typeof thing;</code>", "<code>let isNull = thing === null;</code>"],
          solution: $("let reported = typeof thing;", "let isNull = thing === null;")
        },
        {
          id: "predict-typeof", type: "predict", title: "Predict: typeof",
          story: "Time for a game! I'll show you a line of code. You guess what it prints. Then we run it and see who's right.",
          learn: `<p>Predicting before running is the best way to learn: your brain notices the surprise. Think about <code>typeof</code> from the last levels.</p>`,
          task: `Pick the output of each line.`,
          questions: [
            { code: "console.log(typeof [])", options: ["array", "object", "list", "undefined"], answer: "object", why: "Arrays are objects. To check for an array use <code>Array.isArray(x)</code>." },
            { code: "console.log(typeof NaN)", options: ["NaN", "undefined", "number", "object"], answer: "number", why: "NaN means “Not-a-Number”, but it's still of type number. Yes, really." },
            { code: "console.log(typeof function () {})", options: ["function", "object", "method", "undefined"], answer: "function", why: "Functions are objects too, but typeof reports them separately as “function”." },
            { code: "console.log(typeof neverDeclared)", options: ["error", "undefined", "null", "string"], answer: "undefined", why: "typeof is the one operator that doesn't crash on a name that doesn't exist: it just says “undefined”." }
          ]
        }
      ]
    },

    /* ───────────────────────── 4. Numbers ───────────────────────── */
    {
      id: "numbers", emoji: "🔢", title: "Number lab", part: "Part 3 · Numbers",
      levels: [
        {
          id: "float", title: "0.1 + 0.2 ≠ 0.3",
          story: "My calculator says 0.1 + 0.2 = 0.30000000000000004. Is it broken?! (Spoiler: no. Every language does this.)",
          learn: `<p>Computers store numbers in binary. <code>0.1</code> can't be written exactly in binary, just like 1/3 can't be written exactly in decimal.
                  So tiny errors appear.</p>
                  <pre class="ex">0.1 + 0.2                    // 0.30000000000000004
Number((0.1 + 0.2).toFixed(1))   // 0.3  (round to 1 decimal)
Math.round(2.5)              // 3</pre>
                  <p class="tip">💡 <b>Life hack:</b> for money, count in cents (integers): <code>1999</code> instead of <code>19.99</code>.</p>`,
          task: `Make <code>total</code> exactly <code>0.3</code> by rounding the result of the calculation (don't just type <code>0.3</code>). Any way of rounding is fine.`,
          starter: $("let total = 0.1 + 0.2;", "console.log(total);"),
          capture: ["total"],
          goals: [
            goal("total is exactly 0.3", function (r) { return is(r, "total", "number", 0.3); }),
            goal("You rounded a calculation instead of typing 0.3", function (r) { return !has(r, /total\s*=\s*0?\.3\s*;?\s*$/m); })
          ],
          hints: ["Round the result. <code>toFixed(1)</code> keeps one decimal, but returns a <i>string</i>.", "Wrap it: <code>Number((0.1 + 0.2).toFixed(1))</code>. Or: <code>Math.round((0.1 + 0.2) * 10) / 10</code>."],
          solution: $("let total = Number((0.1 + 0.2).toFixed(1));", "console.log(total);")
        },
        {
          id: "parse", title: "Peel the units",
          story: "A website sent me a width as text: “42.5px”. I can't calculate with that. Help me peel off the “px”!",
          learn: `<p><code>parseInt</code> and <code>parseFloat</code> read a number from the <b>start</b> of a string and stop at the first character that doesn't fit:</p>
                  <pre class="ex">parseInt('42.5px')    // 42   (whole number only)
parseFloat('42.5px')  // 42.5
parseInt('px42')      // NaN  (starts with a letter)</pre>
                  <p><code>Number('42px')</code>, in contrast, is strict: any extra character gives <code>NaN</code>.</p>`,
          task: `Store the whole part in <code>whole</code> and the exact value in <code>exact</code>.`,
          prelude: "const width = '42.5px';",
          starter: $("// let whole = ...", "// let exact = ..."),
          capture: ["whole", "exact"],
          goals: [
            goal("whole is 42, taken from width (parseInt is the easiest way)", function (r) { return is(r, "whole", "number", 42) && has(r, /\bwidth\b/); }),
            goal("exact is 42.5, taken from width (parseFloat is the easiest way)", function (r) { return is(r, "exact", "number", 42.5) && has(r, /\bwidth\b/); })
          ],
          hints: ["<code>parseInt(width)</code>", "<code>let whole = parseInt(width);</code> and <code>let exact = parseFloat(width);</code>"],
          solution: $("let whole = parseInt(width);", "let exact = parseFloat(width);")
        },
        {
          id: "nan", title: "NaN, the stranger",
          story: "I tried to read a number from “hello” and got NaN. It's the weirdest value I know: it isn't even equal to itself!",
          learn: `<p><code>NaN</code> (“Not a Number”) is what a failed number operation returns. It has a unique property:</p>
                  <pre class="ex">NaN === NaN          // false 😵
Number.isNaN(NaN)    // true  ← the right check
Number.isNaN('hi')   // false (strict: only real NaN)</pre>
                  <p>Always check with <code>Number.isNaN(x)</code>. Never with <code>x === NaN</code>, which is always false.</p>`,
          task: `<code>mystery</code> is <code>NaN</code>. Set <code>isBroken</code> using <code>Number.isNaN</code>. Then set <code>selfEqual</code> to <code>mystery === mystery</code> and see the surprise.`,
          prelude: "const mystery = parseInt('hello');",
          starter: $("// let isBroken = ...", "// let selfEqual = ..."),
          capture: ["isBroken", "selfEqual"],
          goals: [
            goal("isBroken is true, checked from mystery (Number.isNaN is the best way)", function (r) { return is(r, "isBroken", "boolean", true) && has(r, /\bmystery\b/); }),
            goal("selfEqual is false (NaN isn't equal to itself!)", function (r) { return is(r, "selfEqual", "boolean", false) && has(r, /\bmystery\b|NaN/); })
          ],
          hints: ["<code>let isBroken = Number.isNaN(mystery);</code>", "<code>let selfEqual = mystery === mystery;</code>"],
          solution: $("let isBroken = Number.isNaN(mystery);", "let selfEqual = mystery === mystery;")
        },
        {
          id: "bases", title: "Speaking binary",
          story: "Computers count with 0 and 1 only. Hex colours like #ff0000 use base 16. Let's translate!",
          learn: `<p><code>number.toString(base)</code> writes a number in another base; <code>parseInt(text, base)</code> reads it back:</p>
                  <pre class="ex">(255).toString(16)     // 'ff'    (hex, e.g. in CSS colours)
(10).toString(2)       // '1010'  (binary)
parseInt('ff', 16)     // 255
parseInt('1010', 2)    // 10</pre>
                  <p>Note the brackets: <code>255.toString()</code> is a syntax error, because JS thinks the dot is a decimal point.</p>`,
          task: `<code>hex</code> = 255 in base 16. <code>binary</code> = 10 in base 2. <code>fromBinary</code> = the text <code>'1111'</code> read as binary.`,
          starter: $("// let hex = ...", "// let binary = ...", "// let fromBinary = ..."),
          capture: ["hex", "binary", "fromBinary"],
          goals: [
            goal("hex is “ff” (capital letters are fine too)", function (r) { return is(r, "hex", "string") && V(r, "hex").value.toLowerCase() === "ff"; }),
            goal("binary is “1010”", function (r) { return is(r, "binary", "string", "1010"); }),
            goal("fromBinary is 15", function (r) { return is(r, "fromBinary", "number", 15); })
          ],
          hints: ["<code>(255).toString(16)</code>", "<code>(10).toString(2)</code> and <code>parseInt('1111', 2)</code>"],
          solution: $("let hex = (255).toString(16);", "let binary = (10).toString(2);", "let fromBinary = parseInt('1111', 2);")
        },
        {
          id: "bigint", title: "Beyond the safe zone",
          story: "Past a certain number, my maths goes wrong without telling me. That number is called MAX_SAFE_INTEGER.",
          learn: `<p>Numbers are safe only up to <code>2<sup>53</sup> − 1 = 9007199254740991</code>. Above that, integers get skipped.
                  For bigger whole numbers use <b>bigint</b>: add <code>n</code> or call <code>BigInt()</code>.</p>
                  <pre class="ex">9007199254740991 + 2        // 9007199254740992  ❌
9007199254740991n + 2n       // 9007199254740993n ✅
BigInt(5) + 1n               // 6n</pre>
                  <p>You can't mix bigint and number: <code>1n + 1</code> is a TypeError. Convert first.</p>`,
          task: `<code>maxSafe</code> + 2 should be <code>9007199254740993</code>. Fix <code>next</code> using bigint.`,
          prelude: "const maxSafe = Number.MAX_SAFE_INTEGER; // 9007199254740991",
          starter: "let next = maxSafe + 2;",
          capture: ["next"],
          goals: [goal("next is the bigint 9007199254740993n", function (r) { return is(r, "next", "bigint") && V(r, "next").text === "9007199254740993n"; })],
          hints: ["Turn <code>maxSafe</code> into a bigint with <code>BigInt(maxSafe)</code>.", "Then add a bigint: <code>BigInt(maxSafe) + 2n</code>."],
          solution: "let next = BigInt(maxSafe) + 2n;"
        }
      ]
    },

    /* ───────────────────────── 5. Strings & conversion ───────────────────────── */
    {
      id: "strings", emoji: "🧵", title: "Strings & type tricks", part: "Part 3 · Strings, conversion, equality",
      levels: [
        {
          id: "template", title: "Fill in the blanks",
          story: "I want to introduce my friend Ada, but gluing text with + is clumsy. There's a nicer way!",
          learn: `<p>Strings in <b>backticks</b> are <i>template literals</i>. Anything inside <code>\${ }</code> is replaced by its value:</p>
                  <pre class="ex">const who = 'Bit';
console.log(\`Hello, \${who}! 2+2=\${2 + 2}\`);
// Hello, Bit! 2+2=4</pre>
                  <p>They can also span several lines, no <code>\\n</code> needed.</p>`,
          task: `Build <code>message</code> as <code>Ada is 36 years old</code> from the variables <code>name</code> and <code>age</code>, using a template literal (backticks).`,
          prelude: $("const name = 'Ada';", "const age = 36;"),
          starter: "// let message = ...",
          capture: ["message"],
          goals: [
            goal("message is “Ada is 36 years old”", function (r) { return is(r, "message", "string", "Ada is 36 years old"); }),
            goal("You used backticks and ${ }", function (r) { return has(r, /`[^`]*\$\{[^`]*`/); })
          ],
          hints: ["Start and end with backticks: <code>`…`</code>", "<code>let message = `${name} is ${age} years old`;</code>"],
          solution: "let message = `${name} is ${age} years old`;"
        },
        {
          id: "methods", title: "String spa",
          story: "This text came from a messy form: spaces everywhere and the wrong case. Time for a spa day.",
          learn: `<p>Strings have <b>methods</b>: little built-in tools you call with a dot. They never change the original, they return a new string, so you can chain them:</p>
                  <pre class="ex">'  hi  '.trim()          // 'hi'
'hi'.toUpperCase()       // 'HI'
'  hi  '.trim().toUpperCase() // 'HI'</pre>
                  <p>Others to remember: <code>toLowerCase()</code>, <code>includes('x')</code>, <code>startsWith('x')</code>, <code>replace('a','b')</code>.</p>`,
          task: `Create <code>clean</code>: <code>raw</code> without outer spaces and in capital letters.`,
          prelude: "const raw = '   JavaScript  ';",
          starter: "// let clean = ...",
          capture: ["clean"],
          goals: [
            goal("clean is “JAVASCRIPT”", function (r) { return is(r, "clean", "string", "JAVASCRIPT"); }),
            goal("It is built from raw", function (r) { return has(r, /\braw\b/); })
          ],
          hints: ["Two methods: one removes spaces, one makes capitals.", "<code>raw.trim().toUpperCase()</code>"],
          solution: "let clean = raw.trim().toUpperCase();"
        },
        {
          id: "slice", title: "Cut it up",
          story: "“JavaScript” is two words glued together. Let me cut them apart!",
          learn: `<p>Strings are indexed from <b>0</b>. <code>slice(start, end)</code> takes the part from <code>start</code> up to (but not including) <code>end</code>. Negative numbers count from the end:</p>
                  <pre class="ex">const w = 'JavaScript';
w[0]          // 'J'
w.length      // 10
w.slice(0, 4) // 'Java'
w.slice(4)    // 'Script'
w.slice(-6)   // 'Script'</pre>`,
          task: `<code>start</code> = the first 4 letters, <code>end</code> = the last 6 letters, <code>size</code> = how many characters in total.`,
          prelude: "const word = 'JavaScript';",
          starter: $("// let start = ...", "// let end = ...", "// let size = ..."),
          capture: ["start", "end", "size"],
          goals: [
            goal("start is “Java”", function (r) { return is(r, "start", "string", "Java"); }),
            goal("end is “Script”", function (r) { return is(r, "end", "string", "Script"); }),
            goal("size is 10, made with .length", function (r) { return is(r, "size", "number", 10) && has(r, /\.length|\[\s*['"]length['"]\s*\]/); })
          ],
          hints: ["<code>word.slice(0, 4)</code>", "<code>word.slice(-6)</code> and <code>word.length</code>"],
          solution: $("let start = word.slice(0, 4);", "let end = word.slice(-6);", "let size = word.length;")
        },
        {
          id: "convert", title: "The sneaky plus",
          story: "I have 5 apples and 3 pears. Fruit total: 53?! Something is off.",
          learn: `<p>With numbers <code>+</code> adds. With a <b>string</b> on either side it glues text together, so JavaScript converts the number into text:</p>
                  <pre class="ex">'5' + 3     // '53'
'5' - 3     // 2   (minus only works on numbers)
Number('5') + 3  // 8  ← convert explicitly
+'5' + 3         // 8  (unary plus: a short Number())</pre>
                  <p class="tip">💡 Data from forms, URLs and <code>localStorage</code> is always a string. Convert it first, add second.</p>`,
          task: `Fix <code>total</code> so it is the number <code>8</code>, still using <code>apples</code> and <code>pears</code>.`,
          prelude: $("const apples = '5';", "const pears = 3;"),
          starter: $("let total = apples + pears;", "console.log(total);"),
          capture: ["total"],
          goals: [
            goal("total is the number 8", function (r) { return is(r, "total", "number", 8); }),
            goal("It still uses apples and pears", function (r) { return has(r, /\bapples\b/) && has(r, /\bpears\b/); })
          ],
          hints: ["Turn the text into a number before adding.", "<code>Number(apples) + pears</code>"],
          solution: $("let total = Number(apples) + pears;", "console.log(total);")
        },
        {
          id: "predict-coercion", type: "predict", title: "Predict: coercion",
          story: "JavaScript converts types automatically (<b>coercion</b>). Sometimes it's helpful, sometimes it's a prank.",
          learn: `<p>Remember: <code>+</code> with a string makes text; <code>-</code>, <code>*</code>, <code>/</code> make numbers. <code>true</code> becomes <code>1</code> and <code>false</code> becomes <code>0</code> in maths. <code>+'a'</code> is <code>NaN</code>.</p>`,
          task: `Pick the output of each line.`,
          questions: [
            { code: "console.log('5' + 3)", options: ["8", "53", "NaN", "error"], answer: "53", why: "One side is a string, so + glues text: “5” and “3” → “53”." },
            { code: "console.log('5' - 3)", options: ["2", "53", "NaN", "error"], answer: "2", why: "Minus only works on numbers, so “5” is converted to 5 first." },
            { code: "console.log(true + 1)", options: ["2", "true1", "1", "NaN"], answer: "2", why: "In maths true becomes 1, so 1 + 1 = 2." },
            { code: "console.log('b' + 'a' + +'a' + 'a')", options: ["baaa", "baNaNa", "ba+aa", "error"], answer: "baNaNa", why: "<code>+'a'</code> turns “a” into a number: NaN. Then “ba” + NaN + “a” = “baNaNa”. A classic JS meme." }
          ]
        },
        {
          id: "predict-falsy", type: "predict", title: "Predict: truthy or falsy?",
          story: "In an <code>if</code>, every value is treated as <code>true</code> or <code>false</code>. Which ones count as false?",
          learn: `<p>There are exactly <b>6 falsy</b> values: <code>false</code>, <code>0</code> (and <code>-0</code>, <code>0n</code>), <code>''</code> (empty string), <code>null</code>, <code>undefined</code>, <code>NaN</code>.
                  <b>Everything else is truthy</b>, even <code>'0'</code>, <code>'false'</code>, <code>[]</code>, <code>{}</code>.</p>
                  <p><code>Boolean(x)</code> (or <code>!!x</code>) shows which way a value goes.</p>`,
          task: `What does <code>Boolean(…)</code> return for each of these?`,
          questions: [
            { code: "console.log(Boolean('0'))", options: ["true", "false"], answer: "true", why: "A non-empty string is always truthy, even if it contains the character “0”." },
            { code: "console.log(Boolean([]))", options: ["true", "false"], answer: "true", why: "Every object is truthy, including an empty array." },
            { code: "console.log(Boolean(NaN))", options: ["true", "false"], answer: "false", why: "NaN is one of the six falsy values." },
            { code: "console.log(Boolean(' '))", options: ["true", "false"], answer: "true", why: "A string with a single space isn't empty: truthy." }
          ]
        },
        {
          id: "predict-equality", type: "predict", title: "Predict: == vs ===",
          story: "Two kinds of “equals”. One is polite and converts types; the other is strict.",
          learn: `<p><code>===</code> (strict) compares value <b>and</b> type, no conversion. <code>==</code> (loose) converts types first, with surprising rules.
                  <b>Use <code>===</code> by default.</b></p>
                  <pre class="ex">1 === '1'   // false
1 == '1'    // true  (the string becomes a number)
null == undefined  // true (special rule!)</pre>`,
          task: `What does each comparison print?`,
          questions: [
            { code: "console.log(0 == '0')", options: ["true", "false"], answer: "true", why: "Loose equality converts “0” to the number 0." },
            { code: "console.log(null == undefined)", options: ["true", "false"], answer: "true", why: "A special rule: null and undefined are loosely equal only to each other." },
            { code: "console.log(NaN == NaN)", options: ["true", "false"], answer: "false", why: "NaN is never equal to anything, not even itself (== or ===)." },
            { code: "console.log(null == 0)", options: ["true", "false"], answer: "false", why: "null is loosely equal only to undefined, not to 0, even though null >= 0 is true. Wat." }
          ]
        },
        {
          id: "boss", title: "Boss: the receipt",
          story: "Final boss! A messy receipt arrived as text. Use everything you learned to turn it into a clean total.",
          learn: `<p>Combine your tools: <code>trim()</code> for spaces, <code>parseFloat()</code> to read a number from the start of a string, <code>Number()</code> for a strict conversion, and a template literal for the final sentence.</p>`,
          task: `From <code>rawPrice</code> and <code>qty</code> build: <code>price</code> (number 20.5), <code>count</code> (number 3), <code>total</code> (number 61.5) and <code>label</code> = <code>Total: 61.5 USD</code>.`,
          prelude: $("const rawPrice = ' 20.5$ ';", "const qty = '3';"),
          starter: $("// let price = ...", "// let count = ...", "// let total = ...", "// let label = ..."),
          capture: ["price", "count", "total", "label"],
          crates: [{ name: "price", type: "number" }, { name: "count", type: "number" }, { name: "total", type: "number" }, { name: "label", type: "string" }],
          goals: [
            goal("price is the number 20.5", function (r) { return is(r, "price", "number", 20.5); }),
            goal("count is the number 3", function (r) { return is(r, "count", "number", 3); }),
            goal("total is 61.5", function (r) { return is(r, "total", "number", 61.5); }),
            goal("label is “Total: 61.5 USD”", function (r) { return is(r, "label", "string", "Total: 61.5 USD"); }),
            goal("It is computed, not typed in", function (r) { return has(r, /rawPrice/) && has(r, /qty/); })
          ],
          hints: ["<code>parseFloat</code> ignores the space before and the “$” after: <code>parseFloat(rawPrice)</code>.", "<code>count = Number(qty)</code>, <code>total = price * count</code>.", "<code>`Total: ${total} USD`</code>"],
          solution: $("let price = parseFloat(rawPrice);", "let count = Number(qty);", "let total = price * count;", "let label = `Total: ${total} USD`;")
        }
      ]
    }
  ];

  root.JSQ = root.JSQ || {};
  root.JSQ.lectures = root.JSQ.lectures || [];
  root.JSQ.lectures.push({
    id: "lec1", num: 1,
    title: "JavaScript: Intro & Data Types",
    videoUrl: "",   // TODO: paste the YouTube link of Lecture 1 here; a "Watch the lecture" button appears when it's set
    chapters: chapters
  });
})(typeof window !== "undefined" ? window : globalThis);
