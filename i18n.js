/* Interface strings. {0}, {1} are filled in by t(). Level texts live in levels/lecN.uk.js */
(function (root) {
  root.JSQ = root.JSQ || {};
  root.JSQ.ui = {
    en: {
      lecture: "Lecture {0}", level: "Level {0}/{1}", chooseLevel: "Choose a level", resetAll: "Reset my progress",
      resetConfirm: "Erase all your stars and progress in this browser?", watch: "▶ Watch the lecture",
      learn: "Learn", mission: "🎯 Your mission", prev: "← Previous", next: "Next →",
      hint: "💡 Hint ({0} left)", noHints: "💡 No more hints", showSol: "Show me the solution",
      solMsg: "Here's one way to do it. Press <b>Run</b> to see it work!",
      given: "🔒 given", run: "▶ Run", running: "Running…", reset: "↺ Reset", runKeys: "<kbd>Ctrl/⌘</kbd>+<kbd>Enter</kbd> to run",
      console: "Console", pressRun: "Press Run to see the output here.", nothing: "(nothing was printed)",
      notQuite: "Not quite there. Check the goals marked ✗ and try again. You've got this!",
      done: "<b>Level complete!</b> ", praise: ["", "That works!", "Nicely done!", "Flawless!"],
      winTitle: "Level complete! 🎉", readyNext: "Ready for the next one?", finished: "You finished every level of this lecture. 🏆",
      stay: "Stay here", nextLevel: "Next level →", seeAll: "See all levels",
      correct: "✅ <b>Correct!</b> ", wrong: "❌ <b>Not quite.</b> ", itPrints: "It prints ", anError: "💥 an error",
      yes: "Yes! You read that like a pro.", ha: "Ha, JavaScript fooled you. It does that to everyone!",
      notCreated: "not created yet", empty: "empty", lectureLine: "Lecture {0}: {1}", title: "JS Quest: learn JavaScript by playing",
      eTimeout: "⏱ The code ran for more than 2 seconds. Is there an endless loop?",
      eSyntax: "Bit can't read that line (<b>SyntaxError</b>). Check quotes, brackets, and that variable names have no dashes or leading digits. Error: <code>{0}</code>",
      eTdz: "You used a <code>let</code>/<code>const</code> variable <b>before</b> the line that creates it. Move the creation up. <code>{0}</code>",
      eNotDef: "Bit looked for a variable that doesn't exist: a typo, or it lives in another block. <code>{0}</code>",
      eConst: "A <code>const</code> can't be given a new value. Use <code>let</code> if it must change. <code>{0}</code>",
      eFn: "That isn't a function (or a method with that name doesn't exist). Check spelling and capitals: <code>{0}</code>",
      eGeneric: "Bit got an error: <code>{0}</code>"
    },
    uk: {
      lecture: "Лекція {0}", level: "Рівень {0}/{1}", chooseLevel: "Обери рівень", resetAll: "Скинути мій прогрес",
      resetConfirm: "Стерти всі зірки та прогрес у цьому браузері?", watch: "▶ Дивитись лекцію",
      learn: "Теорія", mission: "🎯 Твоя місія", prev: "← Назад", next: "Далі →",
      hint: "💡 Підказка (лишилось {0})", noHints: "💡 Підказок більше немає", showSol: "Покажи розв'язок",
      solMsg: "Ось один зі способів. Натисни <b>Запустити</b>, щоб побачити, як це працює!",
      given: "🔒 дано", run: "▶ Запустити", running: "Виконується…", reset: "↺ Скинути", runKeys: "<kbd>Ctrl/⌘</kbd>+<kbd>Enter</kbd> — запуск",
      console: "Консоль", pressRun: "Натисни «Запустити», щоб побачити результат тут.", nothing: "(нічого не виведено)",
      notQuite: "Ще не зовсім. Подивись на цілі з ✗ і спробуй ще. У тебе вийде!",
      done: "<b>Рівень пройдено!</b> ", praise: ["", "Працює!", "Гарна робота!", "Бездоганно!"],
      winTitle: "Рівень пройдено! 🎉", readyNext: "Готовий до наступного?", finished: "Ти пройшов усі рівні цієї лекції. 🏆",
      stay: "Лишитись тут", nextLevel: "Наступний рівень →", seeAll: "Усі рівні",
      correct: "✅ <b>Вірно!</b> ", wrong: "❌ <b>Не зовсім.</b> ", itPrints: "Виведеться ", anError: "💥 помилка",
      yes: "Так! Ти читаєш код як професіонал.", ha: "Ха, JavaScript тебе обдурив. Він так робить з усіма!",
      notCreated: "ще не створено", empty: "порожньо", lectureLine: "Лекція {0}: {1}", title: "JS Quest: вивчай JavaScript граючись",
      eTimeout: "⏱ Код виконувався понад 2 секунди. Може, там нескінченний цикл?",
      eSyntax: "Біт не може прочитати цей рядок (<b>SyntaxError</b>). Перевір лапки, дужки, а також що імена змінних без дефісів і не починаються з цифри. Помилка: <code>{0}</code>",
      eTdz: "Ти використав змінну <code>let</code>/<code>const</code> <b>до</b> рядка, який її створює. Підніми створення вище. <code>{0}</code>",
      eNotDef: "Біт шукав змінну, якої не існує: це або одруківка, або вона живе в іншому блоці. <code>{0}</code>",
      eConst: "Для <code>const</code> не можна задати нове значення. Використай <code>let</code>, якщо значення має змінюватись. <code>{0}</code>",
      eFn: "Це не функція (або методу з такою назвою не існує). Перевір написання та регістр: <code>{0}</code>",
      eGeneric: "У Біта помилка: <code>{0}</code>"
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
