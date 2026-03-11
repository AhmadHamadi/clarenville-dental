/**
 * main.js
 * Application entry point.
 * Loads HTML components into page placeholders, then initialises modules.
 *
 * Requires a local HTTP server (e.g. VS Code Live Server) –
 * fetch() does not work on the file:// protocol.
 *
 * Hamilton Care Dental
 */

import { initNavigation } from './navigation.js';
import { initFAQ }        from './faq.js';

// ── Component map: placeholder-id → component file path ─────
const COMPONENTS = {
  'c-navbar'   : 'components/navbar.html',
  'c-hero'     : 'components/hero.html',
  'c-services' : 'components/services.html',
  'c-reviews'  : 'components/reviews.html',
  'c-faq'      : 'components/faq.html',
  'c-footer'   : 'components/footer.html',
};

// ── Load a single component into its placeholder ─────────────
async function loadComponent(placeholderId, filePath) {
  const el = document.getElementById(placeholderId);
  if (!el) return;

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${filePath}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.warn(`[main.js] Could not load component "${filePath}":`, err.message);
    el.hidden = true;
  }
}

// ── Appointment CTA quick-form ────────────────────────────────
function initApptForm() {
  const form = document.getElementById('appt-cta-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'pages/contact.html#book-form';
  });
}

// ── Scroll-reveal using IntersectionObserver ──────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// ── Initialise page ───────────────────────────────────────────
async function init() {
  // Load all components in parallel
  await Promise.all(
    Object.entries(COMPONENTS).map(([id, path]) => loadComponent(id, path))
  );

  // Boot modules after DOM is populated
  initNavigation();
  initFAQ();
  initApptForm();
  initScrollReveal();
}

document.addEventListener('DOMContentLoaded', init);
