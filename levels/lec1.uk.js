/* Ukrainian texts for Lecture 1. Keyed by level id; `goals` and `why` follow the order of the English file.
   Code (solutions, prelude, goal logic) is never translated: only text the learner reads. */
(function (root) {
  var $ = function () { return Array.prototype.join.call(arguments, "\n"); };
  var L = {
    title: "JavaScript: вступ і типи даних",
    chapters: {
      console: { title: "Розбуди Біта", part: "Частина 1 · Інструменти й перший код" },
      variables: { title: "Ящики", part: "Частина 2 · Змінні" },
      types: { title: "Зоопарк типів", part: "Частина 2 · Типи даних" },
      numbers: { title: "Лабораторія чисел", part: "Частина 3 · Числа" },
      strings: { title: "Рядки й фокуси з типами", part: "Частина 3 · Рядки, приведення типів, рівність" }
    },
    levels: {
      hello: {
        title: "Привіт, світе!",
        story: "Привіт! Я Біт, маленький робот, який розуміє лише JavaScript. Я сплю. Скажи щось, щоб мене розбудити!",
        learn: `<p>Програма на JavaScript — це список <b>інструкцій</b> (statements): кожна робить одну дію й зазвичай закінчується <code>;</code>.
                Найкорисніша інструкція на початку — <code>console.log()</code>: вона виводить усе, що ти поклав у дужки, в <b>консоль</b>
                (у браузері: DevTools → Console, або термінал із Node.js).</p>
                <pre class="ex">console.log('Текст пишемо в лапках');
console.log("подвійні лапки теж працюють");
console.log(42);   // числа без лапок</pre>
                <p><b>Лапки:</b> одинарні <code>'текст'</code> і подвійні <code>"текст"</code> означають те саме, можна використовувати будь-які. У цьому курсі ми пишемо <b>одинарні лапки</b>; подвійні вживаємо, коли в самому тексті є апостроф: <code>"it's fine"</code>. (Третій вид, зворотні лапки, буде пізніше.) У лабораторних приймаються обидва варіанти.</p>
                <p class="tip">💡 <b>Лайфхак:</b> <code>console.log</code> — найдешевший дебагер у світі. Щось дивне? Виведи це.</p>`,
        task: `Виведи в консоль рівно <code>Hello, world!</code>`,
        starter: $("// Напиши свій перший рядок JavaScript нижче", "console.log();"),
        goals: ["У консолі з'явилось Hello, world!"],
        hints: ["Текст має бути в лапках: <code>'ось так'</code> (подвійні <code>\"ось так\"</code> теж підійдуть).", "Поклади текст між дужок: <code>console.log('…');</code>"]
      },
      comments: {
        title: "Вимкни сирени",
        story: "Я прокинувся, але моя програма-сигналізація надто галаслива! Хочу чути лише «All quiet». Не видаляй сирени, просто заглуши їх.",
        learn: `<p><b>Коментар</b> — це текст, який JavaScript ігнорує. Програмісти пишуть у них нотатки й тимчасово вимикають код.</p>
                <pre class="ex">// однорядковий коментар
console.log('виконається');
// console.log('НЕ виконається');

/* коментар, що займає
   кілька рядків */</pre>
                <p class="tip">💡 <b>Лайфхак:</b> у VS Code виділи рядок і натисни <kbd>Cmd/Ctrl</kbd>+<kbd>/</kbd>, щоб закоментувати його одним натисканням.</p>`,
        task: `За допомогою коментарів зроби так, щоб виводилось лише <code>All quiet</code>. Рядки з сиренами лишаються у файлі.`,
        goals: ["Виводиться лише «All quiet»", "Сирени закоментовані, а не видалені"],
        hints: ["Постав <code>//</code> на початку рядка, і він стане коментарем.", "<code>//</code> потрібен перед <b>обома</b> рядками ALARM. Або обгорни обидва рядки одним блоком <code>/* … */</code>."]
      },
      operators: {
        title: "Математика печива",
        story: "У мене 17 печивок на 5 друзів-роботів. Кожен отримує порівну, а залишок з'їм я. Скільки лишиться?",
        learn: `<p>JavaScript — це ще й калькулятор. Окрім <code>+ - * /</code> є два корисні оператори:</p>
                <ul><li><code>%</code> — <b>остача</b> від ділення: <code>17 % 5</code> дорівнює <code>2</code> (по 3 кожному, 2 лишилось)</li>
                <li><code>**</code> — <b>степінь</b>: <code>2 ** 3</code> дорівнює <code>8</code></li></ul>
                <pre class="ex">console.log(10 % 3);   // 1
console.log(2 ** 3);   // 8</pre>
                <p class="tip">💡 <code>n % 2 === 0</code> — класична перевірка «число парне?».</p>`,
        task: `Виведи залишок печива (<code>17</code> на <code>5</code>), а в другому рядку виведи <code>2</code> у степені <code>10</code>. Використай оператори, не вписуй відповіді вручну.`,
        starter: $("// 1) залишок печива", "// 2) два в степені десять"),
        goals: ["Виводиться 2, а потім 1024", "Ти використав оператор % та ** (Math.pow теж підійде)"],
        hints: ["Залишок = <code>17 % 5</code>.", "Два рядки <code>console.log</code>: <code>console.log(17 % 5);</code> і <code>console.log(2 ** 10);</code>"]
      },
      let: {
        title: "Твій перший ящик",
        story: "Свої речі я зберігаю в підписаних ящиках. Ящик має ім'я й тримає одне значення. Збудуй мені один!",
        learn: `<p><b>Змінна</b> — це іменований ящик для значення. Створюється через <code>let</code>, значення кладеться через <code>=</code>.
                Пізніше в той самий ящик можна покласти нове значення:</p>
                <pre class="ex">let lives = 3;      // створили ящик і наповнили
lives = lives - 1;  // тепер там 2</pre>
                <p>Зверни увагу: <code>let</code> пишеться лише <b>один раз</b>, коли змінна народжується.</p>`,
        task: `Створи змінну <code>coins</code> через <code>let</code> зі значенням <code>10</code>. Потім додай ще <code>5</code>, щоб там стало <code>15</code>.`,
        starter: $("// 1) створи coins зі значенням 10", "// 2) додай до неї ще 5"),
        goals: ["Ящик coins містить 15", "Ти створив його через let"],
        hints: ["Почни з <code>let coins = 10;</code>", "На наступному рядку: <code>coins = coins + 5;</code> (цього разу без <code>let</code>!)"]
      },
      const: {
        title: "Замкнені ящики",
        story: "Назва моєї планети не змінюється, а кількість відвідувачів — змінюється. Використай правильний ящик для кожного!",
        learn: `<p><code>const</code> — це ящик із <b>замком</b>: наповнюєш один раз, і нічого іншого вкласти вже не можна. Використовуй його за замовчуванням;
                на <code>let</code> переходь, лише коли значення справді має змінюватись.</p>
                <pre class="ex">const planet = 'Mars';   // ніколи не перепризначаємо
let visitors = 0;        // буде змінюватись
visitors = visitors + 1;</pre>
                <p class="tip">💡 <b>Правило великого пальця:</b> починай із <code>const</code>. Коли код поскаржиться, ти зрозумієш, що потрібен <code>let</code>.</p>`,
        task: `Створи <code>const planet</code> = <code>'Mars'</code> і <code>let visitors</code> = <code>0</code>. Потім додай <code>3</code> відвідувачів.`,
        starter: $("// planet: ніколи не змінюється", "// visitors: починає з 0, потім +3"),
        goals: ["planet — рядок «Mars», створений через const", "visitors містить 3, створено через let"],
        hints: ["<code>const planet = 'Mars';</code>", "<code>let visitors = 0;</code>, потім <code>visitors = visitors + 3;</code>"]
      },
      "const-error": {
        title: "Замок кусається",
        story: "Ой. Я спробував змінити замкнений ящик, і програма впала. Прочитай повідомлення про помилку, воно насправді корисне!",
        learn: `<p>Повідомлення про помилки — твої друзі: вони кажуть, <b>що саме</b> пішло не так. Тут JavaScript кидає
                <code>TypeError: Assignment to constant variable.</code>, бо <code>const</code> не може отримати друге значення.</p>
                <p>Два шляхи виправити: використати <code>let</code>, якщо значення має змінюватись, або перестати його змінювати. Сьогодні нам потрібно змінювати.</p>`,
        task: `Виправ програму так, щоб вона виводила <code>10</code> і не було помилки.`,
        goals: ["Виводиться 10", "score — число: 10"],
        hints: ["Значення має дозволяти зміну. Яке ключове слово це дозволяє?", "Заміни <code>const</code> на <code>let</code> у першому рядку."]
      },
      names: {
        title: "Назви правильно",
        story: "Я намагався назвати свої ящики, але JavaScript відмовляється приймати деякі імена. Допоможи знайти ті, що він прийме!",
        learn: `<p>Правила імен змінних:</p>
                <ul><li>лише літери, цифри, <code>_</code> та <code>$</code> (без пробілів і <code>-</code>)</li>
                <li>не може починатись із цифри</li>
                <li>не може бути зарезервованим словом: <code>class</code>, <code>let</code>, <code>if</code></li>
                <li>регістр має значення: <code>age</code> і <code>Age</code> — різні змінні</li></ul>
                <p>За домовленістю пишемо <code>camelCase</code>: <code>userName</code>, <code>totalPrice</code>.</p>`,
        task: `Перейменуй три змінні на <code>speed2x</code>, <code>myName</code> і <code>className</code>, щоб останній рядок міг їх використати.`,
        goals: ["Виводиться: 1 Bit robot"],
        hints: ["Ім'я не може починатись із цифри: <code>2fast</code> → <code>speed2x</code>.", "Дефіси заборонені (JS читає <code>my-name</code> як «my мінус name»). Використай camelCase: <code>myName</code>.", "<code>class</code> зарезервоване. Використай <code>className</code>."]
      },
      "block-scope": {
        title: "Скарб у печері",
        story: "Я закопав скарб у печері (фігурні дужки) і тепер не бачу його ззовні. Чому?",
        learn: `<p><code>let</code> і <code>const</code> живуть лише всередині <b>блоку</b> <code>{ … }</code>, де їх створили.
                Поза ним імені не існує: <code>ReferenceError: treasure is not defined</code>.</p>
                <pre class="ex">if (true) {
  let secret = 1;   // видно лише тут
}
console.log(secret); // 💥 ReferenceError</pre>
                <p>Щоб скористатись значенням зовні, створи змінну <b>поза</b> блоком, а всередині лише присвой значення.</p>`,
        task: `Зроби так, щоб програма виводила <code>gold</code>, не видаляючи блок <code>if</code>.`,
        goals: ["Виводиться gold", "Блок if усе ще на місці"],
        hints: ["Оголоси <code>let treasure;</code> <b>над</b> <code>if</code>.", "Всередині блоку пиши лише <code>treasure = 'gold';</code> (без <code>let</code>, інакше створиш другу, внутрішню змінну)."]
      },
      hoisting: {
        title: "Привид var",
        story: "Старий JavaScript використовував <code>var</code>. Він поводиться дивно. Дивись: я виводжу рівень до того, як його задав, і отримую привида: <code>undefined</code>.",
        learn: `<p><code>var</code> — це спосіб створення змінних до 2015 року. Дві дивацтва:</p>
                <ul><li><b>Hoisting (підйом):</b> оголошення піднімається нагору, але значення — ні. Прочитаєш раніше — отримаєш <code>undefined</code>, а не помилку.</li>
                <li><b>Область дії — функція:</b> <code>var</code> ігнорує блоки <code>{ }</code> і «протікає» назовні.</li></ul>
                <pre class="ex">console.log(a); // undefined (привид!)
var a = 1;

console.log(b); // 💥 ReferenceError: Cannot access 'b' before initialization
let b = 1;</pre>
                <p>Тому сучасний код використовує <code>let</code> / <code>const</code>: помилки гучні, а не мовчазні.</p>`,
        task: `Зроби так, щоб програма виводила <code>3</code>. Заміни також <code>var</code> на <code>let</code>: у новому коді <code>var</code> ніхто не використовує.`,
        goals: ["Виводиться 3", "Ніде немає var"],
        hints: ["Змінна має отримати значення <b>до</b> того, як ти його читаєш. Поміняй рядки місцями.", "Спочатку <code>let level = 3;</code>, потім <code>console.log(level);</code>"]
      },
      "types-1": {
        title: "Три тварини",
        story: "Кожне значення в JavaScript має <b>тип</b>. Наповнімо три ящики трьома найпоширенішими.",
        learn: `<p>У JavaScript 8 типів: 7 <b>примітивів</b> та об'єкти. Три, які ти використовуватимеш щодня:</p>
                <ul><li><b>string</b> — текст у лапках: <code>'hello'</code> або <code>"hello"</code></li>
                <li><b>number</b> — усі числа, цілі й дробові: <code>42</code>, <code>3.14</code></li>
                <li><b>boolean</b> — лише <code>true</code> або <code>false</code></li></ul>
                <p>Тип перевіряє <code>typeof</code>: <code>typeof 'hi'</code> → <code>'string'</code>.</p>`,
        task: `Наповни ящики: <code>title</code> — рядком, <code>lives</code> — числом, <code>isAlive</code> — булевим значенням. Будь-які значення!`,
        starter: $("// title: рядок", "// lives: число", "// isAlive: булеве значення"),
        goals: ["title — рядок", "lives — число", "isAlive — boolean"],
        hints: ["<code>let title = 'Bit';</code>", "<code>let lives = 3;</code> і <code>let isAlive = true;</code> (без лапок навколо true!)"]
      },
      "types-2": {
        title: "Рідкісні типи",
        story: "Ще чотири тварини живуть глибше в зоопарку. Виглядають дивно, але в кожної є своя робота.",
        learn: `<ul><li><b>null</b> — «навмисно порожньо»: <code>let selected = null;</code></li>
                <li><b>undefined</b> — «значення ще немає». Змінна, оголошена без значення, дорівнює <code>undefined</code>: <code>let x;</code></li>
                <li><b>bigint</b> — величезні цілі числа з <code>n</code> наприкінці: <code>123n</code></li>
                <li><b>symbol</b> — гарантовано унікальне значення: <code>Symbol('id')</code></li></ul>
                <p class="tip">💡 <code>null</code> ти ставиш навмисно. <code>undefined</code> — це те, що JavaScript дає, коли нічого не задано.</p>`,
        task: `<code>nothing</code> → null, <code>notSet</code> → undefined (оголоси без значення), <code>big</code> → bigint, <code>id</code> → symbol.`,
        starter: $("// nothing: null", "// notSet: undefined (оголоси, але не давай значення)", "// big: bigint", "// id: symbol"),
        goals: ["nothing — null", "notSet — undefined", "big — bigint", "id — symbol"],
        hints: ["<code>let nothing = null;</code> і <code>let notSet;</code>", "bigint: <code>let big = 10n;</code>, symbol: <code>let id = Symbol('id');</code>"]
      },
      "typeof-null": {
        title: "typeof бреше",
        story: "У JavaScript є знаменитий баг, старший за більшість моїх друзів. Познайомимось.",
        learn: `<p><code>typeof</code> повертає назву типу рядком. Майже завжди він правий, окрім:</p>
                <pre class="ex">typeof null      // 'object'  ← баг 1995 року, який неможливо виправити
typeof []        // 'object'
typeof function(){} // 'function'</pre>
                <p>Тому ніколи не використовуй <code>typeof</code> для перевірки на <code>null</code>. Порівнюй напряму: <code>value === null</code>.</p>`,
        task: `<code>thing</code> дорівнює <code>null</code>. Збережи <code>typeof thing</code> у <code>reported</code> (побач брехню!), а чесну відповідь на питання «це null?» — у <code>isNull</code>.`,
        goals: ["reported — рядок «object», отриманий через typeof", "isNull дорівнює true, обчислено зі змінної thing (найкращий спосіб: === null)"],
        hints: ["<code>let reported = typeof thing;</code>", "<code>let isNull = thing === null;</code>"]
      },
      "predict-typeof": {
        title: "Вгадай: typeof",
        story: "Час для гри! Я покажу рядок коду. Ти вгадуєш, що він виведе. Потім ми запустимо його й побачимо, хто мав рацію.",
        learn: `<p>Передбачати перед запуском — найкращий спосіб вчитись: мозок помічає здивування. Згадай <code>typeof</code> із попередніх рівнів.</p>`,
        task: `Обери результат кожного рядка.`,
        why: [
          "Масиви — це об'єкти. Щоб перевірити масив, використовуй <code>Array.isArray(x)</code>.",
          "NaN означає «Not-a-Number», але за типом це все одно number. Так, справді.",
          "Функції теж об'єкти, але typeof повідомляє про них окремо: «function».",
          "typeof — єдиний оператор, що не падає на неіснуючому імені: він просто каже «undefined»."
        ]
      },
      float: {
        title: "0.1 + 0.2 ≠ 0.3",
        story: "Мій калькулятор каже, що 0.1 + 0.2 = 0.30000000000000004. Він зламаний?! (Спойлер: ні. Так роблять усі мови.)",
        learn: `<p>Комп'ютери зберігають числа в двійковій системі. <code>0.1</code> не можна записати точно в двійковій, так само як 1/3 не можна точно записати в десятковій.
                Тому з'являються крихітні похибки.</p>
                <pre class="ex">0.1 + 0.2                    // 0.30000000000000004
Number((0.1 + 0.2).toFixed(1))   // 0.3  (округлили до 1 знака)
Math.round(2.5)              // 3</pre>
                <p class="tip">💡 <b>Лайфхак:</b> для грошей рахуй у центах (цілі числа): <code>1999</code> замість <code>19.99</code>.</p>`,
        task: `Зроби <code>total</code> рівно <code>0.3</code>, округливши результат обчислення (не вписуй <code>0.3</code> вручну). Підійде будь-який спосіб округлення.`,
        goals: ["total дорівнює рівно 0.3", "Ти округлив обчислення, а не вписав 0.3 вручну"],
        hints: ["Округли результат. <code>toFixed(1)</code> лишає один знак, але повертає <i>рядок</i>.", "Обгорни: <code>Number((0.1 + 0.2).toFixed(1))</code>. Або: <code>Math.round((0.1 + 0.2) * 10) / 10</code>."]
      },
      parse: {
        title: "Очисти одиниці",
        story: "Сайт надіслав мені ширину текстом: «42.5px». З цим не порахуєш. Допоможи відкинути «px»!",
        learn: `<p><code>parseInt</code> і <code>parseFloat</code> зчитують число з <b>початку</b> рядка й зупиняються на першому символі, що не підходить:</p>
                <pre class="ex">parseInt('42.5px')    // 42   (лише ціле)
parseFloat('42.5px')  // 42.5
parseInt('px42')      // NaN  (починається з літери)</pre>
                <p><code>Number('42px')</code>, навпаки, суворий: будь-який зайвий символ дає <code>NaN</code>.</p>`,
        task: `Збережи цілу частину в <code>whole</code>, а точне значення — в <code>exact</code>.`,
        goals: ["whole дорівнює 42, взято зі змінної width (найпростіше — parseInt)", "exact дорівнює 42.5, взято зі змінної width (найпростіше — parseFloat)"],
        hints: ["<code>parseInt(width)</code>", "<code>let whole = parseInt(width);</code> і <code>let exact = parseFloat(width);</code>"]
      },
      nan: {
        title: "NaN, дивак",
        story: "Я спробував прочитати число з «hello» і отримав NaN. Це найдивніше значення, яке я знаю: воно навіть не дорівнює самому собі!",
        learn: `<p><code>NaN</code> («Not a Number») — це те, що повертає невдала операція з числами. У нього унікальна властивість:</p>
                <pre class="ex">NaN === NaN          // false 😵
Number.isNaN(NaN)    // true  ← правильна перевірка
Number.isNaN('hi')   // false (суворо: лише справжній NaN)</pre>
                <p>Завжди перевіряй через <code>Number.isNaN(x)</code>. Ніколи через <code>x === NaN</code>: це завжди false.</p>`,
        task: `<code>mystery</code> дорівнює <code>NaN</code>. Задай <code>isBroken</code> через <code>Number.isNaN</code>. Потім задай <code>selfEqual</code> як <code>mystery === mystery</code> і здивуйся.`,
        goals: ["isBroken дорівнює true, перевірено зі змінної mystery (найкраще — Number.isNaN)", "selfEqual дорівнює false (NaN не дорівнює сам собі!)"],
        hints: ["<code>let isBroken = Number.isNaN(mystery);</code>", "<code>let selfEqual = mystery === mystery;</code>"]
      },
      bases: {
        title: "Говоримо двійковою",
        story: "Комп'ютери рахують лише нулями й одиницями. Hex-кольори на кшталт #ff0000 використовують систему з основою 16. Перекладаймо!",
        learn: `<p><code>number.toString(base)</code> записує число в іншій системі числення; <code>parseInt(text, base)</code> читає його назад:</p>
                <pre class="ex">(255).toString(16)     // 'ff'    (hex, напр. кольори в CSS)
(10).toString(2)       // '1010'  (двійкова)
parseInt('ff', 16)     // 255
parseInt('1010', 2)    // 10</pre>
                <p>Зверни увагу на дужки: <code>255.toString()</code> — синтаксична помилка, бо JS думає, що крапка — це десятковий роздільник.</p>`,
        task: `<code>hex</code> = 255 за основою 16. <code>binary</code> = 10 за основою 2. <code>fromBinary</code> = текст <code>'1111'</code>, прочитаний як двійкове число.`,
        goals: ["hex — «ff» (великі літери теж підійдуть)", "binary — «1010»", "fromBinary дорівнює 15"],
        hints: ["<code>(255).toString(16)</code>", "<code>(10).toString(2)</code> і <code>parseInt('1111', 2)</code>"]
      },
      bigint: {
        title: "За межею безпеки",
        story: "Після певного числа моя математика мовчки помиляється. Це число називається MAX_SAFE_INTEGER.",
        learn: `<p>Числа безпечні лише до <code>2<sup>53</sup> − 1 = 9007199254740991</code>. Вище цілі числа починають пропускатись.
                Для більших цілих використовуй <b>bigint</b>: додай <code>n</code> або виклич <code>BigInt()</code>.</p>
                <pre class="ex">9007199254740991 + 2        // 9007199254740992  ❌
9007199254740991n + 2n       // 9007199254740993n ✅
BigInt(5) + 1n               // 6n</pre>
                <p>Змішувати bigint і number не можна: <code>1n + 1</code> — це TypeError. Спершу конвертуй.</p>`,
        task: `<code>maxSafe</code> + 2 має дорівнювати <code>9007199254740993</code>. Виправ <code>next</code>, використавши bigint.`,
        goals: ["next — це bigint 9007199254740993n"],
        hints: ["Перетвори <code>maxSafe</code> на bigint через <code>BigInt(maxSafe)</code>.", "Потім додай bigint: <code>BigInt(maxSafe) + 2n</code>."]
      },
      template: {
        title: "Заповни пропуски",
        story: "Я хочу представити друга Аду, але склеювати текст через + незручно. Є кращий спосіб!",
        learn: `<p>Рядки в <b>зворотних лапках</b> (backticks) — це <i>шаблонні літерали</i>. Усе всередині <code>\${ }</code> замінюється на своє значення:</p>
                <pre class="ex">const who = 'Bit';
console.log(\`Hello, \${who}! 2+2=\${2 + 2}\`);
// Hello, Bit! 2+2=4</pre>
                <p>Вони також можуть займати кілька рядків без <code>\\n</code>.</p>`,
        task: `Збудуй <code>message</code> як <code>Ada is 36 years old</code> зі змінних <code>name</code> і <code>age</code>, використавши шаблонний літерал (зворотні лапки).`,
        goals: ["message — «Ada is 36 years old»", "Ти використав зворотні лапки й ${ }"],
        hints: ["Почни й закінчи зворотними лапками: <code>`…`</code>", "<code>let message = `${name} is ${age} years old`;</code>"]
      },
      methods: {
        title: "СПА для рядків",
        story: "Цей текст прийшов із неакуратної форми: скрізь пробіли й не той регістр. Час для спа-дня.",
        learn: `<p>Рядки мають <b>методи</b>: маленькі вбудовані інструменти, які викликаються через крапку. Вони не змінюють оригінал, а повертають новий рядок, тому їх можна з'єднувати в ланцюжок:</p>
                <pre class="ex">'  hi  '.trim()          // 'hi'
'hi'.toUpperCase()       // 'HI'
'  hi  '.trim().toUpperCase() // 'HI'</pre>
                <p>Ще запам'ятай: <code>toLowerCase()</code>, <code>includes('x')</code>, <code>startsWith('x')</code>, <code>replace('a','b')</code>.</p>`,
        task: `Створи <code>clean</code>: <code>raw</code> без пробілів по краях і великими літерами.`,
        goals: ["clean — «JAVASCRIPT»", "Збудовано з raw"],
        hints: ["Два методи: один прибирає пробіли, інший робить великі літери.", "<code>raw.trim().toUpperCase()</code>"]
      },
      slice: {
        title: "Наріж його",
        story: "«JavaScript» — це два слова, склеєні разом. Розріжмо їх!",
        learn: `<p>Рядки індексуються з <b>0</b>. <code>slice(start, end)</code> бере частину від <code>start</code> до <code>end</code> (не включно). Від'ємні числа рахують із кінця:</p>
                <pre class="ex">const w = 'JavaScript';
w[0]          // 'J'
w.length      // 10
w.slice(0, 4) // 'Java'
w.slice(4)    // 'Script'
w.slice(-6)   // 'Script'</pre>`,
        task: `<code>start</code> = перші 4 літери, <code>end</code> = останні 6 літер, <code>size</code> = скільки всього символів.`,
        goals: ["start — «Java»", "end — «Script»", "size дорівнює 10, отримано через .length"],
        hints: ["<code>word.slice(0, 4)</code>", "<code>word.slice(-6)</code> і <code>word.length</code>"]
      },
      convert: {
        title: "Підступний плюс",
        story: "У мене 5 яблук і 3 груші. Усього фруктів: 53?! Щось не так.",
        learn: `<p>З числами <code>+</code> додає. Якщо з будь-якого боку <b>рядок</b>, він склеює текст, тож JavaScript перетворює число на текст:</p>
                <pre class="ex">'5' + 3     // '53'
'5' - 3     // 2   (мінус працює лише з числами)
Number('5') + 3  // 8  ← перетворюємо явно
+'5' + 3         // 8  (унарний плюс: коротка форма Number())</pre>
                <p class="tip">💡 Дані з форм, URL і <code>localStorage</code> — це завжди рядки. Спершу перетвори, потім додавай.</p>`,
        task: `Виправ <code>total</code> так, щоб це було число <code>8</code>, і все ще використовувались <code>apples</code> та <code>pears</code>.`,
        goals: ["total — число 8", "Усе ще використовуються apples і pears"],
        hints: ["Перетвори текст на число перед додаванням.", "<code>Number(apples) + pears</code>"]
      },
      "predict-coercion": {
        title: "Вгадай: приведення типів",
        story: "JavaScript перетворює типи автоматично (<b>coercion</b>). Іноді це зручно, іноді — прикол.",
        learn: `<p>Пам'ятай: <code>+</code> з рядком дає текст; <code>-</code>, <code>*</code>, <code>/</code> дають числа. У математиці <code>true</code> стає <code>1</code>, а <code>false</code> — <code>0</code>. <code>+'a'</code> — це <code>NaN</code>.</p>`,
        task: `Обери результат кожного рядка.`,
        why: [
          "З одного боку рядок, тому + склеює текст: «5» і «3» → «53».",
          "Мінус працює лише з числами, тому «5» спершу стає 5.",
          "У математиці true стає 1, тож 1 + 1 = 2.",
          "<code>+'a'</code> перетворює «a» на число: NaN. Тоді «ba» + NaN + «a» = «baNaNa». Класичний мем про JS."
        ]
      },
      "predict-falsy": {
        title: "Вгадай: truthy чи falsy?",
        story: "В <code>if</code> кожне значення вважається <code>true</code> або <code>false</code>. Які вважаються хибними?",
        learn: `<p>Є рівно <b>6 falsy</b>-значень: <code>false</code>, <code>0</code> (а також <code>-0</code>, <code>0n</code>), <code>''</code> (порожній рядок), <code>null</code>, <code>undefined</code>, <code>NaN</code>.
                <b>Усе інше — truthy</b>, навіть <code>'0'</code>, <code>'false'</code>, <code>[]</code>, <code>{}</code>.</p>
                <p><code>Boolean(x)</code> (або <code>!!x</code>) показує, куди йде значення.</p>`,
        task: `Що повертає <code>Boolean(…)</code> для кожного з цих значень?`,
        why: [
          "Непорожній рядок завжди truthy, навіть якщо містить символ «0».",
          "Кожен об'єкт truthy, зокрема порожній масив.",
          "NaN — одне з шести falsy-значень.",
          "Рядок з одним пробілом не порожній: truthy."
        ]
      },
      "predict-equality": {
        title: "Вгадай: == проти ===",
        story: "Два види «дорівнює». Один чемний і перетворює типи; інший — суворий.",
        learn: `<p><code>===</code> (строге) порівнює значення <b>і</b> тип, без перетворень. <code>==</code> (нестроге) спершу перетворює типи за несподіваними правилами.
                <b>За замовчуванням використовуй <code>===</code>.</b></p>
                <pre class="ex">1 === '1'   // false
1 == '1'    // true  (рядок стає числом)
null == undefined  // true (особливе правило!)</pre>`,
        task: `Що виведе кожне порівняння?`,
        why: [
          "Нестроге порівняння перетворює «0» на число 0.",
          "Особливе правило: null і undefined нестрого рівні лише одне одному.",
          "NaN ніколи не дорівнює нічому, навіть самому собі (ні через ==, ні через ===).",
          "null нестрого дорівнює лише undefined, а не 0, хоча null >= 0 — true. Wat."
        ]
      },
      boss: {
        title: "Бос: чек",
        story: "Фінальний бос! Неохайний чек прийшов текстом. Використай усе, що вивчив, щоб отримати чисту суму.",
        learn: `<p>Поєднай свої інструменти: <code>trim()</code> для пробілів, <code>parseFloat()</code>, щоб прочитати число з початку рядка, <code>Number()</code> для суворого перетворення і шаблонний літерал для фінального речення.</p>`,
        task: `З <code>rawPrice</code> і <code>qty</code> збудуй: <code>price</code> (число 20.5), <code>count</code> (число 3), <code>total</code> (число 61.5) і <code>label</code> = <code>Total: 61.5 USD</code>.`,
        goals: ["price — число 20.5", "count — число 3", "total дорівнює 61.5", "label — «Total: 61.5 USD»", "Значення обчислені, а не вписані вручну"],
        hints: ["<code>parseFloat</code> ігнорує пробіл попереду й «$» позаду: <code>parseFloat(rawPrice)</code>.", "<code>count = Number(qty)</code>, <code>total = price * count</code>.", "<code>`Total: ${total} USD`</code>"]
      }
    }
  };
  root.JSQ = root.JSQ || {};
  root.JSQ.uk = root.JSQ.uk || {};
  root.JSQ.uk.lec1 = L;
})(typeof window !== "undefined" ? window : globalThis);
