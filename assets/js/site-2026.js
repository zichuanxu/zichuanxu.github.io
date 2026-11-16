/* zichuanxu.me — reveals, the stippled plates, and the homepage opening.
   Loaded at the end of <body> on every page (see _includes/site-2026/scripts.html).
   The homepage loads GSAP before this file; everything here also works without it. */
(() => {
  const root = document.documentElement;
  window.__site = true; // theme-init.html drops .has-js if this never arrives
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || !root.classList.contains('has-js');

  /* ------------------------------------------------------------------
     Plates. Each one is a few thousand ink dots placed on a surface and
     shaded the way a stipple engraver would: denser where the light falls
     away. The dots belong to the surface, so they turn with it.
     ------------------------------------------------------------------ */
  const rng = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const hash = (x, y, z) => { const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return h - Math.floor(h); };
  const sm = (t) => t * t * (3 - 2 * t), mix = (a, b, t) => a + (b - a) * t;
  const noise = (x, y, z) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), u = sm(x - xi), v = sm(y - yi), w = sm(z - zi);
    return mix(mix(mix(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), mix(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
               mix(mix(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), mix(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v), w);
  };
  const fbm = (x, y, z, o) => { let a = .5, f = 1, s = 0, n = 0; for (let i = 0; i < o; i++) { s += a * noise(x * f, y * f, z * f); n += a; a *= .5; f *= 2.03; } return s / n; };
  const step = (a, b, x) => sm(Math.min(1, Math.max(0, (x - a) / (b - a))));
  const unit = (v) => { const n = Math.hypot(...v); return v.map((c) => c / n); };
  let pal = null;
  const colours = () => pal || (pal = (() => { const c = getComputedStyle(root); return { ink: c.getPropertyValue('--ink').trim(), paper: c.getPropertyValue('--paper').trim() }; })());
  const fit = (cv) => { const d = Math.min(2, devicePixelRatio || 1), w = Math.round(cv.clientWidth * d), h = Math.round(cv.clientHeight * d); if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; } return d; };
  const L = unit([-.5, -.58, .64]), side = unit([.6, -.22, -.77]);

  /* A moon: points on a unit sphere, 8 floats each: x y z  nx ny nz  u(threshold) tex(darkness of the
     surface itself). The normals are bent by a height field, so craters and ridges catch the light.
     Built a slice at a time so the page stays responsive; done() fires when it is complete. */
  const sphere = (N, done) => {
    const r = rng(7), P = new Float32Array(N * 8), craters = [], e = .006, B = 1.9;
    for (let i = 0; i < 22; i++) { const y = r() * 2 - 1, t = r() * 6.2832, q = Math.sqrt(1 - y * y); craters.push([Math.cos(t) * q, y, Math.sin(t) * q, .05 + r() * r() * .3]); }
    const height = (x, y, z) => {
      let h = fbm(x * 2.3 + 3, y * 2.3, z * 2.3, 5) * .34;
      for (const c of craters) { const k = Math.acos(Math.max(-1, Math.min(1, x * c[0] + y * c[1] + z * c[2]))) / c[3]; if (k < 1.5) h += c[3] * (k < 1 ? -.42 * (1 - k * k) : 0) + c[3] * .2 * Math.exp(-(((k - 1) / .16) ** 2)); }
      return h;
    };
    let i = 0;
    const slice = () => {
      const t0 = performance.now();
      for (; i < N && (still || performance.now() - t0 < 7); i++) {
        let y = 1 - 2 * (i + .5) / N, q = Math.sqrt(1 - y * y), t = i * 2.399963, x = Math.cos(t) * q, z = Math.sin(t) * q;
        x += (r() - .5) * .02; y += (r() - .5) * .02; z += (r() - .5) * .02; const n = Math.hypot(x, y, z); x /= n; y /= n; z /= n;
        const gx = (height(x + e, y, z) - height(x - e, y, z)) / (2 * e), gy = (height(x, y + e, z) - height(x, y - e, z)) / (2 * e), gz = (height(x, y, z + e) - height(x, y, z - e)) / (2 * e);
        const gn = gx * x + gy * y + gz * z, nx = x - B * (gx - gn * x), ny = y - B * (gy - gn * y), nz = z - B * (gz - gn * z), m = Math.hypot(nx, ny, nz);
        P.set([x, y, z, nx / m, ny / m, nz / m, r(), step(.47, .64, fbm(x * 1.5 + 9, y * 1.5, z * 1.5, 3)) * .26 + (r() - .5) * .08], i * 8);
      }
      if (i < N) setTimeout(slice, 0); else done(P);
    };
    slice();
  };

  /* m: 3x3 rotation, row-major. o.amount 0..1 inks the plate in; o.invert inks the lit part instead. */
  const stipple = (cv, P, m, scale, o) => {
    const d = fit(cv), W = cv.width, H = cv.height, ctx = cv.getContext('2d'), c = colours(), S = Math.min(W, H) * scale, cx = W / 2, cy = H / 2;
    const Lt = o.light || L, amt = o.amount == null ? 1 : o.amount, n = P.length / 8, rad = o.dot * d;
    ctx.clearRect(0, 0, W, H);
    if (!o.invert) { ctx.fillStyle = c.paper; ctx.beginPath(); ctx.arc(cx, cy, S, 0, 6.2832); ctx.fill(); } // hides what passes behind the globe
    ctx.fillStyle = c.ink; ctx.beginPath();
    for (let i = 0, j = 0; i < n; i++, j += 8) {
      const z = m[6] * P[j] + m[7] * P[j + 1] + m[8] * P[j + 2]; if (z <= 0) continue;
      const x = m[0] * P[j] + m[1] * P[j + 1] + m[2] * P[j + 2], y = m[3] * P[j] + m[4] * P[j + 1] + m[5] * P[j + 2];
      const lamB = (m[0] * P[j + 3] + m[1] * P[j + 4] + m[2] * P[j + 5]) * Lt[0] + (m[3] * P[j + 3] + m[4] * P[j + 4] + m[5] * P[j + 5]) * Lt[1] + (m[6] * P[j + 3] + m[7] * P[j + 4] + m[8] * P[j + 5]) * Lt[2];
      const lam = Math.max(0, o.relief < 1 ? mix(x * Lt[0] + y * Lt[1] + z * Lt[2], lamB, o.relief) : lamB);
      let dk = o.invert ? Math.pow(lam, .6) * 1.2 - P[j + 7] * .35 + .03 : (1 - Math.pow(lam, o.gamma)) * .9 + P[j + 7] * (.35 + .65 * lam) + Math.pow(1 - z, 4) * .3;
      dk = Math.pow(Math.min(o.max, Math.max(0, dk)), o.curve) * .94;
      if (P[j + 6] > dk * amt) continue;
      const q = rad * (.72 + .5 * P[j + 6] / (dk + .001)), px = cx + x * S, py = cy + y * S;
      ctx.moveTo(px + q, py); ctx.arc(px, py, q, 0, 6.2832);
    }
    ctx.fill();
  };
  const rot = (ax, ay, az) => { /* Rz(az) * Rx(ax) * Ry(ay) */
    const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay), cz = Math.cos(az), sz = Math.sin(az);
    const a = [cy, 0, sy, sx * sy, cx, -sx * cy, -cx * sy, sx, cx * cy];
    return [cz * a[0] - sz * a[3], cz * a[1] - sz * a[4], cz * a[2] - sz * a[5], sz * a[0] + cz * a[3], sz * a[1] + cz * a[4], sz * a[2] + cz * a[5], a[6], a[7], a[8]];
  };
  /* contour lines of a slowly shifting field */
  const contours = (cv, t) => {
    const d = fit(cv), W = cv.width, H = cv.height, ctx = cv.getContext('2d'), c = colours(), g = 7 * d, nx = Math.ceil(W / g), ny = Math.ceil(H / g), F = new Float32Array((nx + 1) * (ny + 1));
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) F[j * (nx + 1) + i] = fbm(i * 7 * .0105 + 2, j * 7 * .017, t, 3) + .1 * Math.sin(i * 7 * .006 + t);
    ctx.clearRect(0, 0, W, H); ctx.strokeStyle = c.ink; ctx.lineCap = 'round';
    for (let l = 0; l < 17; l++) {
      const lv = .3 + l * .028; ctx.beginPath();
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const k = j * (nx + 1) + i, a = F[k], b = F[k + 1], e = F[k + nx + 2], f = F[k + nx + 1], p = [];
        if ((a < lv) !== (b < lv)) p.push((i + (lv - a) / (b - a)) * g, j * g);
        if ((b < lv) !== (e < lv)) p.push((i + 1) * g, (j + (lv - b) / (e - b)) * g);
        if ((f < lv) !== (e < lv)) p.push((i + (lv - f) / (e - f)) * g, (j + 1) * g);
        if ((a < lv) !== (f < lv)) p.push(i * g, (j + (lv - a) / (f - a)) * g);
        for (let q = 0; q + 3 < p.length; q += 4) { ctx.moveTo(p[q], p[q + 1]); ctx.lineTo(p[q + 2], p[q + 3]); }
      }
      ctx.globalAlpha = l % 4 === 0 ? .7 : .3; ctx.lineWidth = (l % 4 === 0 ? .9 : .7) * d; ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  /* live: what the hero moon reacts to. dev 0..1 inks it in; L follows the pointer; spin follows the scroll. */
  const live = { dev: 1, spin: 0, L: L.slice(), to: L.slice() };
  let moon = null;
  const draw = {
    globe: (cv, t) => moon && stipple(cv, moon, rot(.32, t * .05 + 1.1 + live.spin, -.3), .25, { relief: 1, max: .92, dot: .43, gamma: .5, curve: 1.7, light: live.L, amount: live.dev }),
    crescent: (cv, t) => moon && stipple(cv, moon, rot(.2, t * .05 + 3.6, .25), .31, { invert: true, light: side, relief: .3, max: .95, dot: .5, curve: 1.2 }),
    contours: (cv, t) => contours(cv, t * .035),
  };
  const arts = [...document.querySelectorAll('canvas[data-art]')].filter((cv) => draw[cv.dataset.art]).map((cv) => ({ cv, f: draw[cv.dataset.art], on: false, last: -1e9 }));
  const paint = (a, ts) => { a.last = ts; a.f(a.cv, ts / 1000); };
  const all = () => { pal = null; arts.forEach((a) => paint(a, performance.now())); };
  if (arts.length) {
    const hero = arts.some((a) => a.cv.dataset.art === 'globe');
    if (arts.some((a) => a.cv.dataset.art !== 'contours')) sphere(hero ? (innerWidth < 700 ? 26000 : 44000) : 14000, (P) => { moon = P; all(); });
    all();
    new ResizeObserver(all).observe(document.body);
    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', all);
    document.addEventListener('themechange', () => requestAnimationFrame(all));
    if (!still) {
      const seen = new IntersectionObserver((es) => es.forEach((e) => { arts.find((a) => a.cv === e.target).on = e.isIntersecting; }));
      arts.forEach((a) => seen.observe(a.cv));
      const loop = (ts) => {
        live.spin += (scrollY * .0011 - live.spin) * .07;
        for (let i = 0; i < 3; i++) live.L[i] += (live.to[i] - live.L[i]) * .06;
        const n = Math.hypot(...live.L); for (let i = 0; i < 3; i++) live.L[i] /= n;
        for (const a of arts) if (a.on && ts - a.last > 40) paint(a, ts);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      const box = document.querySelector('.h-fig .plate-box');
      if (box && matchMedia('(hover: hover) and (pointer: fine)').matches) {
        addEventListener('pointermove', (e) => {
          const r = box.getBoundingClientRect(), cl = (v) => Math.max(-1, Math.min(1, v));
          live.to = unit([cl((e.clientX - r.left - r.width / 2) / innerWidth * 2.4) * .95, cl((e.clientY - r.top - r.height / 2) / innerHeight * 2.4) * .95, .6]);
        }, { passive: true });
        root.addEventListener('pointerleave', () => { live.to = L.slice(); });
      }
    }
  }

  /* ------------------------------------------------------------------
     Homepage opening: brackets part, the name rises letter by letter, the
     rule runs out to the closing bracket, then the plate is inked in.
     One pass, about three seconds. Without GSAP the CSS reveals do it.
     ------------------------------------------------------------------ */
  const hero = document.querySelector('.hero');
  if (hero && window.gsap && !still) {
    hero.querySelectorAll('.rv').forEach((el) => el.classList.add('in', 'gs'));
    const word = hero.querySelector('.h-name .word');
    word.innerHTML = [...word.textContent].map((c) => c === ' ' ? ' ' : `<span class="ltr">${c}</span>`).join('');
    live.dev = 0;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.h-name .br.l', { x: '1.1em', opacity: 0, duration: .8 }, 0)
      .from('.h-name .br.r', { x: '-1.1em', opacity: 0, duration: .8 }, 0)
      .from('.h-name .ltr', { yPercent: 55, opacity: 0, duration: .9, stagger: .045 }, .1)
      .from('.h-name .dashmark', { scaleX: 0, transformOrigin: '0 50%', duration: 1.4, ease: 'power2.inOut' }, .45)
      .from('.h-role p', { y: 10, opacity: 0, duration: .6, stagger: .1 }, .7)
      .from('.h-note', { y: 14, opacity: 0, duration: .8 }, .9)
      .from('.h-fig .idx', { opacity: 0, duration: .5 }, 1)
      .from('.h-fig .frame', { opacity: 0, scale: .965, duration: 1 }, 1)
      .from('.h-fig .tick', { rotation: -50, svgOrigin: '220 220', duration: 2, ease: 'power2.out' }, 1)
      .to(live, { dev: 1, duration: 2.4, ease: 'power1.inOut' }, 1.1)
      .from('.h-side > .caps, .h-side .pill', { x: 16, opacity: 0, duration: .6, stagger: .08 }, 1.2)
      .from('.h-bio', { y: 12, opacity: 0, duration: .8 }, 1.3);
  }

  /* Reveal on scroll. */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv').forEach((el) => io.observe(el));
})();
