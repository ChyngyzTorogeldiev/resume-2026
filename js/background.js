/* ============================================================
   BACKGROUND.JS — живой фон: плавающие градиентные пятна
   + созвездие частиц, реагирующее на курсор.
   Ничего настраивать не нужно, но можно: см. CONFIG ниже.
   ============================================================ */
(() => {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CONFIG = {
    blobs: 4,
    density: 13000,     // чем меньше число — тем больше частиц
    maxParticles: 110,
    linkDist: 130,
    mouseRadius: 190,
    speed: 0.22
  };

  let W = 0, H = 0, dpr = 1, particles = [], blobs = [], raf = null, t = 0;
  const mouse = { x: -9999, y: -9999 };

  const themeColors = () => {
    const cs = getComputedStyle(document.documentElement);
    return {
      a1: cs.getPropertyValue("--a1").trim() || "#7c5cff",
      a2: cs.getPropertyValue("--a2").trim() || "#18e0c8",
      a3: cs.getPropertyValue("--a3").trim() || "#ff6a3d",
      light: document.documentElement.getAttribute("data-theme") === "light"
    };
  };
  let colors = themeColors();

  const rand = (a, b) => a + Math.random() * (b - a);

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth = window.innerWidth;
    H = canvas.clientHeight = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    const count = Math.min(CONFIG.maxParticles, Math.floor((W * H) / CONFIG.density));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: rand(-CONFIG.speed, CONFIG.speed),
      vy: rand(-CONFIG.speed, CONFIG.speed),
      r: rand(0.7, 1.9)
    }));

    const palette = [colors.a1, colors.a2, colors.a3, colors.a1];
    blobs = Array.from({ length: CONFIG.blobs }, (_, i) => ({
      x: rand(0.1, 0.9) * W,
      y: rand(0.1, 0.9) * H,
      r: rand(0.28, 0.52) * Math.max(W, H),
      c: palette[i % palette.length],
      ax: rand(0.00016, 0.00042) * (Math.random() < 0.5 ? -1 : 1),
      ay: rand(0.00016, 0.00042) * (Math.random() < 0.5 ? -1 : 1),
      ph: rand(0, Math.PI * 2)
    }));
  }

  function hexA(hex, alpha) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const num = parseInt(n, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 1;

    /* мягкие градиентные пятна */
    ctx.globalCompositeOperation = colors.light ? "source-over" : "lighter";
    const blobAlpha = colors.light ? 0.16 : 0.2;
    blobs.forEach(b => {
      const x = b.x + Math.cos(t * b.ax + b.ph) * W * 0.22;
      const y = b.y + Math.sin(t * b.ay + b.ph) * H * 0.22;
      const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
      g.addColorStop(0, hexA(b.c, blobAlpha));
      g.addColorStop(0.55, hexA(b.c, blobAlpha * 0.28));
      g.addColorStop(1, hexA(b.c, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";

    /* частицы и связи */
    const dot = colors.light ? "rgba(20,20,45,.26)" : "rgba(255,255,255,.55)";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;

      const dxm = p.x - mouse.x, dym = p.y - mouse.y;
      const dm = Math.hypot(dxm, dym);
      let px = p.x, py = p.y;
      if (dm < CONFIG.mouseRadius) {
        const f = (1 - dm / CONFIG.mouseRadius) * 22;
        px += (dxm / dm) * f; py += (dym / dm) * f;
      }

      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dot;
      ctx.fill();
      p._px = px; p._py = py;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < CONFIG.linkDist) {
          const a = (1 - d / CONFIG.linkDist) * (colors.light ? 0.085 : 0.13);
          ctx.strokeStyle = dm < CONFIG.mouseRadius ? hexA(colors.a2, a * 2.2) : hexA(colors.a1, a * 2);
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(q._px ?? q.x, q._py ?? q.y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function start() { if (!raf) raf = requestAnimationFrame(draw); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  window.addEventListener("resize", () => { clearTimeout(window.__bgT); window.__bgT = setTimeout(resize, 160); });
  window.addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  window.addEventListener("themechange", () => { colors = themeColors(); build(); });

  resize();
  if (reduced) { draw(); stop(); } else { start(); }
})();
