/* ============================================================
   MARIA carousel player
   iframe-per-slide · lazy boot · only active + neighbours live.
   Self-contained, vanilla. Guards on [data-maria-carousel], so it
   is a no-op on pages without the section. Deferred load.
   ============================================================ */
(function () {
  'use strict';
  var root = document.querySelector('[data-maria-carousel]');
  if (!root) return;

  var slides;
  try { slides = JSON.parse(root.dataset.slides); } catch (e) { return; }
  if (!slides || !slides.length) return;

  var stage    = root.querySelector('[data-maria-stage]');
  var dotsWrap = root.querySelector('[data-maria-dots]');
  var counter  = root.querySelector('[data-maria-counter]');
  var label    = root.querySelector('[data-maria-label]');
  var reduce   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var frames = new Map();   // n -> iframe
  var cur = -1, booted = false;   // cur = -1 so the first show(0) is never short-circuited
  var pad = function (n) { return (n + 1 < 10 ? '0' : '') + (n + 1); };

  /* build the dot strip */
  slides.forEach(function (s, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', pad(n) + ' ' + s.title);
    b.addEventListener('click', function () { show(n); });
    dotsWrap.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function mount(n) {
    if (n < 0 || n >= slides.length || frames.has(n)) return;
    var f = document.createElement('iframe');
    f.src = slides[n].src;
    f.title = slides[n].title;
    f.className = 'maria-frame';
    f.loading = 'lazy';
    f.setAttribute('scrolling', 'no');
    f.dataset.n = n;
    stage.appendChild(f);
    frames.set(n, f);
  }

  function tl(n) {
    var f = frames.get(n);
    try { return f && f.contentWindow && f.contentWindow.__MARIA__ ? f.contentWindow.__MARIA__ : null; }
    catch (e) { return null; }
  }
  // fromStart=true restarts the slide's loop from frame 0 (used on navigation, so a
  // slide never appears mid-animation). fromStart=false resumes (used on scroll re-entry).
  function play(n, fromStart) {
    var m = tl(n); if (!m) return;
    if (reduce) { try { m.tl.pause(); m.tl.time(m.cycle * 0.5); } catch (e) {} return; }
    try { fromStart ? m.tl.play(0) : m.tl.play(); } catch (e) {}
  }
  function pause(n) { var m = tl(n); if (m) { try { m.tl.pause(); } catch (e) {} } }

  // keep a freshly-mounted neighbour from free-running in the background: pause it as
  // soon as it loads (unless it has since become the active slide).
  function parkOnLoad(n) {
    var f = frames.get(n); if (!f) return;
    if (tl(n)) { if (n !== cur) pause(n); }
    else f.addEventListener('load', function () { if (n !== cur) pause(n); }, { once: true });
  }

  function show(n) {
    n = (n % slides.length + slides.length) % slides.length;
    if (booted && n === cur) return;
    pause(cur);
    mount(n); mount(n + 1); mount(n - 1);
    Array.prototype.forEach.call(stage.querySelectorAll('.maria-frame'), function (f) {
      f.classList.toggle('is-active', +f.dataset.n === n);
    });
    cur = n;
    // park the (now non-active) neighbours, then restart the active slide from frame 0
    parkOnLoad(n + 1); parkOnLoad(n - 1);
    var f = frames.get(n);
    if (f) {
      if (tl(n)) play(n, true);
      else f.addEventListener('load', function () { if (cur === n) play(n, true); }, { once: true });
    }
    sync();
  }

  function sync() {
    counter.textContent = pad(cur) + ' / ' + slides.length;
    label.textContent = slides[cur].title;
    dots.forEach(function (d, i) {
      var on = i === cur;
      d.classList.toggle('is-on', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function next() { show(cur + 1); }
  function prev() { show(cur - 1); }

  /* controls (there are two prev/next pairs: tap-zones + nav buttons) */
  Array.prototype.forEach.call(root.querySelectorAll('[data-maria-next]'), function (b) { b.addEventListener('click', next); });
  Array.prototype.forEach.call(root.querySelectorAll('[data-maria-prev]'), function (b) { b.addEventListener('click', prev); });

  /* keyboard — only when the player has focus within (no scroll/page hijack) */
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });

  /* touch swipe — only fire when the gesture is dominantly horizontal, so a
     vertical page-scroll that grazes the card never flips the slide */
  var sx = null, sy = null;
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) { dx < 0 ? next() : prev(); }
    sx = sy = null;
  }, { passive: true });

  /* lazy boot on first in-view */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (e.isIntersecting) { boot(); o.disconnect(); }
      });
    }, { threshold: 0.2 });
    io.observe(root);
  } else { boot(); }

  function boot() {
    if (booted) return;
    booted = true;
    root.classList.add('is-booted');
    show(0);
  }

  /* pause everything when the whole section scrolls away (battery / CPU) */
  if ('IntersectionObserver' in window) {
    var vis = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!booted) return;
        if (e.isIntersecting) play(cur, false); else pause(cur);
      });
    }, { threshold: 0.01 });
    vis.observe(root);
  }
})();

/* ============================================================
   Capability-card eyebrow scramble
   On hover, the "// Chief of Staff" / "// 02 — Shared memory"
   labels do a quick character-scramble that resolves back to the
   real words. Monospace label => no layout shift. Self-contained,
   no-op when there are no .maria-cap cards. Honours reduced-motion.
   ============================================================ */
(function () {
  'use strict';
  var caps = document.querySelectorAll('.maria-cap');
  if (!caps.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#%&*';
  var TOTAL  = 40;   // frames (~660ms at 60fps) — let it breathe, then settles

  function scramble(el) {
    var finalText = el.getAttribute('data-k');
    if (finalText === null) { finalText = el.textContent; el.setAttribute('data-k', finalText); }
    var chars = finalText.split('');
    // each non-space char locks in left-to-right, with a little jitter
    var lockAt = chars.map(function (c, i) {
      if (c === ' ') return 0;
      return Math.floor((i / chars.length) * (TOTAL - 5)) + 2 + ((Math.random() * 3) | 0);
    });
    if (el._scrRAF) cancelAnimationFrame(el._scrRAF);
    var frame = 0;
    function tick() {
      var out = '';
      for (var i = 0; i < chars.length; i++) {
        var c = chars[i];
        if (c === ' ' || frame >= lockAt[i]) out += c;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame++ < TOTAL) { el._scrRAF = requestAnimationFrame(tick); }
      else { el.textContent = finalText; el._scrRAF = null; }
    }
    tick();
  }

  Array.prototype.forEach.call(caps, function (cap) {
    var k = cap.querySelector('.maria-cap__k');
    if (!k) return;
    // Trigger once per hover. Different browsers / automation emit different
    // enter events, so listen broadly and gate with an `inside` flag (mouseover
    // bubbles and fires repeatedly, but only the first run while !inside counts).
    var inside = false;
    function enter() { if (inside) return; inside = true; scramble(k); }
    function leave() { inside = false; }
    cap.addEventListener('pointerenter', enter);
    cap.addEventListener('mouseenter', enter);
    cap.addEventListener('mouseover', enter);
    cap.addEventListener('pointerleave', leave);
    cap.addEventListener('mouseleave', leave);
  });
})();
