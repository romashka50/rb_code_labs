// Verifies every level: the solution passes all goals, the starter does not, predict answers are real.
// Run: node test/verify.mjs
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console };
ctx.globalThis = ctx; vm.createContext(ctx);
for (const f of ["engine.js", ...fs.readdirSync(path.join(root, "levels")).map((x) => "levels/" + x)])
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const { execute, lectures } = ctx.JSQ;
let fail = 0, n = 0;
const bad = (m) => { fail++; console.log("  ✗ " + m); };
const ids = new Set();
for (const lec of lectures) for (const ch of lec.chapters) for (const lv of ch.levels) {
  n++;
  if (ids.has(lv.id)) bad(`duplicate id ${lv.id}`); ids.add(lv.id);
  console.log(`${lec.id}/${lv.id}`);
  if (lv.type === "predict") {
    for (const q of lv.questions) {
      const r = execute("", q.code, []);
      const actual = r.error ? "error" : r.logs[0].text;
      if (actual !== q.answer) bad(`"${q.code}" really prints ${actual}, answer says ${q.answer}`);
      if (!q.options.includes(q.answer)) bad(`answer not in options: ${q.code}`);
      if (!q.why) bad("missing why");
    }
    continue;
  }
  const run = (code) => { const r = execute(lv.prelude || "", code, lv.capture || []); r.code = code; return r; };
  const pass = (r) => !r.error && lv.goals.every((g) => g.test(r));
  const s = run(lv.solution);
  if (s.error) bad("solution errors: " + s.error.message);
  lv.goals.forEach((g) => { if (!g.test(s)) bad(`solution fails goal: ${g.text}`); });
  if (pass(run(lv.starter))) bad("STARTER ALREADY PASSES");
  if (!lv.hints || !lv.hints.length) bad("no hints");
}
console.log(fail ? `\n${fail} problem(s) in ${n} levels` : `\nAll ${n} levels OK`);
process.exit(fail ? 1 : 0);
