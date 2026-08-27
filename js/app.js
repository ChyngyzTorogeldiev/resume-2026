/* ============================================================
   APP.JS — вся логика сайта.
   Ничего здесь менять не нужно: тексты и данные лежат в data.js
   ============================================================ */
(() => {
  "use strict";
  const D = window.SITE;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- язык ---------- */
  let lang = localStorage.getItem("lang") || (navigator.language || "ru").slice(0, 2).toLowerCase();
  if (lang !== "en") lang = "ru";

  const t = v => (v && typeof v === "object" ? (v[lang] ?? v.ru ?? "") : (v ?? ""));
  const ui = k => t(D.ui[k]);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const rich = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");

  /* ---------- иконки ---------- */
  const ICONS = {
    layout: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>',
    cart:   '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/>',
    app:    '<rect x="2.5" y="4" width="19" height="14" rx="2.5"/><path d="M2.5 9h19M7 21h10"/>',
    spark:  '<path d="M12 2.5 14.3 9 21 11.3 14.3 13.6 12 20.2 9.7 13.6 3 11.3 9.7 9z"/>',
    mail:   '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
    phone:  '<path d="M6.5 3h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5L16 12l4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.4 5.2 2 2 0 0 1 6.5 3z"/>',
    chat:   '<path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.4-5.2A8.5 8.5 0 1 1 21 12z"/>',
    pin:    '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    arrow:  '<path d="M6 18 18 6M9 6h9v9"/>'
  };
  const svg = (n, cls = "") => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICONS[n] || ""}</svg>`;

  /* ============================================================
     РЕНДЕР
     ============================================================ */
  function renderAll() {
    document.documentElement.lang = lang;
    const P = D.person, C = D.contacts;

    /* — статические подписи — */
    $$("[data-ui]").forEach(el => { const k = el.dataset.ui; if (D.ui[k]) el.textContent = ui(k); });
    $$("[data-ui-rich]").forEach(el => { const k = el.dataset.uiRich; if (D.ui[k]) el.innerHTML = rich(ui(k)); });

    /* — мета и шапка — */
    const name = t(P.name);
    document.title = `${P.brand || name} — ${t(P.role)}`;
    setMeta("description", t(P.tagline));
    setMeta("author", name, true);
    $("#logoMark").textContent = P.initials || name.slice(0, 2).toUpperCase();
    $("#preMark").textContent  = P.initials || name.slice(0, 2).toUpperCase();
    $("#logoName").textContent = P.brand || name;
    $("#langLabel").textContent = lang === "ru" ? "EN" : "RU";
    $("#langBtn").setAttribute("aria-label", ui("langToggle"));
    $("#themeBtn").setAttribute("aria-label", ui("themeToggle"));

    /* — hero — */
    const badge = $("#availBadge");
    badge.hidden = !P.available;
    $("#availText").textContent = t(P.availableText);
    $("#heroTitle").innerHTML = splitWords(t(P.headline));
    $("#heroRole").textContent = t(P.role);
    $("#heroText").textContent = t(P.tagline);
    const heroPhoto = $("#heroPhoto"), heroHead = $("#heroHead");
    const stage = heroPhoto.closest(".hero__photo");
    if (P.photo) {
      heroPhoto.src = P.photo; heroPhoto.alt = name; stage.hidden = false;
      if (P.photoHead) { heroHead.src = P.photoHead; heroHead.hidden = false; }
      else heroHead.hidden = true;
    } else stage.hidden = true;

    const resume = $("#resumeBtn");
    if (P.resume) { resume.hidden = false; resume.href = P.resume; resume.setAttribute("download", ""); }
    else resume.hidden = true;

    $("#heroStats").innerHTML = D.stats.map(s => `
      <div class="stat reveal">
        <div class="stat__num" data-count="${s.value}" data-suffix="${esc(s.suffix || "")}">0</div>
        <span class="stat__label">${esc(t(s.label))}</span>
      </div>`).join("");

    /* — бегущая строка (дублируется для бесшовности) — */
    const row = D.stack.map(s => `<span class="marquee__item">${esc(s)}</span>`).join("");
    $("#marqueeTrack").innerHTML = row + row;

    /* — услуги — */
    $("#servicesGrid").innerHTML = D.services.map((s, i) => `
      <article class="card reveal" data-tilt>
        <span class="card__num">0${i + 1}</span>
        <div class="card__icon">${svg(s.icon)}</div>
        <h3>${esc(t(s.title))}</h3>
        <p>${esc(t(s.text))}</p>
        <div class="card__tags">${(s.tags || []).map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
      </article>`).join("");

    /* — фильтры и работы — */
    $("#filters").innerHTML = D.projectFilters.map((f, i) =>
      `<button class="filter${i === 0 ? " active" : ""}" type="button" data-filter="${esc(f.key)}">${esc(t(f.label))}</button>`
    ).join("");

    $("#worksGrid").innerHTML = D.projects.map(p => {
      const [c1, c2] = p.colors || ["#7c5cff", "#18e0c8"];
      const link = p.link
        ? `<a class="work__link" href="${esc(p.link)}" target="_blank" rel="noopener">${ui("viewProject")}${svg("arrow")}</a>`
        : "";
      return `
      <article class="work reveal" data-cat="${esc(p.category)}" data-tilt data-cursor="${esc(p.title)}">
        <div class="work__visual" style="--c1:${esc(c1)};--c2:${esc(c2)}">
          ${t(p.metric) ? `<span class="work__metric">${esc(t(p.metric))}</span>` : ""}
          <div class="work__mock">
            <div class="work__bar"><i></i><i></i><i></i></div>
            <div class="work__line work__line--w1"></div>
            <div class="work__line work__line--w2"></div>
            <div class="work__line work__line--w3"></div>
            <div class="work__blocks"><i></i><i></i><i></i></div>
          </div>
        </div>
        <div class="work__body">
          <div class="work__top">
            <h3 class="work__title">${esc(p.title)}</h3>
            ${p.year ? `<span class="work__year">${esc(p.year)}</span>` : ""}
          </div>
          <span class="work__role">${esc(t(p.role))}</span>
          <p class="work__text">${esc(t(p.text))}</p>
          <div class="work__foot">
            <div class="work__tags">${(p.tags || []).map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
            ${link}
          </div>
        </div>
      </article>`;
    }).join("");

    /* — обо мне — */
    $("#aboutName").textContent = name;
    $("#aboutRole").textContent = t(P.role);
    $("#avatar").innerHTML = P.avatar
      ? `<img src="${esc(P.avatar)}" alt="${esc(name)}" loading="lazy">`
      : esc(P.initials || name.slice(0, 2).toUpperCase());
    $("#aboutBio").innerHTML = (P.bio[lang] || P.bio.ru).map(x => `<p>${esc(x)}</p>`).join("");
    $("#signature").textContent = t(P.shortName);
    $("#clockCity").textContent = t(P.location);
    $("#stackChips").innerHTML = D.stack.map(s => `<span class="chip">${esc(s)}</span>`).join("");
    const years = Math.max(1, new Date().getFullYear() - P.experienceSince);
    $("#yearsNum").dataset.count = years;

    /* — процесс — */
    $("#processGrid").innerHTML = D.process.map((s, i) => `
      <article class="step reveal">
        <div class="step__num">${i + 1}</div>
        <h3>${esc(t(s.title))}</h3>
        <p>${esc(t(s.text))}</p>
      </article>`).join("");

    /* — опыт — */
    $("#timeline").innerHTML = D.experience.map(e => `
      <article class="tl reveal">
        <span class="tl__period">${esc(t(e.period))}</span>
        <div>
          <h3 class="tl__role">${esc(t(e.role))}</h3>
          <div class="tl__company">${esc(t(e.company))}</div>
          <p class="tl__text">${esc(t(e.text))}</p>
        </div>
      </article>`).join("");

    /* — FAQ — */
    $("#faqList").innerHTML = D.faq.map((f, i) => `
      <div class="faq__item reveal">
        <button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-${i}">
          <span>${esc(t(f.q))}</span><span class="faq__ic" aria-hidden="true"></span>
        </button>
        <div class="faq__a" id="faq-${i}"><p>${esc(t(f.a))}</p></div>
      </div>`).join("");

    /* — контакты — */
    $("#emailLink").textContent = C.email;
    $("#emailLink").href = `mailto:${C.email}`;

    const cards = [];
    if (C.email)    cards.push(["mail",  "Email",                        C.email,            `mailto:${C.email}`]);
    if (C.phone)    cards.push(["phone", lang === "ru" ? "Телефон" : "Phone", C.phone,      `tel:${C.phone.replace(/[^\d+]/g, "")}`]);
    if (C.telegram) cards.push(["chat",  "Telegram",                     handle(C.telegram), C.telegram]);
    cards.push(["pin", lang === "ru" ? "Локация" : "Location", t(P.location), ""]);
    $("#contactCards").innerHTML = cards.map(([ic, label, val, href]) => {
      const inner = `${svg(ic)}<div><small>${esc(label)}</small><span>${esc(val)}</span></div>`;
      return href
        ? `<a class="ccard" href="${esc(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`
        : `<div class="ccard">${inner}</div>`;
    }).join("");

    const socialMap = [
      ["github", "GitHub"], ["linkedin", "LinkedIn"], ["telegram", "Telegram"],
      ["whatsapp", "WhatsApp"], ["behance", "Behance"], ["dribbble", "Dribbble"],
      ["instagram", "Instagram"], ["youtube", "YouTube"]
    ];
    const socialHTML = socialMap.filter(([k]) => C[k]).map(([k, label]) =>
      `<a href="${esc(C[k])}" target="_blank" rel="noopener me" data-magnetic>${esc(label)} <span aria-hidden="true">↗</span></a>`
    ).join("");
    $("#socials").innerHTML = socialHTML;
    $("#menuFoot").innerHTML = socialHTML + (C.email ? `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>` : "");

    /* — подвал — */
    $("#footName").textContent = `${name} — ${t(P.role)}`;
    $("#footRights").textContent = `© ${new Date().getFullYear()} ${name}. ${ui("rights")}`;
    $("#footLoc").textContent = t(P.location);

    if (C.website) {
      const c = $('link[rel="canonical"]'); if (c) c.href = C.website;
      setMeta("og:title", document.title, false, true);
      setMeta("og:description", t(P.tagline), false, true);
    }
    injectJsonLd();
  }

  const handle = url => url.replace(/^https?:\/\/(t\.me|wa\.me)\//, "@").replace(/\/$/, "");

  function setMeta(name, content, isName = false, isProp = false) {
    const sel = isProp ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.head.querySelector(sel);
    if (!el) { el = document.createElement("meta"); el.setAttribute(isProp ? "property" : "name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }

  function splitWords(str) {
    return str.split(/\s+/).map((w, i) => {
      const em = /^\*.+\*$/.test(w);
      const clean = esc(w.replace(/\*/g, ""));
      const inner = em ? `<em>${clean}</em>` : clean;
      const delay = reduced ? 0 : 0.25 + i * 0.07;
      return `<span class="word"><span style="animation-delay:${delay}s">${inner}</span></span>`;
    }).join(" ");
  }

  /* — микроразметка для поисковиков (чтобы вас находили) — */
  function injectJsonLd() {
    const P = D.person, C = D.contacts;
    const sameAs = ["github", "linkedin", "telegram", "behance", "dribbble", "instagram", "youtube"]
      .map(k => C[k]).filter(Boolean);
    const data = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: t(P.name),
      jobTitle: t(P.role),
      description: t(P.tagline),
      email: C.email ? `mailto:${C.email}` : undefined,
      telephone: C.phone || undefined,
      url: C.website || undefined,
      image: P.avatar || undefined,
      address: { "@type": "PostalAddress", addressLocality: t(P.location) },
      knowsAbout: D.stack,
      sameAs: sameAs.length ? sameAs : undefined,
      makesOffer: D.services.map(s => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t(s.title), description: t(s.text) }
      }))
    };
    let el = document.getElementById("jsonld");
    if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = "jsonld"; document.head.appendChild(el); }
    el.textContent = JSON.stringify(data);
  }

  /* ============================================================
     ПОВЕДЕНИЕ
     ============================================================ */

  /* — появление блоков — */
  let io;
  function initReveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* — счётчики — */
  function initCounters() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.count || 0, suffix = el.dataset.suffix || "";
        const dur = reduced ? 0 : 1300;
        const t0 = performance.now();
        const tick = now => {
          const p = dur ? Math.min((now - t0) / dur, 1) : 1;
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach(el => obs.observe(el));
  }

  /* — шапка, прогресс, активная ссылка — */
  function initScroll() {
    const nav = $("#nav"), bar = $("#progress");
    let last = 0, ticking = false;
    const sections = ["work", "services", "about", "process", "contact"]
      .map(id => document.getElementById(id)).filter(Boolean);

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      nav.classList.toggle("scrolled", y > 30);
      nav.classList.toggle("hide", y > last && y > 400 && !$("#menu").classList.contains("open"));
      last = y;

      let current = "";
      sections.forEach(s => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id; });
      $$(".nav__links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  /* — мобильное меню — */
  function initMenu() {
    const burger = $("#burger"), menu = $("#menu");
    const toggle = force => {
      const open = force ?? !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("is-locked", open);
    };
    burger.addEventListener("click", () => toggle());
    $$("#menu a").forEach(a => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
  }

  /* — курсор и подсветка — */
  function initCursor() {
    if (window.matchMedia("(hover:none)").matches) return;
    const dot = $("#cursorDot"), ring = $("#cursorRing"), label = ring.querySelector("span"), spot = $("#spotlight");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, sx = mx, sy = my;

    window.addEventListener("pointermove", e => {
      mx = e.clientX; my = e.clientY;
      document.body.classList.add("has-cursor");
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      spot.style.transform = `translate(${sx}px, ${sy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    const hoverables = "a, button, .work, .card, .chip, input, textarea, .faq__q";
    document.addEventListener("pointerover", e => {
      const el = e.target.closest(hoverables);
      if (!el) return;
      document.body.classList.add("cursor-hover");
      const cur = e.target.closest("[data-cursor]");
      label.textContent = cur ? cur.dataset.cursor : "";
    });
    document.addEventListener("pointerout", e => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.(hoverables)) {
        document.body.classList.remove("cursor-hover");
      }
    });
  }

  /* — 3D-наклон и градиент под курсором — */
  function initTilt() {
    if (reduced || window.matchMedia("(hover:none)").matches) return;
    $$("[data-tilt]").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        el.style.transform =
          `perspective(1100px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-6px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* — фильтр работ — */
  function initFilters() {
    $("#filters").addEventListener("click", e => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter").forEach(b => b.classList.toggle("active", b === btn));
      const key = btn.dataset.filter;
      $$(".work").forEach(w => {
        const show = key === "all" || w.dataset.cat === key;
        w.classList.toggle("hidden", !show);
        if (show) { w.classList.remove("in"); requestAnimationFrame(() => w.classList.add("in")); }
      });
    });
  }

  /* — FAQ — */
  function initFaq() {
    $("#faqList").addEventListener("click", e => {
      const q = e.target.closest(".faq__q");
      if (!q) return;
      const item = q.parentElement, panel = item.querySelector(".faq__a");
      const open = item.classList.contains("open");
      $$(".faq__item.open").forEach(o => {
        o.classList.remove("open");
        o.querySelector(".faq__a").style.height = "0px";
        o.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        panel.style.height = panel.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  }

  /* — часы — */
  function initClock() {
    const el = $("#clock");
    const tick = () => {
      try {
        el.textContent = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-GB", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          hour12: false, timeZone: D.person.timezone
        }).format(new Date());
      } catch { el.textContent = new Date().toLocaleTimeString(); }
    };
    tick(); setInterval(tick, 1000);
  }

  /* — копирование почты — */
  function initCopy() {
    $("#copyBtn").addEventListener("click", async () => {
      const email = D.contacts.email;
      try { await navigator.clipboard.writeText(email); }
      catch {
        const ta = document.createElement("textarea");
        ta.value = email; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); ta.remove();
      }
      toast(ui("copied"));
      const btn = $("#copyBtn"); btn.textContent = ui("copied");
      setTimeout(() => { btn.textContent = ui("copy"); }, 1800);
    });
  }

  /* — форма (открывает почтовый клиент; см. README про Formspree) — */
  function initForm() {
    const form = $("#form"), note = $("#formNote");
    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      $$(".field", form).forEach(f => {
        const input = f.querySelector("input, textarea");
        const bad = !input.value.trim();
        f.classList.toggle("err", bad);
        if (bad) ok = false;
      });
      if (!ok) { note.textContent = lang === "ru" ? "Заполните все поля" : "Please fill in all fields"; return; }

      const fd = new FormData(form);
      const subject = encodeURIComponent(
        (lang === "ru" ? "Заявка с сайта от " : "New project inquiry from ") + fd.get("name"));
      const body = encodeURIComponent(
        `${fd.get("name")}\n${fd.get("contact")}\n\n${fd.get("message")}`);
      note.textContent = ui("formSending");
      window.location.href = `mailto:${D.contacts.email}?subject=${subject}&body=${body}`;
      setTimeout(() => { form.reset(); note.textContent = ""; }, 2500);
    });
    $$(".field input, .field textarea").forEach(i =>
      i.addEventListener("input", () => i.parentElement.classList.remove("err")));
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* — тема — */
  function initTheme() {
    const saved = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));
    $("#themeBtn").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#07070a" : "#f6f5f3");
      window.dispatchEvent(new Event("themechange"));
    });
  }

  /* — переключатель языка — */
  function initLang() {
    $("#langBtn").addEventListener("click", () => {
      lang = lang === "ru" ? "en" : "ru";
      localStorage.setItem("lang", lang);
      document.body.style.opacity = "0";
      setTimeout(() => {
        renderAll();
        bindDynamic();
        $$(".reveal").forEach(el => el.classList.add("in"));
        document.body.style.opacity = "1";
      }, 180);
    });
    document.body.style.transition = "opacity .18s ease";
  }

  /* — плавная прокрутка по якорям — */
  function initAnchors() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* — фото на первом экране следит за курсором — */
  function initPhotoFollow() {
    const wrap = $(".hero__photo"), img = $("#heroPhoto"), head = $("#heroHead"), hero = $("#hero");
    // без слоя головы (person.photoHead) фото остаётся полностью статичным
    if (!wrap || !img || !D.person.photoHead || reduced || window.matchMedia("(hover:none)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, visible = true, raf = null;

    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop(); else if (raf) { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0.05 }).observe(hero);

    window.addEventListener("pointermove", e => {
      // -1 … 1 относительно центра экрана
      tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener("pointerleave", () => { tx = 0; ty = 0; });

    function loop() {
      if (!visible) { raf = null; return; }
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      // плечи почти неподвижны
      img.style.transform = `translate3d(${cx * 5}px, ${cy * 3}px, 0)`;
      // голова поворачивается вслед за курсором
      if (head && !head.hidden) {
        head.style.transform =
          `translate3d(${cx * 14}px, ${cy * 8}px, 0)` +
          ` rotateY(${cx * 16}deg) rotateX(${-cy * 9}deg) rotate(${cx * 3}deg)`;
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
  }

  /* — прелоадер — */
  function initPreloader() {
    const pre = $("#preloader"), bar = $("#preBar"), num = $("#preNum");
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18 + 6);
      bar.style.width = p + "%";
      num.textContent = Math.floor(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => { pre.classList.add("done"); document.body.classList.remove("is-locked"); }, 280);
      }
    }, reduced ? 20 : 110);
  }

  /* — то, что нужно переподключать после смены языка — */
  function bindDynamic() {
    initReveal();
    initCounters();
    initTilt();
    initFilters();
    initFaq();
    initCopy();
    $$("[data-magnetic]").forEach(el => {
      if (el._mag) return;
      el._mag = true;
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* — старт — */
  document.body.classList.add("is-locked");
  renderAll();
  initPreloader();
  initTheme();
  initLang();
  initScroll();
  initMenu();
  initCursor();
  initAnchors();
  initForm();
  initClock();
  initPhotoFollow();
  bindDynamic();
})();
