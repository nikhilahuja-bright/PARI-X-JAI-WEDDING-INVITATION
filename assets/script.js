/* ==========================================================
   EDIT EVERYTHING HERE
   All names, dates, venue details and links live in CONFIG.
   ========================================================== */
const CONFIG = {
  groom: { name: "Jai",  fullName: "Jai Khurana" },
  bride: { name: "Pari", fullName: "Pari Sapra", parents: "(D/o Smt. Savita & Sh. Somnath Sapra of Rohtak)" },
  couple: "Jai & Pari",
  monogram: "J & P",
  hashtag: "#JaiWedsPari",
  mantra: "|| Shri Ganeshaya Namah ||",

  intro: {
    kicker: "Wedding Invitation",
    couple: "Jai Khurana with Pari Sapra",
    from: "A Cordial Invitation from: Smt. Kiran Khurana & Sh. Sanjay Khurana"
  },

  // Dates
  dateShort: "26 . 11 . 2026",
  dateDay: "Thursday",
  dateLong: "26th November 2026",
  timeLabel: "Sehra Bandhi at 5:00 PM",
  weddingStart: "2026-11-26T17:00:00+05:30",   // countdown target + calendar start (Sehra Bandhi)
  weddingEnd:   "2026-11-27T01:00:00+05:30",   // calendar end

  invitation: {
    blessing: "With the blessings of Jai Maha Kaali & heavenly blessings from Grand Parents Late Smt. Diya Rani & Late Sh. Kharati Lal Khurana",
    hosts: "Smt. Kiran & Sh. Sanjay Khurana",
    request: "earnestly seek your benign presence and solicit your blessings on the gracious occasion of the \u201cWEDDING CEREMONY\u201d of their loving son"
  },

  residence: {
    hosts: "Smt. Kiran Khurana & Sh. Sanjay Khurana",
    address: "840/19 Patel Nagar, Near Geeta Vidhya Mandir School, Rohtak - 124001",
    phones: ["9255198806", "9350054596"]          // shown as tap-to-call links
  },

  // icon: "jagran" | "cocktail" | "sehra" | "baraat" | "dinner"
  eventsEyebrow: "21st \u2013 26th November 2026",
  eventsTitle: "Golden Moments",
  events: [
    { date: "Sat, 21st Nov 2026", title: "Maa Bhagwati Jagran", place: "At Residence", time: "9:00 PM", icon: "jagran" },
    { date: "Wed, 25th Nov 2026", title: "Cocktail Party",      place: "At Residence", time: "8:00 PM", icon: "cocktail" },
    { date: "Thu, 26th Nov 2026", title: "Sehra Bandhi",                               time: "5:00 PM", icon: "sehra" },
    { date: "Thu, 26th Nov 2026", title: "Departure of Baraat",                        time: "6:00 PM", icon: "baraat" },
    { date: "Thu, 26th Nov 2026", title: "Dinner",                                     time: "7:00 PM", icon: "dinner" }
  ],

  venue: {
    name: "Riyasatt Banquet & Lawn",
    address: "Main Masthnath Nagar Road, Near Delhi Road, Bohar, Rohtak, Haryana 124021",
    // Swap these for your exact pin later (e.g. a maps.app.goo.gl link for directionsUrl)
    mapEmbedUrl: "https://maps.google.com/maps?q=Riyasatt+Banquet+%26+Lawn,+Main+Masthnath+Nagar+Road,+Near+Delhi+Road,+Bohar,+Rohtak,+Haryana+124021&z=15&output=embed",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Riyasatt+Banquet+%26+Lawn%2C+Main+Masthnath+Nagar+Road%2C+Near+Delhi+Road%2C+Bohar%2C+Rohtak%2C+Haryana+124021"
  },

  calendar: {
    title: "Jai weds Pari \u2014 Wedding Ceremony",
    details: "Wedding ceremony of Jai Khurana with Pari Sapra. Sehra Bandhi 5:00 PM \u00b7 Departure of Baraat 6:00 PM \u00b7 Dinner 7:00 PM."
  },

  closing: {
    title: "Awaiting your gracious presence",
    text: "As two souls become one and two families unite, our joy will be complete only with you beside us \u2014 to fill the evening with your love, laughter & blessings.",
    kids: "Special Invitation From Our Family Shining Stars: Darshita, Darshika, Raghav, Madhav"
  },

  rsvp: {
    title: "RSVP",
    subtitle: "With Love & Warm Regards",
    families: ["Khurana Family", "Dhamija Family", "Suri Family"]
  },

  compliments: {
    title: "With Best Compliments From",
    names: ["All Relatives & Friends"]
  },

  credit: { text: "Magical Moments by Jai Ahuja", logo: "assets/logo.png" },
  music: "music/music.mp3"
};

/* ==========================================================
   Below this line: behaviour. No need to edit.
   ========================================================== */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

  /* ---------- content from CONFIG ---------- */
  function render() {
    $$("[data-c]").forEach(el => {
      const v = get(CONFIG, el.dataset.c);
      if (typeof v === "string") el.textContent = v;
    });

    const icons = { jagran: "#ic-diya", cocktail: "#ic-cocktail", sehra: "#ic-sehra", baraat: "#ic-barat", dinner: "#ic-dinner" };
    $("#timeline").innerHTML = CONFIG.events.map((e, i) => `
      <li class="event reveal" style="transition-delay:${i * 0.08}s">
        <span class="event-icon" aria-hidden="true"><svg><use href="${icons[e.icon] || "#ic-dinner"}"/></svg></span>
        ${e.date ? `<p class="event-note">${esc(e.date)}</p>` : ""}
        <h3 class="event-title">${esc(e.title)}</h3>
        <p class="event-time">${esc(e.time)}</p>
        ${e.place ? `<p class="event-note">${esc(e.place)}</p>` : ""}
      </li>`).join("");

    $("#families").innerHTML = CONFIG.rsvp.families
      .map((f, i) => `<li class="reveal" style="transition-delay:${i * 0.1}s">${esc(f)}</li>`).join("");
    $("#compliments").innerHTML = CONFIG.compliments.names
      .map((n, i) => `<li class="reveal" style="transition-delay:${i * 0.12}s"><span class="foil-script">${esc(n)}</span></li>`).join("");

    $("#phones").innerHTML = "M. " + CONFIG.residence.phones
      .map(n => `<a href="tel:+91${n.replace(/\D/g, "")}">${esc(n)}</a>`).join(", ");

    $("#mapFrame").src = CONFIG.venue.mapEmbedUrl;
    $("#mapFrame").title = "Map showing " + CONFIG.venue.name;
    $("#dirBtn").href = CONFIG.venue.directionsUrl;
    $("#calBtn").href = calendarUrl();

    // credit logo — hides itself if the file is missing
    const credit = $(".credit"), logo = $("#creditLogo");
    logo.alt = CONFIG.credit.text;
    logo.onload = () => credit.classList.add("has-logo");
    logo.onerror = () => logo.remove();
    logo.src = CONFIG.credit.logo;

    buildMandala();
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function calendarUrl() {
    const fmt = d => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: CONFIG.calendar.title,
      details: CONFIG.calendar.details,
      location: CONFIG.venue.name + ", " + CONFIG.venue.address,
      ctz: "Asia/Kolkata"
    });
    // "dates" is appended unencoded: Google expects a literal "/" between start and end
    return "https://calendar.google.com/calendar/render?" + p.toString() +
      "&dates=" + fmt(CONFIG.weddingStart) + "/" + fmt(CONFIG.weddingEnd);
  }

  function buildMandala() {
    const ring = (n, d, extra = "") =>
      Array.from({ length: n }, (_, i) => `<path d="${d}" transform="rotate(${(360 / n) * i})" ${extra}/>`).join("");
    const dots = (n, r, size) =>
      Array.from({ length: n }, (_, i) => {
        const a = (Math.PI * 2 * i) / n;
        return `<circle cx="${(Math.sin(a) * r).toFixed(2)}" cy="${(-Math.cos(a) * r).toFixed(2)}" r="${size}" fill="currentColor" stroke="none"/>`;
      }).join("");
    $(".mandala").innerHTML = `
      <svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" stroke-width=".45">
        <circle r="12"/><circle r="18"/>
        ${ring(12, "M0 -18C5 -26 5 -34 0 -40C-5 -34 -5 -26 0 -18Z")}
        <circle r="42"/>${dots(24, 46, .9)}
        ${ring(16, "M0 -50C9 -58 9 -68 0 -76C-9 -68 -9 -58 0 -50Z")}
        ${ring(16, "M0 -54C4 -60 4 -66 0 -71C-4 -66 -4 -60 0 -54Z")}
        <circle r="79"/><circle r="82"/>
        ${ring(32, "M0 -82Q4 -88 0 -95Q-4 -88 0 -82Z")}
        ${dots(32, 98, .8)}
      </svg>`;
  }

  /* ---------- envelope / intro ---------- */
  const audio = $("#bgm");
  const musicBtn = $("#musicBtn");
  let musicOk = true, userMuted = false;

  function startMusic() {
    if (!CONFIG.music) return;
    audio.src = CONFIG.music;
    audio.volume = 0.6;
    audio.addEventListener("error", hideMusic, { once: true });
    const p = audio.play();
    if (p && p.catch) p.then(() => { if (musicOk) musicBtn.hidden = false; }).catch(err => {
      // Missing file => hide; autoplay refusal => keep button so guest can start it
      if (err && err.name === "NotAllowedError") { setMuted(true); musicBtn.hidden = false; }
      else hideMusic();
    });
  }
  function hideMusic() { musicOk = false; musicBtn.hidden = true; }
  function setMuted(m) {
    userMuted = m;
    musicBtn.classList.toggle("muted", m);
    musicBtn.setAttribute("aria-pressed", String(m));
    musicBtn.setAttribute("aria-label", m ? "Play music" : "Mute music");
  }
  musicBtn.addEventListener("click", () => {
    if (audio.paused) { audio.play().then(() => setMuted(false)).catch(hideMusic); }
    else { audio.pause(); setMuted(true); }
  });
  document.addEventListener("visibilitychange", () => {
    if (!musicOk || !audio.src) return;
    if (document.hidden) audio.pause();
    else if (!userMuted) audio.play().catch(() => {});
  });

  function openInvite() {
    const env = $("#envelope"), intro = $("#intro");
    if (env.classList.contains("open")) return;
    env.classList.add("open");
    intro.classList.add("opening");
    env.setAttribute("aria-label", "Invitation opened");
    startMusic();                       // must run inside the tap for mobile autoplay rules
    const t = reduceMotion ? 350 : 1850;
    setTimeout(() => {
      intro.classList.add("gone");
      document.body.classList.remove("locked");
      document.body.classList.add("opened");
      window.scrollTo(0, 0);
      initScratch();                    // size the canvas now that layout is final
      setTimeout(() => { intro.remove(); }, 1100);
    }, t);
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(e => io.observe(e));
  }

  /* ---------- countdown ---------- */
  function initCountdown() {
    const target = new Date(CONFIG.weddingStart).getTime();
    const els = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
    let timer;
    const set = (el, v) => {
      const t = String(v).padStart(2, "0");
      if (el.textContent !== t) {
        el.textContent = t;
        if (!reduceMotion) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); }
      }
    };
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        $("#countdown").hidden = true;
        $("#cdDone").hidden = false;
        return;
      }
      set(els.d, Math.floor(diff / 864e5));
      set(els.h, Math.floor((diff / 36e5) % 24));
      set(els.m, Math.floor((diff / 6e4) % 60));
      set(els.s, Math.floor((diff / 1e3) % 60));
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------- scratch card ---------- */
  let scratchReady = false;
  function initScratch() {
    if (scratchReady) return;
    scratchReady = true;
    const wrap = $("#scratchWrap"), cv = $("#scratch");
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    let done = false, drawing = false, last = null, moves = 0, w = 0, h = 0, dpr = 1;

    function paint() {
      const r = cv.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      const g = ctx.createLinearGradient(0, 0, w, h);
      [["0", "#9b7a30"], [".22", "#d9b45e"], [".42", "#f6e5a8"], [".55", "#d4af5a"], [".75", "#a98634"], ["1", "#e6c97c"]]
        .forEach(([o, c]) => g.addColorStop(+o, c));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      // brushed foil texture
      for (let i = 0; i < 260; i++) {
        ctx.fillStyle = Math.random() > .5 ? "rgba(255,248,220,.35)" : "rgba(110,80,20,.18)";
        ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 2 + .5, Math.random() * 2 + .5);
      }
      ctx.strokeStyle = "rgba(255,250,230,.12)"; ctx.lineWidth = 1;
      for (let x = -h; x < w; x += 7) { ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x + h, 0); ctx.stroke(); }

      // inner frame
      ctx.strokeStyle = "rgba(90,60,12,.45)"; ctx.lineWidth = 1;
      ctx.strokeRect(9.5, 9.5, w - 19, h - 19);

      // label
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(74,14,26,.9)";
      ctx.shadowColor = "rgba(255,245,210,.7)"; ctx.shadowOffsetY = 1;
      ctx.font = `600 ${Math.round(Math.min(w / 16, 19))}px Cinzel, Georgia, serif`;
      ctx.fillText("✦ Scratch to Reveal ✦", w / 2, h / 2 - 6);
      ctx.font = `italic 500 ${Math.round(Math.min(w / 21, 15))}px "Cormorant Garamond", Georgia, serif`;
      ctx.fillStyle = "rgba(74,14,26,.7)";
      ctx.fillText("the most special date of our lives", w / 2, h / 2 + 20);
      ctx.shadowColor = "transparent"; ctx.shadowOffsetY = 0;
    }

    const pos = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    function scratch(a, b) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000"; ctx.fillStyle = "#000";   // must be opaque or erasing is only partial
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(26, w / 9);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x + .01, b.y); ctx.stroke();
      if (++moves % 6 === 0) check();
    }
    function check() {
      const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
      if (clear / total >= 0.5) reveal();
    }
    function reveal() {
      if (done) return;
      done = true; drawing = false;
      wrap.classList.add("revealed");
      $("#scratchHint").textContent = "Save the date — we can't wait to celebrate with you!";
      $("#revealBtn").remove();
      cv.setAttribute("aria-hidden", "true");
      const r = wrap.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2);
    }

    cv.addEventListener("pointerdown", e => {
      if (done) return;
      drawing = true; last = pos(e);
      try { cv.setPointerCapture(e.pointerId); } catch (_) {}
      scratch(last, last);
      e.preventDefault();
    });
    cv.addEventListener("pointermove", e => {
      if (!drawing || done) return;
      const p = pos(e); scratch(last, p); last = p;
    });
    const end = () => { if (drawing) { drawing = false; check(); } };
    cv.addEventListener("pointerup", end);
    cv.addEventListener("pointercancel", end);
    cv.addEventListener("lostpointercapture", end);
    $("#revealBtn").addEventListener("click", reveal);

    let lastW = 0;
    window.addEventListener("resize", () => {
      const nw = cv.getBoundingClientRect().width;
      if (!done && Math.abs(nw - lastW) > 2) { lastW = nw; paint(); }
    });

    const draw = () => { paint(); lastW = cv.getBoundingClientRect().width; };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('600 16px Cinzel'), document.fonts.load('italic 500 16px "Cormorant Garamond"')])
        .then(draw, draw);
    } else draw();
  }

  /* ---------- confetti burst ---------- */
  function confetti(x, y) {
    if (reduceMotion) return;
    const cv = $("#confetti"), ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ["#f6e5a8", "#e3c374", "#c9a24b", "#a98634", "#fff4d0", "#8c6a22"];
    const parts = Array.from({ length: 140 }, () => {
      const a = -Math.PI / 2 + (Math.random() - .5) * Math.PI * 1.25;
      const s = 4 + Math.random() * 9;
      return {
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        w: 5 + Math.random() * 6, h: 8 + Math.random() * 8,
        r: Math.random() * 6.28, vr: (Math.random() - .5) * .3,
        c: colors[(Math.random() * colors.length) | 0], life: 0, max: 120 + Math.random() * 70,
        round: Math.random() < .25
      };
    });
    (function frame() {
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of parts) {
        if (p.life++ > p.max) continue;
        alive++;
        p.vy += .16; p.vx *= .985; p.vy *= .985;
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, 6.28); ctx.fill(); }
        else { ctx.scale(1, Math.cos(p.life * .15)); ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
        ctx.restore();
      }
      if (alive) requestAnimationFrame(frame); else ctx.clearRect(0, 0, W, H);
    })();
  }

  /* ---------- ambient gold dust & petals ---------- */
  function initParticles() {
    if (reduceMotion) return;
    const cv = $("#particles"), ctx = cv.getContext("2d");
    let W, H, running = true;
    const N = innerWidth < 600 ? 26 : 40;
    const petalColors = ["rgba(201,162,75,", "rgba(233,207,134,", "rgba(176,52,74,"];
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(initial) {
      const petal = Math.random() < .32;
      return {
        x: Math.random() * W, y: initial ? Math.random() * H : -12,
        r: petal ? 3.5 + Math.random() * 3.5 : .7 + Math.random() * 1.6,
        vy: petal ? .35 + Math.random() * .45 : .15 + Math.random() * .4,
        sway: Math.random() * 6.28, sw: .006 + Math.random() * .014,
        rot: Math.random() * 6.28, vr: (Math.random() - .5) * .02,
        a: .3 + Math.random() * .5, petal,
        c: petalColors[(Math.random() * petalColors.length) | 0]
      };
    }
    size();
    const parts = Array.from({ length: N }, () => make(true));
    addEventListener("resize", size);
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.sway += p.sw; p.y += p.vy; p.x += Math.sin(p.sway) * .35; p.rot += p.vr;
        if (p.y > H + 12) parts[i] = make(false);
        if (p.petal) {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = p.c + p.a + ")";
          ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * .5, 0, 0, 6.28); ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = "rgba(246,229,168," + p.a * .25 + ")";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, 6.28); ctx.fill();
          ctx.fillStyle = "rgba(255,244,208," + p.a + ")";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- boot ---------- */
  render();
  initReveal();
  initCountdown();
  initParticles();
  $("#envelope").addEventListener("click", openInvite);
})();
