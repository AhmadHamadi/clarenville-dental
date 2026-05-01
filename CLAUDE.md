# CLAUDE.md — Clarenville Dental Care Website

> **This is the single comprehensive guide for any AI assistant (Claude, Codex, etc.) working in this codebase.**
> Read this file completely before making any changes.

---

## Project Identity

| Field | Value |
|---|---|
| Brand | Clarenville Dental Care |
| Address | 259 Memorial Drive, Suite 201, Clarenville, NL A5A 1R4 |
| Phone | (709) 466-7001 |
| Email | clarenville.dental@gmail.com |
| Hours | Mon, Tue, Thu, Fri 8am-5pm; Wed 8am-8pm; Sat-Sun closed |
| Rating | 4.9 stars / 90+ reviews |
| CDCP | Accepted |
| New Patients | Yes |
| Same-Day | Yes |
| Areas Served | Clarenville, Shoal Harbour, Milton, Georges Brook, Deep Bight, Port Blandford, Swift Current, Arnold's Cove, Sunnyside |
| Domain | clarenvilledental.com |

---

## Tech Stack

- **HTML5** — semantic, no frameworks
- **CSS3** — custom properties (variables), BEM naming, no preprocessor
- **JavaScript** — vanilla ES modules (`import`/`export`), no libraries
- **Fonts** — Google Fonts: `DM Sans` (body/UI), `DM Serif Display` (headings)
- **Images** — WebP/JPG, lazy-loaded (`loading="lazy"`)
- **Schema** — JSON-LD (Dentist, Service, LocalBusiness)
- **Build** — none required; static files served directly

---

## Directory Structure

```
NovaScotia/                          ← repo root
├── dental-site/                     ← CANONICAL implementation (work here)
│   ├── index.html                   ← homepage shell (loads components via JS)
│   ├── assets/
│   │   ├── images/                  ← logo.webp, backgrounds, doctor photos
│   │   └── icons/
│   ├── css/
│   │   ├── styles.css               ← design tokens, reset, layout primitives
│   │   ├── components.css           ← all UI component styles (LARGE file)
│   │   └── utilities.css            ← atomic helper classes
│   ├── js/
│   │   ├── main.js                  ← homepage component loader + init
│   │   ├── navigation.js            ← nav behavior, dropdowns, mobile menu
│   │   ├── faq.js                   ← accordion behavior + FAQ rendering
│   │   ├── faq-content.js           ← FAQ Q&A data for all pages
│   │   └── service-page-enhancements.js  ← images, galleries, related links
│   ├── components/                  ← homepage-only HTML fragments
│   │   ├── navbar.html
│   │   ├── hero.html
│   │   ├── services.html
│   │   ├── reviews.html
│   │   └── footer.html
│   ├── pages/                       ← standalone inner pages (~38 files)
│   ├── robots.txt
│   └── sitemap.xml
├── docs/clarenville/                ← SEO strategy & planning docs
├── AI.md                            ← points here
├── AGENTS.md                        ← points here
└── HOW-TO-MAKE-CHANGES.md          ← points here
```

---

## Two Rendering Paths (CRITICAL TO UNDERSTAND)

### Path 1: Homepage (`index.html`)

The homepage is a **shell** with placeholder `<div>` elements. `js/main.js` uses `fetch()` to load HTML fragments from `components/` and inject them at runtime.

```
index.html (shell)
  └── js/main.js fetches and injects:
        ├── components/navbar.html   → <div id="c-navbar">
        ├── components/hero.html     → <div id="c-hero">
        ├── components/services.html → <div id="c-services">
        ├── components/reviews.html  → <div id="c-reviews">
        └── components/footer.html   → <div id="c-footer">
```

**After loading**, `main.js` calls init functions:
1. `initNavigation()` — enhances navbar, builds service dropdown, mobile menu
2. `initFAQ()` — renders FAQ accordion if content exists
3. `initApptForm()` — appointment CTA form redirect
4. `initScrollReveal()` — IntersectionObserver for `.reveal` elements

> **IMPORTANT**: Homepage requires an HTTP server. `fetch()` fails on `file://`.

### Path 2: Inner Pages (`pages/*.html`)

Each inner page is a **complete standalone HTML document** with its own navbar, footer, and content. They do NOT load components from `components/`.

Inner pages import JS modules directly in a `<script type="module">` block:
```html
<script type="module">
  import { initNavigation } from '../js/navigation.js';
  import { initFAQ } from '../js/faq.js';
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFAQ();
  });
</script>
```

> **KEY IMPLICATION**: Changing `components/navbar.html` does NOT update inner pages.
> Inner pages have their navbar HTML embedded directly. Shared behavior (dropdowns,
> mobile menu) is applied at runtime by `navigation.js`.

---

## Current Approved Baseline (DO NOT DRIFT)

These rules reflect the currently approved site state and should be preserved unless the user explicitly asks to change them.

### Homepage

- Keep the homepage on the **original component-based version**.
- `components/navbar.html` should remain the original homepage navbar with the classic services dropdown.
- `components/services.html` should remain the original homepage services card grid.
- Do **not** replace the homepage with expanded category panels, injected category summaries, or a redesigned homepage services module unless the user explicitly requests that change again.

### Service Pages

- Service pages should use their **native page content only**.
- Do **not** inject extra generic sections like:
  - `What This Page Covers`
  - `Why This Matters`
  - `Questions patients often ask before booking`
  - `Related pages that support ... questions`
- `js/service-page-enhancements.js` should **not** add large post-load marketing or filler sections to service pages.
- If a service page needs improvement, edit the actual page content in `pages/*.html` instead of layering generic JS-generated blocks on top.

### Blog, FAQ, and New Patients

- The blog page should show the **real dental blog/article list as the first main content section after the hero**.
- Do **not** inject editorial strategy, support content, generic FAQ clusters, or extra pathway sections above or between the actual blog listings.
- FAQ and New Patients should stay focused on their real page purpose and should not get extra generic injected sections.

### Duplicate Intent Control

- Keep **one canonical page per intent**.
- If a duplicate-like page exists, prefer redirecting or folding it into the canonical page instead of maintaining two competing versions.
- Example: `new-patients.html` is the canonical first-visit page and should stay primary over overlapping variants.

---

## CSS Architecture

### `styles.css` — Design Tokens & Layout

Contains all CSS custom properties (variables). Use these tokens, never hardcode values.

**Colors:**
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#0f766e` | Primary teal (buttons, links, accents) |
| `--color-primary-dark` | `#0d6360` | Hover state for primary |
| `--color-primary-light` | `#f0fdfa` | Light teal backgrounds |
| `--color-text` | `#111827` | Main body text |
| `--color-text-secondary` | `#374151` | Secondary text |
| `--color-text-muted` | `#6b7280` | Muted/helper text |
| `--color-bg` | `#ffffff` | White background |
| `--color-bg-subtle` | `#f9fafb` | Subtle alt background |
| `--color-bg-muted` | `#f3f4f6` | Muted background |
| `--color-bg-teal-wash` | `#ecfdf5` | Teal wash background |
| `--color-border` | `#e5e7eb` | Default borders |
| `--color-dark` | `#111827` | Dark surfaces (footer) |
| `--color-amber` | `#f59e0b` | Stars/ratings accent |

**Typography:**
| Token | Value |
|---|---|
| `--font-sans` | `'DM Sans', system-ui, sans-serif` |
| `--font-display` | `'DM Serif Display', Georgia, serif` |
| `--text-xs` to `--text-5xl` | `0.75rem` to `3rem` |
| `--weight-normal` to `--weight-bold` | `400` to `700` |

**Spacing:** `--space-1` (0.25rem) through `--space-24` (6rem)

**Other:** `--radius-sm/md/lg/xl/full`, `--shadow-sm/md/lg`, `--transition-fast/normal`

**Layout Primitives:**
- `.container` — max-width: 75rem, centered, 1.5rem padding
- `.section` — 5rem vertical padding
- `.section--alt`, `.section--slate`, `.section--teal-wash`, `.section--dark`, `.section--primary` — background variants

### `components.css` — UI Components (LARGE FILE)

All visual component styles. Main classes:

| Component | Key Classes |
|---|---|
| **Navbar** | `.topbar`, `.navbar`, `.navbar__inner`, `.navbar__logo`, `.navbar__nav`, `.navbar__link`, `.navbar__toggle` |
| **Mobile Menu** | `.mobile-menu`, `.mobile-menu__nav`, `.mobile-menu__link`, `.mobile-submenu` |
| **Service Dropdown** | `.nav-dropdown`, `.nav-dropdown__list`, `.nav-dropdown__link` |
| **Hero** | `.hero`, `.hero__content`, `.hero__title`, `.hero__sub`, `.hero__actions` |
| **Page Hero** | `.page-hero`, `.page-hero__grid`, `.page-hero__content`, `.page-hero__lede`, `.page-hero__actions` |
| **Buttons** | `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost-white`, `.btn--lg`, `.btn--phone` |
| **Service Cards** | `.service-card-v2`, `.service-card-v2__image`, `.service-card-v2__body`, `.service-card-v2__title` |
| **Review Cards** | `.review-card`, `.review-card__stars`, `.review-card__quote`, `.review-card__author` |
| **Page Sections** | `.page-family-story`, `.page-family-story__body`, `.page-family-story__media` |
| **Trust Bar** | `.trust-bar`, `.trust-bar__items`, `.trust-bar__item` |
| **Accordion/FAQ** | `.accordion`, `.accordion__item`, `.accordion__btn`, `.accordion__content`, `.accordion__icon` |
| **Forms** | `.request-appt`, `.request-appt__grid`, `.request-appt__field` |
| **Footer** | `.footer`, `.footer__grid`, `.footer__brand`, `.footer__links` |
| **Mobile CTA** | `.mobile-cta`, `.mobile-cta__btn` |
| **Animations** | `.reveal`, `.reveal-delay-1`, `.reveal-delay-2`, `.is-visible` |
| **Checklist** | `.check-list` (green checkmark list items) |

> **RULE**: Prefer editing existing classes. Do not add scattered one-off rules.
> This file is large — search before adding new styles.

### `utilities.css` — Atomic Helpers

Small helper classes for layout and spacing:
- **Display**: `.d-none`, `.d-block`, `.d-flex`, `.d-grid`
- **Flex**: `.flex-col`, `.items-center`, `.justify-between`, `.flex-1`
- **Text**: `.text-center`, `.text-xs` to `.text-3xl`, `.text-primary`, `.text-muted`
- **Spacing**: `.mt-1` to `.mt-12`, `.mb-1` to `.mb-12`, `.mx-auto`
- **Width**: `.w-full`, `.max-w-xl`, `.max-w-2xl`, `.max-w-3xl`
- **Responsive**: `.hide-md` (hidden below 768px), `.show-md` (shown only below 768px)

---

## JavaScript Architecture

### `main.js` — Homepage Entry Point

Only runs on the homepage. Loads components and initializes all modules.

```javascript
const COMPONENTS = {
  'c-navbar'   : 'components/navbar.html',
  'c-hero'     : 'components/hero.html',
  'c-services' : 'components/services.html',
  'c-reviews'  : 'components/reviews.html',
  'c-footer'   : 'components/footer.html',
};
// Loads all in parallel via fetch(), then calls:
// initNavigation(), initFAQ(), initApptForm(), initScrollReveal()
```

### `navigation.js` — Shared Nav Behavior

Runs on ALL pages (homepage + inner). Exports `initNavigation()`.

**SERVICE_LINKS array** — the single source of truth for the services dropdown menu:
```javascript
const SERVICE_LINKS = [
  { href: "services.html",              label: "All Services" },
  { href: "emergency-dentist.html",     label: "Emergency Dentist" },
  { href: "family-dentistry.html",      label: "Family Dentistry" },
  { href: "dental-cleanings.html",      label: "Dental Cleanings" },
  { href: "preventive-dentistry.html",  label: "Preventive Dentistry" },
  { href: "tooth-colored-fillings.html",label: "Tooth-Colored Fillings" },
  { href: "dental-crowns-and-bridges.html", label: "Crowns and Bridges" },
  { href: "invisalign.html",            label: "Invisalign" },
  { href: "dental-implants.html",       label: "Dental Implants" },
  { href: "dentures.html",              label: "Dentures" },
  { href: "root-canal-treatment.html",  label: "Root Canal Treatment" },
  { href: "wisdom-teeth-removal.html",  label: "Wisdom Teeth Removal" },
  { href: "cosmetic-dentistry.html",    label: "Cosmetic Dentistry" },
  { href: "teeth-whitening.html",       label: "Teeth Whitening" },
  { href: "dental-insurance-clarenville.html", label: "Insurance and CDCP" },
];
```

**What `initNavigation()` does:**
1. `_ensureHomeLinks()` — adds "Home" link if missing, adjusts href for page depth
2. `_enhanceServiceDropdown()` — builds desktop `.nav-dropdown` + mobile `.mobile-submenu` from SERVICE_LINKS
3. `_ensurePhoneCtas()` — normalizes phone button styling
4. `_initMobileMenu()` — hamburger toggle + close-on-click
5. `_initSmoothScroll()` — smooth scroll with navbar offset

> **To add a new service to the dropdown**: Add an entry to `SERVICE_LINKS` in `navigation.js`.
> Both desktop and mobile dropdowns update automatically.

### `faq.js` — Accordion Behavior

Runs on ALL pages. Exports `initFAQ()`.

**What it does:**
1. Gets page filename from URL (e.g., `emergency-dentist.html`)
2. Looks up `FAQ_CONTENT[filename]` from `faq-content.js`
3. If found, renders an FAQ accordion section on the page
4. If not found, generates a fallback FAQ from the page's `<h1>` and lede text
5. Binds click/keyboard handlers for accordion open/close

> **To add FAQ content for a page**: Add an entry in `faq-content.js` (see format below).

### `faq-content.js` — FAQ Data Store

Exports `FAQ_CONTENT` object. Each key is a page filename:

```javascript
export const FAQ_CONTENT = {
  "emergency-dentist.html": {
    sectionTitle: "Emergency dental FAQ",
    sectionSubtitle: "Common questions about urgent dental care in Clarenville.",
    items: [
      {
        question: "What counts as a dental emergency?",
        answer: "Severe pain, swelling, broken teeth, knocked-out teeth..."
      },
      // ... more Q&A pairs
    ]
  },
  // ... more pages
};
```

Also exports `PAGE_CONFIG` (used by `service-page-enhancements.js` — see below).

### `service-page-enhancements.js` — Rich Content Injection

Runs on inner pages that import it. Exports `initServicePageEnhancements()`.

**PAGE_CONFIG format:**
```javascript
const PAGE_CONFIG = {
  "about-us.html": {
    image: {
      src: "https://images.unsplash.com/...",
      alt: "Description of image",
    },
    gallery: [
      { src: "...", alt: "..." },
      { src: "...", alt: "..." },
    ],
    links: [
      { href: "services.html", label: "Dental Services" },
      { href: "new-patients.html", label: "New Patients" },
    ],
  },
};
```

**What it does:**
- Injects a hero image from `PAGE_CONFIG[filename].image`
- Builds image galleries if placeholders exist
- Populates "Related Links" / "Next Steps" sections

---

## How to Create a New Page

### Step 1: Create the HTML File

Create `dental-site/pages/your-page.html` following this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="[60-160 char description]" />
  <title>[Page Title] | Clarenville Dental Care</title>
  <link rel="canonical" href="https://clarenvilledental.com/[slug]" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="[Same as title]" />
  <meta property="og:description" content="[Same or shorter]" />
  <meta property="og:url" content="https://clarenvilledental.com/[slug]" />
  <meta property="og:locale" content="en_CA" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/components.css" />
  <link rel="stylesheet" href="../css/utilities.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "[Service Name] Clarenville",
    "provider": {
      "@type": "Dentist",
      "name": "Clarenville Dental Care",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "259 Memorial Drive, Suite 201",
        "addressLocality": "Clarenville",
        "addressRegion": "NL",
        "postalCode": "A5A 1R4",
        "addressCountry": "CA"
      },
      "telephone": "+17094667001"
    },
    "areaServed": "Clarenville, NL"
  }
  </script>
</head>
<body>
  <!-- TOP BAR -->
  <div class="topbar" role="complementary" aria-label="Contact information">
    <div class="container">
      <div class="topbar__inner">
        <div class="topbar__left">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>259 Memorial Dr, Clarenville, NL A5A 1R4</span>
        </div>
        <div class="topbar__right">
          <a href="tel:+17094667001" class="topbar__link">(709) 466-7001</a>
          <span class="topbar__sep" aria-hidden="true">|</span>
          <a href="mailto:clarenville.dental@gmail.com" class="topbar__link topbar__link--hide-sm">clarenville.dental@gmail.com</a>
          <span class="topbar__sep topbar__link--hide-sm" aria-hidden="true">|</span>
          <span class="topbar__hours">Mon, Tue, Thu, Fri 8am-5pm | Wed 8am-8pm</span>
        </div>
      </div>
    </div>
  </div>

  <!-- NAVBAR -->
  <header class="navbar" role="banner">
    <div class="container">
      <div class="navbar__inner">
        <a href="../index.html" class="navbar__logo" aria-label="Clarenville Dental Care - Home">
          <img src="../assets/images/logo.webp" alt="" class="navbar__logo-icon" width="28" height="28" />
          Clarenville Dental Care
        </a>
        <nav class="navbar__nav" aria-label="Primary navigation">
          <a href="../index.html" class="navbar__link">Home</a>
          <a href="about-us.html" class="navbar__link">About Us</a>
          <a href="services.html" class="navbar__link">Services</a>
          <a href="faq.html" class="navbar__link">FAQ</a>
          <a href="new-patients.html" class="navbar__link">New Patients</a>
          <a href="blog.html" class="navbar__link">Blog</a>
          <a href="contact.html" class="navbar__link">Contact</a>
          <a href="appointment-request.html" class="btn btn--primary">Book Appointment</a>
        </nav>
        <button id="navbar-toggle" class="navbar__toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="mobile-menu">
      <nav class="mobile-menu__nav">
        <a href="../index.html" class="mobile-menu__link">Home</a>
        <a href="about-us.html" class="mobile-menu__link">About Us</a>
        <a href="services.html" class="mobile-menu__link">Services</a>
        <a href="faq.html" class="mobile-menu__link">FAQ</a>
        <a href="new-patients.html" class="mobile-menu__link">New Patients</a>
        <a href="blog.html" class="mobile-menu__link">Blog</a>
        <a href="contact.html" class="mobile-menu__link">Contact</a>
        <a href="appointment-request.html" class="btn btn--primary mobile-menu__cta">Book Appointment</a>
      </nav>
    </div>
  </header>

  <main>
    <!-- PAGE HERO -->
    <section class="section page-hero" aria-labelledby="page-heading">
      <div class="container">
        <div class="page-hero__grid">
          <div class="page-hero__content">
            <span class="section-label">[Label] — Clarenville, NL</span>
            <h1 id="page-heading" class="section-heading">[Main heading]</h1>
            <p class="page-hero__lede">[Lede paragraph]</p>
            <div class="page-hero__actions">
              <a href="tel:+17094667001" class="btn btn--primary">Call (709) 466-7001</a>
              <a href="appointment-request.html" class="btn btn--ghost-white">Book Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT SECTIONS (use .page-family-story for 2-column layouts) -->
    <section class="section" aria-labelledby="sec1-heading">
      <div class="container">
        <div class="page-family-story">
          <div class="page-family-story__body">
            <span class="section-label">[Section label]</span>
            <h2 id="sec1-heading" class="section-heading">[Section heading]</h2>
            <p>[Paragraph 1]</p>
            <p>[Paragraph 2]</p>
            <ul class="check-list">
              <li>[Item 1]</li>
              <li>[Item 2]</li>
            </ul>
          </div>
          <!-- Optional image column -->
          <div class="page-family-story__media">
            <img src="..." alt="..." loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ section auto-rendered by faq.js if FAQ_CONTENT entry exists -->
  </main>

  <!-- FOOTER (copy from an existing page) -->
  <!-- ... footer HTML ... -->

  <!-- MOBILE CTA BAR -->
  <div class="mobile-cta">
    <a href="tel:+17094667001" class="mobile-cta__btn mobile-cta__btn--phone">Call Clinic</a>
    <a href="appointment-request.html" class="mobile-cta__btn mobile-cta__btn--book">Book Now</a>
  </div>

  <!-- SCRIPTS -->
  <script type="module">
    import { initNavigation } from '../js/navigation.js';
    import { initFAQ } from '../js/faq.js';
    document.addEventListener('DOMContentLoaded', () => {
      initNavigation();
      initFAQ();
    });
  </script>
</body>
</html>
```

### Step 2: Update Supporting Files

After creating the page, update these files as needed:

| File | When to Update |
|---|---|
| `js/navigation.js` → `SERVICE_LINKS` | If it's a new service page that should appear in the dropdown |
| `js/faq-content.js` → `FAQ_CONTENT` | To add page-specific FAQ questions |
| `js/service-page-enhancements.js` → `PAGE_CONFIG` | To add hero images, galleries, or related links |
| `components/footer.html` | If the page should appear in footer link lists |
| `components/services.html` | If it should appear on the homepage services grid |
| `sitemap.xml` | Always — add the new URL |
| Internal links on related pages | Always — cross-link from relevant pages |
| `docs/clarenville/02-intent-map.md` | For strategy tracking (optional) |

---

## Edit Map (Where to Make Changes)

| I want to change... | Edit this file |
|---|---|
| Homepage navbar/topbar HTML | `components/navbar.html` |
| Homepage hero | `components/hero.html` |
| Homepage services grid | `components/services.html` |
| Homepage reviews | `components/reviews.html` |
| Homepage footer | `components/footer.html` |
| Homepage-only inline sections | `index.html` |
| Inner page content | `pages/[page-name].html` |
| Services dropdown links | `js/navigation.js` → `SERVICE_LINKS` array |
| Nav behavior / mobile menu | `js/navigation.js` |
| FAQ questions for a page | `js/faq-content.js` → `FAQ_CONTENT` object |
| FAQ accordion behavior | `js/faq.js` |
| Page images / galleries | `js/service-page-enhancements.js` → `PAGE_CONFIG` |
| Design tokens (colors, fonts, spacing) | `css/styles.css` → `:root` |
| Component styling | `css/components.css` |
| Utility classes | `css/utilities.css` |
| SEO metadata for a page | That page's `<head>` section |
| Schema markup for a page | That page's `<script type="application/ld+json">` |

---

## Naming Conventions

### CSS
- **BEM-style**: `.block__element--modifier`
- Examples: `.navbar__link--active`, `.btn--primary`, `.accordion__item`
- Section variants: `.section--alt`, `.section--dark`

### Files
- Page slugs use kebab-case: `emergency-dentist.html`, `dental-crowns-and-bridges.html`
- CSS/JS files use kebab-case: `service-page-enhancements.js`
- Component files match their function: `navbar.html`, `hero.html`

### IDs
- Component placeholders: `c-navbar`, `c-hero`, `c-services`, `c-reviews`, `c-footer`
- Section headings: descriptive, e.g., `emergency-page-heading`, `sec1-heading`
- Mobile menu: `mobile-menu`, `navbar-toggle`

---

## Responsive Design

- **Mobile-first**: base styles are mobile, desktop via `@media (min-width: 768px)`
- **Breakpoint**: 768px is the primary breakpoint
- **Utility classes**: `.hide-md` (hidden below 768px), `.show-md` (shown only below 768px)
- **Mobile CTA bar**: sticky bottom bar with call + book buttons (`.mobile-cta`)
- **Mobile menu**: hamburger toggle, full-width slide-down nav

---

## Local Development

Homepage requires an HTTP server because `main.js` uses `fetch()`.

```bash
cd dental-site
python -m http.server 8080
```
Then open `http://localhost:8080`.

**Verification checklist:**
- Hard refresh browser (Ctrl+Shift+R) after changes
- Homepage changes → check via HTTP server, not `file://`
- Inner page changes → can open directly or via server
- Shared JS changes → test both homepage AND an inner page
- CSS changes → test on multiple page types

---

## Common Pitfalls

1. **Edited `components/navbar.html` but inner pages didn't change** — inner pages have their own embedded navbar HTML. Shared behavior comes from `navigation.js`.
2. **Homepage blank on `file://`** — must use HTTP server for `fetch()` to work.
3. **New service not in dropdown** — add it to `SERVICE_LINKS` in `navigation.js`.
4. **FAQ not showing on a page** — add entry to `FAQ_CONTENT` in `faq-content.js`, or check that `initFAQ()` is called in the page's script block.
5. **Browser showing old content** — hard refresh or clear cache.
6. **Edited wrong layer** — homepage sections in `components/` vs. inner page content in `pages/`.

---

## Content Rules

1. **One page = one primary intent.** No duplicate or near-duplicate commercial pages.
2. **No unverified claims.** Do not add clinician names, credentials, awards, financing details, or technology claims unless verified.
3. **Clarenville-first.** Keep local relevance. Don't apply big-city targeting logic.
4. **Conversion-focused.** Every page should have a clear path to booking (phone or appointment form).
5. **Mobile-first UX.** Mobile CTA bar must be present on every page.
6. **CDCP support.** The clinic accepts the Canadian Dental Care Plan — mention where relevant.
7. **No doorway spam.** Don't create thin pages targeting slight keyword variations.

---

## Page Types Reference

| Type | Examples | Pattern |
|---|---|---|
| Homepage | `index.html` | Shell + components, trust/entity page |
| Service Landing | `emergency-dentist.html`, `invisalign.html` | Hero + 2 content sections + checklist + FAQ |
| Hub/Routing | `services.html`, `faq.html` | Grid of cards/links, routes to deeper pages |
| Conversion | `contact.html`, `appointment-request.html` | Form + contact info, minimal content |
| Support/Content | `about-us.html`, `new-patients.html`, `blog.html` | Narrative content, feeds into service pages |
| Blog Article | `blog-tooth-pain-clarenville.html` | Article content, links to service pages |
| CDCP/Insurance | `cdcp-dentist-clarenville.html` | Coverage + treatment guidance |
| Legal | `privacy-policy.html`, `terms-of-service.html` | Legal text, no FAQ |

---

## Strategy Docs (Optional Reading)

For SEO strategy, content planning, and site architecture decisions, see:
- `docs/clarenville/00-current-state.md` — project snapshot
- `docs/clarenville/02-intent-map.md` — page intents and keyword targets
- `docs/clarenville/03-site-architecture.md` — content organization
- `docs/clarenville/04-metadata-plan.md` — SEO metadata patterns
- `docs/clarenville/05-internal-linking-plan.md` — link graph
- `docs/clarenville/06-execution-roadmap.md` — prioritized work queue
