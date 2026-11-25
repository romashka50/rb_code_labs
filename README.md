# JS Quest: game-labs for the JavaScript course

Static site, no build step, no dependencies. Open `index.html` or host the folder anywhere (GitHub Pages, Netlify).

- `levels/lecN.js`: all the content of one lecture (explanation, mission, starter code, goals, hints, solution)
- `levels/lecN.uk.js`: the Ukrainian texts of that lecture (keyed by level id; code and goal logic are never translated)
- `i18n.js`: interface strings in English and Ukrainian
- `engine.js`: runs the learner's code in a Web Worker (2 s timeout, so endless loops can't freeze the page)
- `app.js`, `style.css`, `index.html`: the interface
- `test/alternatives.mjs`: `node test/alternatives.mjs` runs ~140 different valid solutions (must pass) and wrong ones (must fail). Add a case here whenever you add or change a level
- `test/verify.mjs`: `node test/verify.mjs` checks that every solution passes, every starter fails, and every "predict" answer is what JavaScript really prints

## Link from a video
Every level has its own link: `https://<host>/#lec1/const-error`. A lecture's `videoUrl` (in `levels/lecN.js`) adds a "Watch the lecture" button.

## Adding Lecture 2
Copy `levels/lec1.js` to `levels/lec2.js` (and `lec1.uk.js` to `lec2.uk.js`), change the id/num/title/chapters, add a `<script>` line in `index.html`, run the verify script.

## Language
A language button (EN / УК) sits in the header. The first visit follows the browser language; the choice is remembered. A level without a Ukrainian text falls back to English. Links work in both languages.
