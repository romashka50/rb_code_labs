// Different-but-valid solutions must all pass; wrong ones must fail.
// Run: node test/alternatives.mjs
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console }; ctx.globalThis = ctx; vm.createContext(ctx);
for (const f of ["engine.js", ...fs.readdirSync(path.join(root, "levels")).filter((x) => /^lec\d+\.js$/.test(x)).map((x) => "levels/" + x)])
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const levels = {};
for (const lec of ctx.JSQ.lectures) for (const ch of lec.chapters) for (const lv of ch.levels) levels[lv.id] = lv;
const A = (...l) => l.join("\n");

const good = {
  hello: ['console.log("Hello, world!")', "console.log(`Hello, world!`);", "console.log('Hello, ' + 'world!');", "console.info('Hello, world!');", "// hi\nconsole.log('Hello, world!'); // done"],
  comments: [
    A("console.log('All quiet');", "// console.log('ALARM! Intruder!');", "// console.log('ALARM! Fire!');"),
    A("console.log('All quiet');", "/* console.log('ALARM! Intruder!');", "console.log('ALARM! Fire!');", "*/"),
    A("console.log('All quiet');", "/* console.log('ALARM! Intruder!');", "console.log('ALARM! Fire!');*/"),
    A("console.log('All quiet');", "/* console.log('ALARM! Intruder!'); */", "// console.log('ALARM! Fire!');"),
    A("console.log('All quiet'); // fine", "//console.log('ALARM! Intruder!');", "//console.log('ALARM! Fire!');"),
  ],
  operators: [A("console.log(17 % 5);", "console.log(2 ** 10);"), A("console.log(17 % 5)", "console.log(Math.pow(2, 10))"), A("console.log( 17%5 );", 'console.log(2**10);')],
  let: [A("let coins = 10;", "coins += 5;"), "let coins=10; coins=coins+5;", A("let coins = 10;", "coins++;", "coins += 4;"), "let coins; coins = 10; coins = 15;", A("let coins = 10;", "coins = 15;")],
  const: [A('const planet = "Mars";', "let visitors = 0;", "visitors += 3;"), "const planet = `Mars`; let visitors = 0; visitors++; visitors++; visitors++;", "const planet='Mars';let visitors=3;"],
  "const-error": [A("let score = 0;", "score = 10;", "console.log(score);"), "var score = 0; score = 10; console.log(score);", A("let score = 0;", "score += 10;", "console.log(score);"), "const score = 10;\nconsole.log(score);", "let score;\nscore = 10;\nconsole.log(score);"],
  names: [
    A("let speed2x = 1;", "let my_name = 'Bit';", "let className = 'robot';", "console.log(speed2x, my_name, className);"),
    A("const speed2x = 1;", "const myName = 'Bit';", "const className = 'robot';", "console.log(speed2x, myName, className);"),
    A("let fast2 = 1;", "let $name = 'Bit';", "let klass = 'robot';", "console.log(fast2, $name, klass);"),
    A("var speed2x = 1, myName = 'Bit', className = 'robot';", "console.log(speed2x, myName, className);"),
  ],
  "block-scope": [
    A("let treasure;", "if (true) {", "  treasure = 'gold';", "}", "console.log(treasure);"),
    A("if (true) {", "  var treasure = 'gold';", "}", "console.log(treasure);"),
    A("let treasure = '';", "if (true) { treasure = 'gold'; }", "console.log(treasure);"),
    A("const treasure = 'gold';", "if (true) {", "}", "console.log(treasure);"),
  ],
  hoisting: [A("let level = 3;", "console.log(level);"), A("const level = 3;", "console.log(level);"), A("let level;", "level = 3;", "console.log(level);"), A("// var is the old way", "let level = 3;", "console.log(level);")],
  "types-1": [A("let title = `x`;", "let lives = 3.5;", "let isAlive = false;"), A("var title = 'a'; var lives = -1; var isAlive = 1 > 0;"), A("const title = String(5);", "const lives = Number('7');", "const isAlive = Boolean(0);")],
  "types-2": [A("let nothing = null;", "let notSet = undefined;", "let big = BigInt(5);", "let id = Symbol();"), "var nothing = null; var notSet; var big = 123456789012345678901234567890n; var id = Symbol('x');", "let nothing = null, notSet, big = 1n, id = Symbol.for('a');"],
  "typeof-null": [A("let reported = typeof(thing);", "let isNull = thing == null;"), A("let reported = typeof thing;", "let isNull = Object.is(thing, null);"), A("var reported = typeof thing;", "var isNull = thing === null;"), A("let reported = typeof thing;", "let isNull = null === thing;")],
  float: ["let total = Math.round((0.1 + 0.2) * 10) / 10;", "let total = +(0.1 + 0.2).toFixed(1);", "let total = parseFloat((0.2 + 0.1).toFixed(2));", A("const a = 0.1, b = 0.2;", "let total = Number((a + b).toFixed(1));"), "let total = (10 + 20) / 100;", "let total = Math.round(0.1 * 100 + 0.2 * 100) / 100;", "let total = (1 + 2) / 10;"],
  parse: [
    A("let whole = parseInt(width, 10);", "let exact = parseFloat(width);"),
    A("let whole = Math.floor(parseFloat(width));", "let exact = Number.parseFloat(width);"),
    A("let whole = Number.parseInt(width);", "let exact = Number(width.replace('px', ''));"),
    A("let whole = Math.trunc(parseFloat(width));", "let exact = +width.slice(0, -2);"),
  ],
  nan: [
    A("let isBroken = isNaN(mystery);", "let selfEqual = mystery == mystery;"),
    A("let isBroken = mystery !== mystery;", "let selfEqual = NaN === NaN;"),
    A("let isBroken = Object.is(mystery, NaN);", "let selfEqual = mystery === mystery;"),
    A("let isBroken = Number.isNaN(mystery);", "let selfEqual = (mystery === mystery);"),
  ],
  bases: [
    "let hex = (255).toString(16).toUpperCase();\nlet binary = Number(10).toString(2);\nlet fromBinary = 0b1111;",
    "let hex = 255..toString(16), binary = (10).toString(2), fromBinary = parseInt('1111', 2);",
    "let hex = (255).toString(16);\nlet binary = (10).toString(2);\nlet fromBinary = Number('0b1111');",
  ],
  bigint: ["let next = 9007199254740991n + 2n;", "let next = BigInt(maxSafe) + BigInt(2);", "let next = BigInt(Number.MAX_SAFE_INTEGER) + 2n;", "let next = BigInt('9007199254740993');", "let next = 9007199254740993n;", "let next = BigInt(maxSafe) + 1n + 1n;"],
  template: ["let message = `${name} is ${age} years old`;", "let message = `Ada is ${age} years old`;", "let message = `${name} is 36 years old`;", "const message = `${name} is ${age} years old`;", "var message = `${ name } is ${ age } years old`;"],
  methods: ["let clean = raw.toUpperCase().trim();", "let clean = raw.trimStart().trimEnd().toUpperCase();", "let clean = raw.replaceAll(' ', '').toUpperCase();", "let clean = raw.trim().toLocaleUpperCase();", A("let trimmed = raw.trim();", "let clean = trimmed.toUpperCase();")],
  slice: [
    A("let start = word.substring(0, 4);", "let end = word.substring(4);", "let size = word.length;"),
    A("let start = word.slice(0, 4);", "let end = word.slice(4);", "let size = word.length;"),
    A("let start = word.substr(0, 4);", "let end = word.slice(word.length - 6);", "let size = word.length;"),
    "let start = word.slice(0,4), end = word.slice(-6), size = word.length;",
    A("let start = word.slice(0, 4);", "let end = word.slice(-6);", "let size = [...word].length;"),
  ],
  convert: ["let total = +apples + pears;", "let total = parseInt(apples) + pears;", "let total = parseInt(apples, 10) + pears;", "let total = Number(apples) + Number(pears);", "let total = apples * 1 + pears;", "let total = apples - 0 + pears;", "let total = parseFloat(apples) + pears;", "let total = pears + Number(apples);"],
  boss: [
    A("let price = parseFloat(rawPrice.trim());", "let count = parseInt(qty);", "let total = price * count;", 'let label = "Total: " + total + " USD";'),
    A("let price = Number(rawPrice.trim().slice(0, -1));", "let count = +qty;", "let total = count * price;", "let label = `Total: ${count * price} USD`;"),
    A("let price = parseFloat(rawPrice);", "let count = Number(qty);", "let total = price * count;", "let label = 'Total: ' + total + ' USD';"),
  ],
};
// Wrong answers that must NOT pass (the checks must not be wide open)
const bad = {
  hello: ["console.log('Hello world');", "console.log('hello, world!');"],
  comments: ["console.log('All quiet');", A("console.log('All quiet');", "console.log('ALARM! Intruder!');", "// console.log('ALARM! Fire!');")],
  operators: ["console.log(2);\nconsole.log(1024);", "console.log(17 % 5);"],
  let: ["let coins = 10;", "coins = 15;"],
  const: ['let planet = "Mars";\nlet visitors = 3;', 'const planet = "Mars";\nconst visitors = 3;'],
  "const-error": ["const score = 0;\nscore = 10;\nconsole.log(score);", "let score = 0;\nconsole.log(score);"],
  names: ["let 2fast = 1;\nconsole.log(1);"],
  "block-scope": ["if (true) {\n  let treasure = 'gold';\n}\nconsole.log(treasure);"],
  hoisting: [A("console.log(level);", "var level = 3;"), A("let level = 3;", "// var\nconsole.log(level);", "var x = 1;")],
  "types-1": ["let title = 1; let lives = 'a'; let isAlive = 'true';"],
  "types-2": ["let nothing = undefined; let notSet = null; let big = 1; let id = 'id';"],
  "typeof-null": ["let reported = 'object';\nlet isNull = true;", "let reported = typeof thing;\nlet isNull = false;"],
  float: ["let total = 0.1 + 0.2;", "let total = 0.3;"],
  parse: ["let whole = 42.5;\nlet exact = 42;", "let whole = parseInt(width);\nlet exact = parseInt(width);"],
  nan: ["let isBroken = false;\nlet selfEqual = true;", "let isBroken = mystery === NaN;\nlet selfEqual = mystery === mystery;"],
  bases: ["let hex = 'ff'; let binary = 10; let fromBinary = '1111';"],
  bigint: ["let next = maxSafe + 2;", "let next = BigInt(maxSafe + 2);"],
  template: ["let message = name + ' is ' + age + ' years old';", "let message = `Ada is 36`;"],
  methods: ["let clean = raw.trim();", "let clean = raw.toUpperCase();"],
  slice: ["let start = 'Java'; let end = 'Script'; let size = 10;", "let start = word.slice(0, 3); let end = word.slice(-6); let size = word.length;"],
  convert: ["let total = apples + pears;", "let total = 8;"],
  boss: ["let price = rawPrice; let count = qty; let total = price * count; let label = `Total: ${total} USD`;"],
};
const run = (lv, code) => { const r = ctx.JSQ.execute(lv.prelude || "", code, lv.capture || []); r.code = code; return r; };
const pass = (lv, code) => { const r = run(lv, code); return !r.error && lv.goals.every((g) => g.test(r)); };
let fail = 0, n = 0;
for (const [id, list] of Object.entries(good)) { n += list.length; for (const c of list) if (!pass(levels[id], c)) { fail++; console.log(`✗ ${id}: valid solution rejected:\n${c}\n`); } }
for (const [id, list] of Object.entries(bad)) { n += list.length; for (const c of list) if (pass(levels[id], c)) { fail++; console.log(`✗ ${id}: WRONG solution accepted:\n${c}\n`); } }
const covered = new Set(Object.keys(good));
const missing = Object.values(levels).filter((l) => l.type !== "predict" && !covered.has(l.id)).map((l) => l.id);
if (missing.length) console.log("no alternatives written for:", missing.join(", "));
console.log(fail ? `\n${fail} problem(s) in ${n} cases` : `\nAll ${n} cases OK`);
process.exit(fail ? 1 : 0);
