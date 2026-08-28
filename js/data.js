/* =============================================================
   DATA.JS — ЕДИНСТВЕННЫЙ ФАЙЛ, КОТОРЫЙ НУЖНО РЕДАКТИРОВАТЬ
   Всё содержимое сайта собрано из вашего резюме и ссылок на проекты.
   HTML, CSS и остальной JS трогать не нужно.
   Строки вида { ru: "...", en: "..." } — перевод на два языка.

   Метки «← ПРОВЕРЬТЕ» стоят там, где нужен ваш взгляд.
   ============================================================= */

const SITE = {

  /* ---------- 1. КТО ВЫ ---------- */
  person: {
    name:      { ru: "Чингиз Торогелдиев", en: "Chyngyz Torogeldiev" },
    shortName: { ru: "Чингиз",             en: "Chyngyz" },
    initials:  "A",                        // буква в квадратике логотипа
    brand:     "ARAKET",                   // подпись рядом с логотипом (пусто — будет имя)
    role:      { ru: "Python-разработчик · Backend",
                 en: "Python Developer · Backend" },
    // Главный заголовок первого экрана. Слово в *звёздочках* — курсив с градиентом.
    headline:  { ru: "Пишу backend на *Python*",
                 en: "I build backends with *Python*" },
    tagline:   { ru: "Python, Django и PostgreSQL на бэкенде, React и Figma-макеты на фронтенде. AI-инструменты использую каждый день — как ускоритель, а не как замену пониманию кода.",
                 en: "Python, Django and PostgreSQL on the backend, React and Figma layouts on the front. I use AI tools daily — as an accelerator, not as a substitute for understanding the code." },
    bio: {
      ru: [
        "Пришёл в разработку из экономики: закончил ОшТУ, несколько лет администрировал сайты организаций, а в 2020–2021 прошёл программу IT Academia и с тех пор пишу код.",
        "Сейчас работаю в команде над реальными продуктами — сайтами, мобильными приложениями и CRM-системами. Быстро осваиваю новое и довожу задачи до результата, а не до «почти готово»."
      ],
      en: [
        "I came into development from economics: I graduated from OshTU, spent several years administering organisations' websites, and in 2020–2021 completed the IT Academia programme — I've been writing code ever since.",
        "Today I work in a team on real products — websites, mobile apps and CRM systems. I pick up new things fast and take tasks all the way to done, not to 'almost done'."
      ]
    },
    available: true,                       // true -> зелёный бейдж
    availableText: { ru: "Открыт к работе и проектам", en: "Open to work and projects" },
    location: { ru: "Бишкек, Кыргызстан", en: "Bishkek, Kyrgyzstan" },
    timezone: "Asia/Bishkek",              // для живых часов в блоке «Обо мне»
    experienceSince: 2022,                 // стаж считается автоматически
    avatar: "assets/avatar.png",           // фото в блоке «Обо мне»
    photo:  "assets/photo.png",            // фото на первом экране (пусто — не показывать)
    // Фото неподвижное. Чтобы голова снова поворачивалась за курсором, поставьте:
    //   photo: "assets/photo-body.png", photoHead: "assets/photo-head.png"
    photoHead: "",
    resume: "assets/cv.pdf"                // ваше резюме — кнопка на первом экране
  },

  /* ---------- 2. КОНТАКТЫ (пустые поля просто не показываются) ---------- */
  contacts: {
    // ← ПРОВЕРЬТЕ: взял почту из резюме. Вторая ваша почта — www.araket@gmail.com
    email:     "chingiz.torogeldievv@gmail.com",
    phone:     "+996 755 35 14 41",
    telegram:  "https://t.me/Chyngyz_Torogeldiev",
    whatsapp:  "https://wa.me/996755351441",
    github:    "https://github.com/ChyngyzTorogeldiev",
    linkedin:  "https://www.linkedin.com/in/ali-chyngyz-torogeldiev-4056a5204/",
    behance:   "",
    dribbble:  "",
    instagram: "",
    youtube:   "",
    website:   "https://chyngyztorogeldiev.github.io/resume-2026/"
  },

  /* ---------- 3. ЦИФРЫ НА ПЕРВОМ ЭКРАНЕ ---------- */
  stats: [
    { value: 4, suffix: "", label: { ru: "года в вебе",           en: "years in web" } },
    { value: 5, suffix: "", label: { ru: "проектов в портфолио",  en: "projects in portfolio" } },
    { value: 3, suffix: "", label: { ru: "языка: кыргызский, русский, английский",
                                     en: "languages: Kyrgyz, Russian, English" } }
  ],

  /* ---------- 4. СТЕК (бегущая строка + сетка) ---------- */
  stack: [
    "Python", "Django", "DRF", "REST API",
    "PostgreSQL", "SQL", "JavaScript", "React",
    "Material UI", "HTML5", "CSS3", "Git",
    "GitHub", "Figma", "AI-инструменты"
  ],

  /* ---------- 5. УСЛУГИ ---------- */
  services: [
    {
      icon: "app",
      title: { ru: "Backend на Python и Django", en: "Python & Django backend" },
      text:  { ru: "Серверная часть сайтов и сервисов: REST API на DRF, база на PostgreSQL, админка, авторизация и роли пользователей.",
               en: "The server side of sites and services: REST APIs on DRF, a PostgreSQL database, admin panel, authentication and user roles." },
      tags: ["Django", "DRF", "PostgreSQL"]
    },
    {
      icon: "layout",
      title: { ru: "Вёрстка по макетам Figma", en: "Figma-to-code markup" },
      text:  { ru: "Превращаю макет в живую страницу: адаптив от телефона до широкого экрана, аккуратные отступы, работающие формы.",
               en: "I turn a design into a live page: responsive from phone to wide screen, precise spacing, forms that actually work." },
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      icon: "cart",
      title: { ru: "Личные кабинеты и CRM", en: "Client portals & CRM" },
      text:  { ru: "Интерфейсы, в которых работают каждый день: профили, рейтинги, справочники, таблицы и отчёты на React с Material UI.",
               en: "Interfaces people use every day: profiles, rankings, catalogs, tables and reports built with React and Material UI." },
      tags: ["React", "Material UI", "REST API"]
    },
    {
      icon: "spark",
      title: { ru: "Поддержка и наполнение сайтов", en: "Site support & content" },
      text:  { ru: "Веду сайт после запуска: каталог и контент, правки вёрстки, проверка данных, ответы на обращения пользователей.",
               en: "I keep a site running after launch: catalog and content, markup fixes, data checks and handling user requests." },
      tags: ["Support", "Content", "QA"]
    }
  ],

  /* ---------- 6. ПРОЕКТЫ ---------- */
  projects: [
    {
      title: "MemoryMee Atlas",
      category: "app",
      year: "",                            // ← ПРОВЕРЬТЕ: год работы над проектом
      role:  { ru: "Фронтенд личного кабинета", en: "Student dashboard frontend" },
      text:  { ru: "Образовательная платформа школы ментальной арифметики: личный кабинет студента с профилем, рейтингом и результатами обучения, расписанием занятий и новостями. Ставится на телефон как приложение.",
               en: "An educational platform for a mental arithmetic school: a student dashboard with profile, ranking and learning results, class schedule and news. Installs on a phone like an app." },
      tags: ["React", "Material UI", "PWA"],
      metric:{ ru: "", en: "" },           // напр. «300+ учеников» — если знаете цифру
      link: "https://atlas.memorymee.org/", colors: ["#4a4fd6", "#7c5cff"]
    },
    {
      title: "Amana ERP",
      category: "app",
      year: "",                            // ← ПРОВЕРЬТЕ: год работы над проектом
      role:  { ru: "Фронтенд-разработка", en: "Frontend development" },
      text:  { ru: "Облачная ERP для малого бизнеса: продажи, склад, закупки, финансы и контрагенты в одной системе. Тёмная тема и три языка интерфейса — русский, английский, кыргызский.",
               en: "A cloud ERP for small business: sales, inventory, purchasing, finance and counterparties in one system. Dark theme and three interface languages — Russian, English, Kyrgyz." },
      tags: ["Django", "React", "CRM"],
      metric:{ ru: "", en: "" },
      // Боевого адреса пока нет — ссылка ведёт на staging-версию.
      link: "https://staging.amanaerp.dev/app/contractors", colors: ["#6c5ce7", "#18e0c8"]
    },
    {
      title: "Намаз убактысы",
      category: "web",
      year: "",
      role:  { ru: "Разработка целиком", en: "Solo development" },
      text:  { ru: "Веб-сервис расписания намаза: показывает время молитв на день по выбранному городу. Веб-версию сделал полностью сам, сейчас переношу функциональность в мобильные приложения для Android и iOS.",
               en: "A prayer times web service: shows the daily namaz schedule for a chosen city. I built the web version entirely myself and am now porting it to Android and iOS apps." },
      tags: ["Python", "Django", "PostgreSQL", "JavaScript"],
      metric:{ ru: "", en: "" },
      // Когда сделаете репозиторий публичным — впишите сюда ссылку, и на карточке
      // появится кнопка «Открыть проект»:
      // link: "https://github.com/ChyngyzTorogeldiev/namaz-ubaktysy",
      link: "", colors: ["#18e0c8", "#c6f24e"]
    },
    {
      title: "Гренки",
      category: "web",
      year: "",
      // ← ПРОВЕРЬТЕ: уточните роль, описание и стек — репозиторий приватный, деталей я не видел
      role:  { ru: "Разработка сайта", en: "Website development" },
      text:  { ru: "Сайт кафе «Гренки»: меню, информация для гостей и контакты.",
               en: "Website for the Grenki cafe: menu, guest information and contacts." },
      tags: ["HTML", "CSS", "JavaScript"],
      metric:{ ru: "", en: "" },
      // Репозиторий github.com/ChyngyzTorogeldiev/grenki-site приватный — ссылка вела бы на 404.
      // Сделайте его публичным (или дайте адрес живого сайта) и впишите ссылку сюда:
      // link: "https://github.com/ChyngyzTorogeldiev/grenki-site",
      link: "", colors: ["#ff8a3d", "#ffd166"]
    },
    {
      title: "MemoryMee Games",
      category: "web",
      year: "",
      role:  { ru: "Редизайн раздела", en: "Section redesign" },
      text:  { ru: "Полная переработка дизайна раздела игр по современному лендинг-референсу: новая структура блоков, типографика и адаптив.",
               en: "A full redesign of the games section following a modern landing page reference: new block structure, typography and responsive layout." },
      tags: ["HTML", "CSS", "JavaScript"],
      metric:{ ru: "", en: "" },
      link: "https://memorymee.org/games", colors: ["#4dd0ff", "#7c5cff"]
    }
  ],

  projectFilters: [
    { key: "all", label: { ru: "Все",             en: "All" } },
    { key: "app", label: { ru: "Веб-приложения",  en: "Web apps" } },
    { key: "web", label: { ru: "Сайты и сервисы", en: "Sites & services" } }
  ],

  /* ---------- 7. КАК Я РАБОТАЮ ---------- */
  process: [
    { title: { ru: "Разбор задачи",  en: "Discovery" },
      text:  { ru: "Созвон: что за продукт, кто им пользуется, что должно получиться. На выходе — понятный список функций и сроки.",
               en: "A call: what the product is, who uses it, what the result must be. You get a clear feature list and timeline." } },
    { title: { ru: "Макет и структура", en: "Design & structure" },
      text:  { ru: "Работаю по макетам Figma — своим или вашего дизайнера. Сначала согласуем структуру блоков, потом внешний вид.",
               en: "I work from Figma designs — mine or your designer's. First we agree on the block structure, then on the visuals." } },
    { title: { ru: "Разработка", en: "Development" },
      text:  { ru: "Backend на Django, фронтенд по макету. AI-инструменты ускоряют рутину и помогают ловить ошибки, но каждую строчку читаю сам.",
               en: "Django on the back, markup on the front. AI tools speed up the routine and help catch mistakes, but I read every line myself." } },
    { title: { ru: "Запуск и поддержка", en: "Launch & support" },
      text:  { ru: "Деплой, проверка на реальных данных, передача доступов. Дальше — поддержка, наполнение и новые функции.",
               en: "Deploy, testing on real data, full handover. Then support, content and new features." } }
  ],

  /* ---------- 8. ОПЫТ И ОБРАЗОВАНИЕ ---------- */
  experience: [
    { period: { ru: "Июнь 2026 — сейчас", en: "June 2026 — now" },
      role:   { ru: "Разработчик (стажировка)", en: "Developer (internship)" },
      company:{ ru: "Частная компания при КНУ им. Ж. Баласагына", en: "Private company at J. Balasagyn KNU" },
      text:   { ru: "Разработка и поддержка веб-сайтов, мобильных приложений и CRM-систем в составе команды. Вёрстка и доработка интерфейсов по макетам Figma, применение AI-инструментов для ускорения разработки и проверки кода.",
                en: "Building and maintaining websites, mobile apps and CRM systems as part of a team. Markup and UI work from Figma designs, plus AI tools to speed up development and code review." } },
    { period: { ru: "2024 — 2025", en: "2024 — 2025" },
      role:   { ru: "Администратор сайта", en: "Website administrator" },
      company:{ ru: "Интернет-магазин «Matrix Компания»", en: "Matrix Company online store" },
      text:   { ru: "Наполнение и поддержка каталога товаров, контроль корректности данных, правки вёрстки и контента, работа с командой по техническим задачам.",
                en: "Filling and maintaining the product catalog, data accuracy control, markup and content fixes, working with the team on technical tasks." } },
    { period: { ru: "2022 — 2023", en: "2022 — 2023" },
      role:   { ru: "Администратор сайта", en: "Website administrator" },
      company:{ ru: "Ошская центральная библиотечная система им. К. Ташбаева", en: "K. Tashbaev Osh Central Library System" },
      text:   { ru: "Администрирование и наполнение официального сайта учреждения: публикация материалов, поддержка структуры разделов, работа с обращениями пользователей.",
                en: "Administering and filling the organisation's official website: publishing materials, maintaining the section structure, handling user requests." } },
    { period: { ru: "2020 — 2021", en: "2020 — 2021" },
      role:   { ru: "Разработка программного обеспечения", en: "Software development programme" },
      company:{ ru: "IT Academia · программа государственной поддержки", en: "IT Academia · state-supported programme" },
      text:   { ru: "Профессиональная переподготовка в разработке: основы программирования, работа с базами данных и первые учебные проекты.",
                en: "Professional retraining in development: programming fundamentals, databases and first hands-on projects." } },
    { period: { ru: "2007 — 2010", en: "2007 — 2010" },
      role:   { ru: "Кредитный специалист · Специалист рекламного отдела", en: "Loan officer · Advertising specialist" },
      company:{ ru: "«ФИНКА», «ЭлТР»", en: "FINCA, ElTR" },
      text:   { ru: "Работа с клиентами, отчётностью и подготовкой материалов — до перехода в IT. Этот опыт помогает понимать бизнес-задачу заказчика, а не только техническую.",
                en: "Client work, reporting and materials preparation — before moving into IT. That experience helps me understand a client's business problem, not just the technical one." } },
    { period: { ru: "2003 — 2007", en: "2003 — 2007" },
      role:   { ru: "Экономист-менеджер", en: "Economist-manager" },
      company:{ ru: "Ошский технологический университет им. М. М. Адышева", en: "M. Adyshev Osh Technological University" },
      text:   { ru: "Факультет экономики и управления, специальность «Экономика и управление на предприятии».",
                en: "Faculty of Economics and Management, degree in Enterprise Economics and Management." } }
  ],

  /* ---------- 9. ЧАСТЫЕ ВОПРОСЫ ---------- */
  faq: [
    { q: { ru: "С какими технологиями работаете?", en: "What technologies do you work with?" },
      a: { ru: "Backend — Python, Django, Django REST Framework, REST API. База данных — PostgreSQL и SQL. Frontend — HTML, CSS, JavaScript, React и Material UI. Инструменты — Git, GitHub, Figma и AI-ассистенты разработки.",
           en: "Backend — Python, Django, Django REST Framework, REST APIs. Database — PostgreSQL and SQL. Frontend — HTML, CSS, JavaScript, React and Material UI. Tools — Git, GitHub, Figma and AI coding assistants." } },
    { q: { ru: "Как вы используете AI в работе?", en: "How do you use AI in your work?" },
      a: { ru: "AI берёт на себя рутину: черновики кода, разбор чужих модулей, поиск ошибок и проверку правок. Задачу ставлю я, архитектуру и результат проверяю тоже я — за код отвечает человек, а не модель.",
           en: "AI takes the routine: code drafts, digging through unfamiliar modules, spotting bugs and reviewing changes. I set the task and I check the architecture and the result — a human owns the code, not the model." } },
    { q: { ru: "Рассматриваете работу в штате?", en: "Are you open to full-time roles?" },
      a: { ru: "Да. Сейчас работаю в команде и открыт к предложениям — и в Бишкеке, и удалённо. Резюме можно скачать кнопкой на первом экране, а написать удобнее всего в Telegram.",
           en: "Yes. I currently work in a team and I'm open to offers — both in Bishkek and remote. You can download my CV from the button on the first screen; Telegram is the fastest way to reach me." } },
    // ← ПРОВЕРЬТЕ: допишите языки, на которых готовы общаться с заказчиком
    { q: { ru: "На каких языках вы общаетесь?", en: "What languages do you speak?" },
      a: { ru: "Кыргызский — родной, русский — свободно, английский — базовый (A2–B1), техническую документацию читаю свободно и продолжаю его подтягивать.",
           en: "Kyrgyz is my native language, Russian is fluent, English is basic (A2–B1) — I read technical documentation comfortably and keep improving it." } },
    { q: { ru: "Сколько стоит работа и сколько занимает времени?", en: "How much does it cost and how long does it take?" },
      a: { ru: "Зависит от объёма: небольшой сайт — это дни, сервис с личным кабинетом — недели. Называю цену и срок после короткого созвона, когда понятен список функций, и фиксирую договорённости письменно.",
           en: "It depends on scope: a small site takes days, a service with a user dashboard takes weeks. I give a price and a deadline after a short call, once the feature list is clear, and put the agreement in writing." } }
  ],

  /* ---------- 10. ИНТЕРФЕЙС (переводы кнопок и заголовков) ---------- */
  ui: {
    navWork:      { ru: "Работы",     en: "Work" },
    navServices:  { ru: "Услуги",     en: "Services" },
    navAbout:     { ru: "Обо мне",    en: "About" },
    navProcess:   { ru: "Процесс",    en: "Process" },
    navContact:   { ru: "Контакты",   en: "Contact" },
    ctaHire:      { ru: "Обсудить проект", en: "Start a project" },
    ctaWork:      { ru: "Смотреть работы", en: "View work" },
    ctaResume:    { ru: "Скачать резюме",  en: "Download CV" },
    scroll:       { ru: "Листайте вниз",   en: "Scroll down" },

    secServices:  { ru: "Что я делаю",    en: "What I do" },
    secServicesT: { ru: "Задачи, которые беру *на себя*",
                    en: "What I *take on*" },
    secWork:      { ru: "Избранные работы", en: "Selected work" },
    secWorkT:     { ru: "Проекты, которые *работают* прямо сейчас",
                    en: "Projects that are *live* right now" },
    secAbout:     { ru: "Обо мне", en: "About me" },
    secAboutT:    { ru: "Из экономики — *в разработку*",
                    en: "From economics *into development*" },
    secProcess:   { ru: "Процесс", en: "Process" },
    secProcessT:  { ru: "Как проходит работа *шаг за шагом*",
                    en: "How we work *step by step*" },
    secExp:       { ru: "Опыт и образование", en: "Experience & education" },
    secExpT:      { ru: "Путь в *разработку*", en: "My path *into development*" },
    secFaq:       { ru: "Вопросы", en: "FAQ" },
    secFaqT:      { ru: "Отвечаю *заранее*", en: "Answered *upfront*" },
    secContact:   { ru: "Контакты", en: "Contact" },

    contactTitle: { ru: "Давайте сделаем что-то *стоящее*", en: "Let us build something *worth it*" },
    contactText:  { ru: "Расскажите про задачу или вакансию — отвечу в течение нескольких часов и честно скажу, чем могу помочь.",
                    en: "Tell me about your project or role — I reply within a few hours and tell you honestly how I can help." },
    formName:     { ru: "Как вас зовут",   en: "Your name" },
    formEmail:    { ru: "Email или телефон", en: "Email or phone" },
    formMessage:  { ru: "О проекте: задача, сроки, бюджет", en: "About the project: goal, timeline, budget" },
    formSend:     { ru: "Отправить сообщение", en: "Send message" },
    formSending:  { ru: "Открываю почту…",  en: "Opening your mail app…" },
    copy:         { ru: "Скопировать",  en: "Copy" },
    copied:       { ru: "Скопировано!", en: "Copied!" },
    localTime:    { ru: "Местное время", en: "Local time" },
    stackTitle:   { ru: "Работаю с", en: "I work with" },
    nowTitle:     { ru: "Сейчас в работе", en: "Currently working on" },
    nowText:      { ru: "Мобильные версии «Намаз убактысы» для Android и iOS. Параллельно — английский, математика и слепая печать.",
                    en: "Android and iOS versions of Namaz Ubaktysy. In parallel — English, maths and touch typing." },
    yearsLabel:   { ru: "года в вебе", en: "years in web" },
    backTop:      { ru: "Наверх", en: "Back to top" },
    rights:       { ru: "Все права защищены", en: "All rights reserved" },
    viewProject:  { ru: "Открыть проект", en: "View project" },
    themeToggle:  { ru: "Сменить тему", en: "Toggle theme" },
    langToggle:   { ru: "Switch to English", en: "Переключить на русский" },
    menu:         { ru: "Меню", en: "Menu" }
  }
};

if (typeof window !== "undefined") window.SITE = SITE;
