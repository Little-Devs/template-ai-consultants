/* Brand config. Edit this object (and css/tokens.css :root) to rebrand the template. */
window.STUDIO_BRAND = {
  name: 'Studio',
  email: 'hello@example.com',
  url: 'https://example.com',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

(function () {
  'use strict';

  function token(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function markSvg(id) {
    var a = token('--color-accent', '#9855FF');
    var b = token('--color-accent-2', '#E63CFE');
    var gid = 'brandMarkGrad-' + id;
    return (
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
        '<defs><linearGradient id="' + gid + '" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">' +
          '<stop stop-color="' + a + '"/>' +
          '<stop offset="1" stop-color="' + b + '"/>' +
        '</linearGradient></defs>' +
        '<circle cx="32" cy="32" r="28" stroke="url(#' + gid + ')" stroke-width="1.15" opacity="0.35" stroke-dasharray="4 6">' +
          '<animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="18s" repeatCount="indefinite"/>' +
        '</circle>' +
        '<circle cx="32" cy="32" r="18" stroke="url(#' + gid + ')" stroke-width="2.75"/>' +
        '<circle cx="32" cy="32" r="5.5" fill="url(#' + gid + ')">' +
          '<animate attributeName="r" values="5.5;7;5.5" dur="2.4s" repeatCount="indefinite"/>' +
          '<animate attributeName="opacity" values="1;0.55;1" dur="2.4s" repeatCount="indefinite"/>' +
        '</circle>' +
      '</svg>'
    );
  }

  function apply() {
    var brand = window.STUDIO_BRAND || {};
    var name = brand.name || 'Studio';
    var email = brand.email || 'hello@example.com';

    document.querySelectorAll('[data-brand]').forEach(function (el) {
      el.textContent = name;
    });
    document.querySelectorAll('[data-brand-email]').forEach(function (el) {
      el.textContent = email;
      if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + email);
    });
    document.querySelectorAll('[data-brand-mark]').forEach(function (el, i) {
      el.innerHTML = markSvg(i);
    });

    document.querySelectorAll('#logo-home').forEach(function (el) {
      el.setAttribute('aria-label', name);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
