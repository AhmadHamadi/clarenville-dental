# Hamilton Care Dental – How to Make Changes

This is the **single reference** for understanding the project and making updates. Use it so changes stay consistent and you know where to edit.

---

## 1. What This Repo Is

| What | Where | Use it for |
|------|--------|------------|
| **Main website (component-based)** | `dental-site/` | The real site: vanilla HTML/CSS/JS, components loaded by `main.js`. **Edit this for most changes.** |
| **Standalone single-file version** | Root `index.html` | One big file with Tailwind CDN. Optional backup or simple deploy; update only if you use it. |

**Rule:** For content, design, and new pages, work in **`dental-site/`**. The root `index.html` is a separate, self-contained copy.

---

## 2. File Map (dental-site)

```
dental-site/
├── index.html              ← Homepage (loads components into placeholders)
├── css/
│   ├── styles.css          ← Variables, reset, layout, grid (colors, fonts, spacing)
│   ├── components.css      ← Navbar, hero, buttons, cards, FAQ, footer, forms
│   └── utilities.css       ← Helpers (display, margin, text, flex)
├── js/
│   ├── main.js             ← Loads components, inits nav + FAQ + appt form
│   ├── navigation.js       ← Mobile menu, smooth scroll
│   └── faq.js              ← FAQ accordion (keyboard + ARIA)
├── components/             ← HTML fragments (injected by main.js into index.html)
│   ├── navbar.html         ← Top bar + main nav + mobile menu
│   ├── hero.html           ← Hero section + stats
│   ├── services.html       ← Services grid (cards)
│   ├── reviews.html        ← Testimonials
│   ├── faq.html            ← FAQ accordion content
│   └── footer.html         ← Footer + mobile CTA bar
├── pages/                  ← Full standalone pages (own <head>, duplicate nav/footer)
│   ├── services.html       ← All services detail
│   ├── contact.html        ← Contact form + map
│   └── insurance.html      ← Insurance & CDCP
├── assets/
│   └── images/             ← Put clinic photos here (WebP, max ~1400px wide)
├── README.md               ← Quick start, structure, design tokens
├── claude.md               ← AI/dev rules (no inline styles, BEM, etc.)
└── (this guide lives in project root: HOW-TO-MAKE-CHANGES.md)
```

**How the homepage works:** `index.html` has empty divs like `<div id="c-navbar"></div>`. `main.js` runs on load, `fetch()`es each component from `components/*.html`, and injects the HTML. So to change the navbar or hero, edit the **component file**, not `index.html` (except for the sections that are written directly in `index.html` – see below).

---

## 3. Where to Edit What

### 3.1 Clinic details (address, phone, email, hours)

These appear in **many** files. Use your editor’s **search across project** and replace all at once.

| Find (example) | Replace with your real value | Files to check |
|----------------|------------------------------|----------------|
| `123 Main Street West` | Your street address | All of `dental-site/` + root `index.html` |
| `Hamilton, Ontario, L8P 1H1` | Your city and postal code | Same |
| `(289) 755-2568` | Your phone | Same |
| `+12897552568` | E.164 format of same number (for `tel:` links) | Same |
| `info@hamiltoncaredental.ca` | Your email | Same |
| `Mon – Fri: 8:00 AM – 6:00 PM` etc. | Your hours | Same |

**Concrete list of places:**

- **dental-site:** `index.html`, `components/navbar.html`, `components/hero.html`, `components/footer.html`, `components/faq.html`, `pages/contact.html`, `pages/insurance.html`, `pages/services.html`
- **Root:** `index.html`

Tip: Search for `289` and `123 Main` and `hamiltoncaredental` to catch every occurrence.

---

### 3.2 Booking / “Book Appointment” links

Today most “Book” buttons go to **contact page form** (`#book` or `pages/contact.html#book-form`). When you have a real booking URL (e.g. Jane App, Cliniko):

| Where | What to change |
|-------|----------------|
| `dental-site/components/hero.html` | `href="#book"` → your booking URL |
| `dental-site/components/footer.html` | `href="#book"` → your booking URL |
| `dental-site/index.html` | Any `href="pages/contact.html#book-form"` or `#book` used for “Book” → your URL |
| `dental-site/pages/contact.html` | CTA “Book” links → your URL |
| Root `index.html` | Same for “Book Appointment” buttons |

Search for `#book` and `contact.html#book-form` to find them all.

---

### 3.3 Text and content

| Content | Edit in |
|--------|--------|
| **Nav bar links, top bar (address/phone/hours)** | `dental-site/components/navbar.html` |
| **Hero headline, subtext, CTAs, stats (15+, 300+, 4.9, CDCP)** | `dental-site/components/hero.html` |
| **Services grid on homepage** | `dental-site/components/services.html` |
| **Testimonials on homepage** | `dental-site/components/reviews.html` |
| **FAQ questions and answers** | `dental-site/components/faq.html` |
| **Footer address, hours, service links, copyright** | `dental-site/components/footer.html` |
| **Homepage-only sections** (e.g. “Request an Appointment” form, “Care You Can Count On”, “About”, “Why Choose Us”, dentist bio, insurance block, location, final CTA) | `dental-site/index.html` (inside `<main>`) |
| **Full services page** | `dental-site/pages/services.html` |
| **Contact page (form, map, details)** | `dental-site/pages/contact.html` |
| **Insurance / CDCP page** | `dental-site/pages/insurance.html` |
| **Meta description, page title** | Each file’s `<head>` (index, contact, services, insurance) |

---

### 3.4 Images

| Use | Where to set |
|-----|----------------|
| **Hero background** | `dental-site/components/hero.html` – replace the `<img src="https://images.unsplash.com/...">` with e.g. `src="assets/images/hero.webp"`. Put the file in `dental-site/assets/images/`. |
| **About/dentist photo on homepage** | `dental-site/index.html` – find the Unsplash dentist image `<img src="https://images.unsplash.com/...">` and point to `assets/images/dentist.webp` (or similar). |
| **About “practice” image** | Same in `dental-site/index.html` – replace the treatment-room Unsplash URL with `assets/images/clinic.webp` (or similar). |
| **Map** | Replace the **map placeholder** (search for `map-placeholder` or “Google Maps Embed”) in `dental-site/index.html` and `dental-site/pages/contact.html` with a Google Maps `<iframe>` embed. |

Recommended: WebP, max width ~1400px, 80–85% quality. Keep files in `dental-site/assets/images/`.

---

### 3.5 Colors and typography

All in **one place:** `dental-site/css/styles.css` (top of file, `:root` block).

| Change | Variable(s) |
|--------|-------------|
| **Primary (teal) colour** | `--color-primary`, `--color-primary-dark`, `--color-primary-darker`, `--color-primary-light` |
| **Text** | `--color-text`, `--color-text-muted`, `--color-text-secondary` |
| **Backgrounds** | `--color-bg`, `--color-bg-subtle` |
| **Dark CTA section** | `--color-dark`, `--color-charcoal` |
| **Font family** | `--font-sans` (e.g. `'Inter', system-ui, ...`) |
| **Font sizes** | `--text-xs` … `--text-5xl` |
| **Weights** | `--weight-normal`, `--weight-semibold`, `--weight-bold` |

To switch font: update `--font-sans` in `styles.css` and the Google Fonts `<link>` in each page’s `<head>` (index + all pages).

---

### 3.6 Adding or editing a new page

1. Copy an existing page from `dental-site/pages/` (e.g. `contact.html`).
2. Rename and strip out the main content; keep `<head>` (title, meta, CSS links) and the topbar + navbar + footer structure.
3. Fix nav “home” link: `../index.html` and `../index.html#services` (etc.) so it works from `pages/`.
4. Add your new content in the middle.
5. Link to the new page from `components/navbar.html` and/or `components/footer.html` (e.g. `pages/your-page.html`).

CSS is shared: same three files (`../css/styles.css`, `components.css`, `utilities.css`). No new CSS file needed unless you add a new component type.

---

### 3.7 Adding or editing a component (homepage block)

1. **New block that only appears on the homepage:**  
   Add the HTML in `dental-site/index.html` inside `<main id="main-content">`, and add any new classes. Style in `dental-site/css/components.css` (reuse existing classes where possible).

2. **New reusable component (like navbar/hero):**  
   - Create `dental-site/components/your-name.html` with the fragment (no `<html>`/`<body>`).
   - In `dental-site/index.html`, add a placeholder: `<div id="c-your-name"></div>`.
   - In `dental-site/js/main.js`, add to `COMPONENTS`: `'c-your-name': 'components/your-name.html'`.
   - Load order is the order in `COMPONENTS`; place the new one where you want it on the page.

---

### 3.8 Form behavior (contact / appointment request)

- **Homepage “Request an Appointment” form:** Submitting it only redirects to `pages/contact.html#book-form` (see `main.js`, `initApptForm()`). No data is sent.
- **Contact page form:** Markup is in `pages/contact.html`; there is no backend. To actually send submissions, you need to either:
  - Point the form `action` to a form service (e.g. Formspree, Netlify Forms), or
  - Add a server/API and set `action` and `method` to that endpoint.

Until then, treat both as “front-end only”; document that in README or this guide if helpful.

---

### 3.9 Legal / footer links

Privacy Policy and Terms of Service are currently `href="#"` in:

- `dental-site/components/footer.html`
- `dental-site/pages/contact.html`, `pages/insurance.html`, `pages/services.html`

When you have real URLs, replace `#` with the full path or relative path (e.g. `pages/privacy.html` if you add that page).

---

## 4. Conventions (so changes don’t break things)

- **Use the site’s design tokens.** Colours, fonts, and spacing must come from `dental-site/css/styles.css` (`:root`). Use `var(--color-primary)`, `var(--font-sans)`, `var(--font-display)`, `var(--space-*)`, etc. Do not introduce new hex colours or font families unless they’re added to `:root` first. This keeps every section (including forms and new blocks) aligned with the site’s vibe.
- **No inline styles.** Put all styles in `dental-site/css/` (mostly `components.css` or `utilities.css`).
- **Class names:** BEM-style: `block__element--modifier` (e.g. `hero__heading`, `btn--primary`). Stick to existing patterns.
- **No extra JS libraries.** Vanilla ES modules only; `main.js` loads components and inits `navigation.js` and `faq.js`.
- **Icons:** Inline SVG only (no emoji, no icon fonts). Use `aria-hidden="true"` on decorative icons.
- **Links from `pages/*.html`:** Use `../index.html` for home and `../index.html#section-id` for homepage sections. Use `services.html`, `contact.html`, `insurance.html` for links between pages (when already inside `pages/`).
- **Links from `index.html` and components:** Use `pages/contact.html`, `pages/services.html`, etc. For “home” in the **component** navbar, `href="/"` is used; if you deploy under a subpath (e.g. `yoursite.com/dental/`), change to `index.html` and `index.html#services` etc. so links still work.

---

## 5. Running the site locally

Component loading uses `fetch()`, so the site must be served over HTTP (not opened as `file://`).

```bash
# From project root (NovaScotia)
cd dental-site
npx serve .
# OR
python -m http.server 8080
```

Then open: `http://localhost:3000` (serve) or `http://localhost:8080` (Python).  
For the **root** single-file version, you can open root `index.html` in the browser if you only need that file (no `fetch`), or serve the whole repo and open `/index.html`.

---

## 6. Quick checklist for a new clinic

- [ ] Replace all: address, phone (`289...` and `+12897552568`), email (`info@hamiltoncaredental.ca`), hours.
- [ ] Replace “Book” links with real booking URL (or leave as contact form).
- [ ] Replace map placeholders with Google Maps iframe in `index.html` and `pages/contact.html`.
- [ ] Add real images to `dental-site/assets/images/` and update hero, about, and dentist img `src`.
- [ ] Update meta descriptions and titles in each page’s `<head>`.
- [ ] Add Privacy / Terms pages and fix footer links (replace `#`).
- [ ] **Canonical & OG:** A canonical link and Open Graph tags are in `index.html`. Update the canonical `href` to your live URL (e.g. `https://yoursite.com/`) when you launch.

---

## 7. Summary: “I want to…”

| Goal | Where to go |
|------|-------------|
| Change phone/address/email/hours everywhere | Search & replace in whole repo (see 3.1). |
| Change “Book” button destination | Components + index + pages (see 3.2). |
| Edit hero headline or stats | `dental-site/components/hero.html`. |
| Edit nav or top bar | `dental-site/components/navbar.html`. |
| Edit services on homepage | `dental-site/components/services.html`. |
| Edit FAQ | `dental-site/components/faq.html`. |
| Edit footer | `dental-site/components/footer.html`. |
| Edit homepage-only sections | `dental-site/index.html` (main content). |
| Change colours or fonts | `dental-site/css/styles.css` (`:root`). |
| Add or change a full page | `dental-site/pages/` + nav/footer links. |
| Add or change a homepage block | `dental-site/index.html` + `components.css` and/or new component + `main.js`. |
| Add clinic photos / map | `dental-site/assets/images/` + hero/index/contact (see 3.4). |

Use this doc as the single place to know **who** (which file) to change for any update.

---

## Design quality (new sections & UI)

When adding **new sections, pages, or UI components**, follow the **frontend-design** skill so the site stays distinctive and production-grade:

- **Intentional aesthetic** – Name the direction (e.g. refined medical, editorial calm) and keep it consistent.
- **Design tokens only** – Colours, fonts, spacing from `styles.css` `:root`; no one-off hex or generic fonts.
- **DFII** – Quick check: aesthetic impact, context fit, feasibility, performance, consistency risk.
- **One memorable anchor** – At least one element that makes the section recognizable.
- **No generic patterns** – Avoid default Inter/Roboto, symmetrical filler sections, template-like layouts.

Skill reference: **frontend-design** (e.g. in Cursor skills or `.cursor/skills/frontend-design/SKILL.md`). Always refer to it for cleaner, non-generic sections moving forward.
