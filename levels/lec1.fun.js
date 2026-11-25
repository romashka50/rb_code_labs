/* "Fun corner" of Lecture 1: facts, jokes and memes under a level. Keyed by level id; a level without an entry shows nothing.
   Item: { k: "fact" | "joke" | "meme", t: html text, code?: string (shown as a code meme), img?: path (shown as a picture) }
   Every code claim here was checked in Node. Keep it clean: the audience includes first-year students. */
(function (root) {
  var $ = function () { return Array.prototype.join.call(arguments, "\n"); };
  var F = {
    hello: {
      en: [
        { k: "fact", t: "The “Hello, World!” tradition comes from Brian Kernighan: he used it in a 1972 tutorial for the language B, and the 1978 book <i>The C Programming Language</i> made it the first program of almost every language since." },
        { k: "joke", t: "Why do programmers like “Hello, World!”? It's the only program that works on the first try." }
      ],
      uk: [
        { k: "fact", t: "Традиція «Hello, World!» походить від Браяна Кернігана: він використав її в підручнику з мови B 1972 року, а книга <i>The C Programming Language</i> (1978) зробила цю фразу першою програмою майже в усіх мовах відтоді." },
        { k: "joke", t: "Чому програмісти люблять «Hello, World!»? Це єдина програма, яка працює з першого разу." }
      ]
    },
    comments: {
      en: [
        { k: "meme", t: "The most honest comment in history:", code: $("// When I wrote this, only God and I understood what I was doing.", "// Now, God only knows.") },
        { k: "joke", t: "A comment is a letter to your future self. Spoiler: future you will not remember who wrote it and will be angry." }
      ],
      uk: [
        { k: "meme", t: "Найчесніший коментар в історії:", code: $("// Коли я це писав, лише Бог і я розуміли, що відбувається.", "// Тепер це знає лише Бог.") },
        { k: "joke", t: "Коментар — це лист собі в майбутнє. Спойлер: майбутній ти не згадає, хто це написав, і дуже розсердиться." }
      ]
    },
    operators: {
      en: [
        { k: "fact", t: "<code>2 ** 10</code> is <code>1024</code>: that's why a “kilobyte” in computer memory is 1024 bytes, not 1000. Computers love powers of two." },
        { k: "fact", t: "<code>%</code> is the hero of the legendary <b>FizzBuzz</b> interview task (“print 1 to 100, but Fizz for multiples of 3, Buzz for 5”). It was made to filter out candidates who could not write a simple loop, and many really couldn't." }
      ],
      uk: [
        { k: "fact", t: "<code>2 ** 10</code> — це <code>1024</code>: ось чому «кілобайт» у пам'яті комп'ютера це 1024 байти, а не 1000. Комп'ютери обожнюють степені двійки." },
        { k: "fact", t: "<code>%</code> — герой легендарного інтерв'ю-завдання <b>FizzBuzz</b> («виведи числа від 1 до 100, але Fizz для кратних 3 і Buzz для кратних 5»). Його придумали, щоб відсіювати кандидатів, які не вміли написати простий цикл. І таких справді було чимало." }
      ]
    },
    let: {
      en: [
        { k: "meme", t: "The natural life cycle of a variable name:", code: $("let data = 1;", "let data2 = 2;", "let dataNew = 3;", "let dataFinal = 4;", "let dataFinalReallyFinal = 5;") }
      ],
      uk: [
        { k: "meme", t: "Природний життєвий цикл назви змінної:", code: $("let data = 1;", "let data2 = 2;", "let dataNew = 3;", "let dataFinal = 4;", "let dataFinalReallyFinal = 5;") }
      ]
    },
    const: {
      en: [
        { k: "joke", t: "<code>const</code> is like a New Year's resolution, except that JavaScript actually stops you from breaking it." }
      ],
      uk: [
        { k: "joke", t: "<code>const</code> — це як новорічне рішення, лише JavaScript справді не дає тобі його порушити." }
      ]
    },
    "const-error": {
      en: [
        { k: "joke", t: "Debugging is like being the detective in a crime movie where you are also the murderer." },
        { k: "fact", t: "Reading the error message is a superpower. Surveys of beginners keep showing that many never read it. Be the one who does." }
      ],
      uk: [
        { k: "joke", t: "Дебаг — це як бути детективом у кримінальному фільмі, де ти ще й убивця." },
        { k: "fact", t: "Читання повідомлення про помилку — суперсила. Багато початківців його навіть не дочитують. Будь тим, хто читає." }
      ]
    },
    names: {
      en: [
        { k: "joke", t: "There are only two hard things in programming: cache invalidation, naming things, and off-by-one errors. (The first two are by Phil Karlton, the third is a legendary upgrade by internet users.)" },
        { k: "fact", t: "The famous jQuery <code>$</code> is just a function whose name is a dollar sign. Names may contain <code>$</code> and <code>_</code>, and even other alphabets: <code>let ಠ_ಠ = 1;</code> is a valid variable!" }
      ],
      uk: [
        { k: "joke", t: "У програмуванні є лише дві складні речі: інвалідація кешу, іменування та помилки на одиницю. (Перші дві — від Філа Карлтона, а третя — легендарне доповнення від інтернету.)" },
        { k: "fact", t: "Знаменитий jQuery <code>$</code> — це просто функція, названа знаком долара. В іменах можна використовувати <code>$</code>, <code>_</code> і навіть інші алфавіти: <code>let ಠ_ಠ = 1;</code> — цілком робоча змінна!" }
      ]
    },
    "block-scope": {
      en: [
        { k: "joke", t: "What happens in the <code>{ }</code> stays in the <code>{ }</code>." }
      ],
      uk: [
        { k: "joke", t: "Те, що трапилось у <code>{ }</code>, лишається у <code>{ }</code>." }
      ]
    },
    hoisting: {
      en: [
        { k: "joke", t: "Using <code>var</code> in a new project is like using a flip phone in 2025: technically it works, and everybody will ask why." }
      ],
      uk: [
        { k: "joke", t: "Використовувати <code>var</code> у новому проєкті — це як ходити з кнопковим телефоном у 2025: технічно працює, але всі питатимуть, навіщо." }
      ]
    },
    "types-1": {
      en: [
        { k: "joke", t: "The number <code>5</code> asks the string <code>'5'</code> out on a date. The string says: “Sorry, you're not my <b>type</b>.”" },
        { k: "fact", t: "JavaScript has just <b>one</b> kind of number (a 64-bit decimal-capable one). There is no separate “integer” type: <code>3 === 3.0</code> is <code>true</code>." }
      ],
      uk: [
        { k: "joke", t: "Число <code>5</code> запрошує рядок <code>'5'</code> на побачення. Рядок відповідає: «Вибач, ти не мій <b>тип</b>».", },
        { k: "fact", t: "У JavaScript лише <b>один</b> вид чисел (64-бітне число з плаваючою комою). Окремого типу «ціле» немає: <code>3 === 3.0</code> — це <code>true</code>." }
      ]
    },
    "types-2": {
      en: [
        { k: "fact", t: "<code>Symbol('id') === Symbol('id')</code> is <code>false</code>. Two symbols with the same description are still different, like twins with the same name." },
        { k: "fact", t: "Tony Hoare, who invented the null reference in 1965, later called it his “billion-dollar mistake”, because of all the crashes it caused over the decades." }
      ],
      uk: [
        { k: "fact", t: "<code>Symbol('id') === Symbol('id')</code> — це <code>false</code>. Два символи з однаковим описом усе одно різні, як близнюки з однаковим іменем." },
        { k: "fact", t: "Тоні Гоар, який винайшов null-посилання 1965 року, пізніше назвав це своєю «помилкою на мільярд доларів» через усі збої, які воно спричинило за десятиліття." }
      ]
    },
    "typeof-null": {
      en: [
        { k: "meme", t: "JavaScript, 1995 to today:", code: $("typeof null   // 'object'", "// “It's not a bug, it's a… okay, it's a bug.”") },
        { k: "fact", t: "Why? In the very first JS engine, values carried a small type tag, and objects had tag <code>0</code>. <code>null</code> was the “null pointer”, all zeros, so it looked like an object. A fix was proposed in 2013 but rejected: too many websites already relied on the bug." }
      ],
      uk: [
        { k: "meme", t: "JavaScript, з 1995 року й донині:", code: $("typeof null   // 'object'", "// «Це не баг, це… гаразд, це баг.»") },
        { k: "fact", t: "Чому так? У найпершому рушії JS значення мали маленьку мітку типу, а в об'єктів вона була <code>0</code>. <code>null</code> — це «нульовий вказівник», самі нулі, тож він виглядав як об'єкт. Виправлення пропонували 2013 року, але відхилили: забагато сайтів уже залежали від цього бага." }
      ]
    },
    float: {
      en: [
        { k: "fact", t: "This is not a JavaScript bug. Python, Java, C, Ruby, … all give <code>0.30000000000000004</code>. There's even a website about it: <b>0.30000000000000004.com</b>." },
        { k: "joke", t: "Floating-point numbers: where 0.1 + 0.2 and the truth are never exactly equal." }
      ],
      uk: [
        { k: "fact", t: "Це не баг JavaScript. Python, Java, C, Ruby… усі дають <code>0.30000000000000004</code>. Про це навіть є окремий сайт: <b>0.30000000000000004.com</b>." },
        { k: "joke", t: "Числа з плаваючою комою: тут 0.1 + 0.2 і правда ніколи не збігаються точно." }
      ]
    },
    parse: {
      en: [
        { k: "meme", t: "A classic JavaScript surprise. You'd expect <code>[1, 2, 3]</code>, right?", code: $("['1', '2', '3'].map(parseInt)", "// [1, NaN, NaN]") },
        { k: "fact", t: "<code>map</code> passes <b>two</b> arguments to the function: the item and its index. So <code>parseInt('2', 1)</code> means “base 1”, which doesn't exist. The fix: <code>.map(Number)</code>." }
      ],
      uk: [
        { k: "meme", t: "Класичний сюрприз JavaScript. Ти б очікував <code>[1, 2, 3]</code>, так?", code: $("['1', '2', '3'].map(parseInt)", "// [1, NaN, NaN]") },
        { k: "fact", t: "<code>map</code> передає функції <b>два</b> аргументи: елемент і його індекс. Тож <code>parseInt('2', 1)</code> означає «система числення з основою 1», якої не існує. Виправлення: <code>.map(Number)</code>." }
      ]
    },
    nan: {
      en: [
        { k: "joke", t: "NaN is the only value in JavaScript that isn't equal to itself. An identity crisis in one word." },
        { k: "fact", t: "Before <code>Number.isNaN</code> existed, developers checked <code>x !== x</code>: it's true only for NaN. Another oddity: <code>[NaN].includes(NaN)</code> is <code>true</code>, but <code>[NaN].indexOf(NaN)</code> is <code>-1</code>." }
      ],
      uk: [
        { k: "joke", t: "NaN — єдине значення в JavaScript, яке не дорівнює самому собі. Криза ідентичності в одному слові." },
        { k: "fact", t: "Коли <code>Number.isNaN</code> іще не існував, розробники перевіряли <code>x !== x</code>: це true лише для NaN. Ще дивина: <code>[NaN].includes(NaN)</code> дає <code>true</code>, а <code>[NaN].indexOf(NaN)</code> — <code>-1</code>." }
      ]
    },
    bases: {
      en: [
        { k: "joke", t: "There are 10 types of people in the world: those who understand binary, and those who don't." },
        { k: "fact", t: "Hex can spell words! <code>parseInt('cafe', 16)</code> is <code>51966</code>, and <code>parseInt('deadbeef', 16)</code> is <code>3735928559</code>. Programmers have used “DEADBEEF” as a recognisable marker value for decades." }
      ],
      uk: [
        { k: "joke", t: "У світі існує 10 типів людей: ті, хто розуміє двійкову систему, і ті, хто ні." },
        { k: "fact", t: "Шістнадцяткою можна писати слова! <code>parseInt('cafe', 16)</code> — це <code>51966</code>, а <code>parseInt('deadbeef', 16)</code> — <code>3735928559</code>. Програмісти десятиліттями використовують «DEADBEEF» як впізнаване маркерне значення." }
      ]
    },
    bigint: {
      en: [
        { k: "fact", t: "This bug hit Twitter for real. Tweet IDs are 64-bit numbers, and JavaScript rounded them. That's why the Twitter API sends every ID twice: as a number and as a string (<code>id_str</code>)." },
        { k: "meme", t: "Same limit, same “not quite”:", code: $("9007199254740993", "// 9007199254740992   ← JS quietly changed your number", "9007199254740993n", "// 9007199254740993n  ← bigint keeps it") }
      ],
      uk: [
        { k: "fact", t: "Цей баг справді вдарив по Twitter. ID твітів — це 64-бітні числа, а JavaScript їх округлював. Тому Twitter API надсилає кожен ID двічі: як число й як рядок (<code>id_str</code>)." },
        { k: "meme", t: "Та сама межа, те саме «майже»:", code: $("9007199254740993", "// 9007199254740992   ← JS тихо змінив твоє число", "9007199254740993n", "// 9007199254740993n  ← bigint зберігає його") }
      ]
    },
    template: {
      en: [
        { k: "fact", t: "The name in this level isn't random. Ada Lovelace wrote what is considered the first published computer program in 1843, for a machine (Babbage's Analytical Engine) that was never finished." },
        { k: "joke", t: "Before backticks: <code>'Hello, ' + name + '! You are ' + age</code>, and I forgot a space every single time." }
      ],
      uk: [
        { k: "fact", t: "Ім'я в цьому рівні невипадкове. Ада Лавлейс 1843 року написала те, що вважають першою опублікованою комп'ютерною програмою, для машини (аналітичної машини Беббіджа), яку так і не добудували." },
        { k: "joke", t: "До зворотних лапок: <code>'Hello, ' + name + '! You are ' + age</code>, і кожного разу я забував пробіл." }
      ]
    },
    methods: {
      en: [
        { k: "fact", t: "In 2016 a tiny npm package called <b>left-pad</b> (just 11 lines, it adds characters to the left of a string) was removed by its author, and builds of huge projects like React and Babel broke around the world. Today the same thing is built in: <code>'5'.padStart(3, '0')</code> gives <code>'005'</code>." },
        { k: "joke", t: "<code>toUpperCase()</code>: the keyboard-friendly way to yell at your users." }
      ],
      uk: [
        { k: "fact", t: "2016 року крихітний npm-пакет <b>left-pad</b> (усього 11 рядків, він додає символи ліворуч від рядка) видалив його автор, і збірки величезних проєктів, як-от React і Babel, зламались по всьому світу. Сьогодні це вбудовано в мову: <code>'5'.padStart(3, '0')</code> дає <code>'005'</code>." },
        { k: "joke", t: "<code>toUpperCase()</code> — зручний для клавіатури спосіб накричати на своїх користувачів." }
      ]
    },
    slice: {
      en: [
        { k: "fact", t: "JavaScript has three similar string cutters: <code>slice</code>, <code>substring</code> and <code>substr</code>. The third is legacy (don't use it) and the second quietly swaps its arguments if they're in the wrong order. Just remember <code>slice</code>." }
      ],
      uk: [
        { k: "fact", t: "У JavaScript є три схожі «різаки» рядків: <code>slice</code>, <code>substring</code> і <code>substr</code>. Третій застарілий (не використовуй), а другий мовчки міняє аргументи місцями, якщо вони в неправильному порядку. Запам'ятай просто <code>slice</code>." }
      ]
    },
    convert: {
      en: [
        { k: "meme", t: "“Math” in JavaScript:", code: $("9 + '1'      // '91'", "9 + '1' - 1  // 90", "// Both answers are correct. Somehow.") },
        { k: "joke", t: "JavaScript: <code>+</code> adds numbers and glues strings, and it decides which one by looking at your mood." }
      ],
      uk: [
        { k: "meme", t: "«Математика» в JavaScript:", code: $("9 + '1'      // '91'", "9 + '1' - 1  // 90", "// Обидві відповіді правильні. Якось.") },
        { k: "joke", t: "JavaScript: <code>+</code> додає числа й склеює рядки, а що саме робити, вирішує за твоїм настроєм." }
      ]
    },
    "predict-coercion": {
      en: [
        { k: "fact", t: "These quirks became famous thanks to the 2012 lightning talk <b>“Wat”</b> by Gary Bernhardt. It's 4 minutes long and still one of the funniest talks about programming languages." }
      ],
      uk: [
        { k: "fact", t: "Ці дивацтва прославились завдяки лайтнінг-доповіді <b>«Wat»</b> Гері Бернгардта 2012 року. Вона триває 4 хвилини й досі лишається однією з найсмішніших доповідей про мови програмування." }
      ]
    },
    "predict-falsy": {
      en: [
        { k: "joke", t: "A programmer's partner says: “Go to the store and buy a loaf of bread. If they have eggs, buy 12.” The programmer comes back with 12 loaves. “They had eggs.”" },
        { k: "fact", t: "The string <code>'false'</code> is truthy. Yes, really. This has caused real bugs when programs read settings from text files." }
      ],
      uk: [
        { k: "joke", t: "Дружина каже програмістові: «Сходи в магазин і купи буханку хліба. Якщо будуть яйця, візьми 12». Програміст повертається з 12 буханками. «Там були яйця».", },
        { k: "fact", t: "Рядок <code>'false'</code> — truthy. Так, справді. Через це траплялись реальні баги, коли програми читали налаштування з текстових файлів." }
      ]
    },
    "predict-equality": {
      en: [
        { k: "meme", t: "The meme from the lecture video:", img: "assets/meme-equality.png" },
        { k: "fact", t: "Many of these quirks exist because JavaScript was first written by Brendan Eich in just <b>10 days</b> in May 1995, and then the whole web started depending on every detail." },
        { k: "joke", t: "<code>==</code> is the friend who agrees with everything you say. <code>===</code> is the friend who checks your ID first." }
      ],
      uk: [
        { k: "meme", t: "Мем із відео лекції:", img: "assets/meme-equality.png" },
        { k: "fact", t: "Багато з цих дивацтв існують, бо JavaScript уперше написав Брендан Айх усього за <b>10 днів</b> у травні 1995 року, а потім увесь веб почав залежати від кожної дрібниці." },
        { k: "joke", t: "<code>==</code> — друг, який погоджується з усім, що ти кажеш. <code>===</code> — друг, який спершу перевіряє документи." }
      ]
    },
    boss: {
      en: [
        { k: "meme", t: "Achievement unlocked:", code: $("const bugs = 0;", "// “It's not a bug, it's an undocumented feature.”") },
        { k: "joke", t: "Congratulations, you've survived the type zoo. In the real world the final boss is called “the client who sends dates as text”." }
      ],
      uk: [
        { k: "meme", t: "Досягнення розблоковано:", code: $("const bugs = 0;", "// «Це не баг, це недокументована фіча».") },
        { k: "joke", t: "Вітаю, ти пережив зоопарк типів. У реальному світі фінального боса звуть «клієнт, який надсилає дати текстом»." }
      ]
    }
  };
  root.JSQ = root.JSQ || {};
  root.JSQ.fun = root.JSQ.fun || {};
  root.JSQ.fun.lec1 = F;
})(typeof window !== "undefined" ? window : globalThis);
