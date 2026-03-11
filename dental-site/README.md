# Hamilton Care Dental – Website

Professional dental landing page for **Hamilton Care Dental**, a family and emergency dental clinic in Hamilton, Ontario.

**Making changes?** See the project root **[HOW-TO-MAKE-CHANGES.md](../HOW-TO-MAKE-CHANGES.md)** for where to edit content, clinic details, styles, and pages.

---

## Quick Start

This site uses `fetch()` to load HTML components, so it **requires a local HTTP server**.

```bash
# Option 1 – VS Code Live Server (recommended)
# Install the "Live Server" extension, right-click index.html → "Open with Live Server"

# Option 2 – Node.js
npx serve .

# Option 3 – Python
python3 -m http.server 8080
```

Then open: **http://localhost:8080**

---

## Project Structure

```
dental-site/
├── index.html              Main landing page
│
├── assets/
│   ├── images/             Clinic photos (use WebP, max 1400px wide)
│   └── icons/              SVG icon files (optional – icons currently inline)
│
├── css/
│   ├── styles.css          CSS variables, reset, layout, grid, sections
│   ├── components.css      Navbar, hero, cards, buttons, FAQ, footer, etc.
│   └── utilities.css       Display, spacing, text, flex helpers
│
├── js/
│   ├── main.js             Entry point – fetches components, boots modules
│   ├── navigation.js       Mobile menu, smooth scroll
│   └── faq.js              Accordion with ARIA keyboard support
│
├── components/             HTML fragments (injected by main.js)
│   ├── navbar.html
│   ├── hero.html
│   ├── services.html
│   ├── reviews.html
│   ├── faq.html
│   └── footer.html
│
├── pages/                  Standalone pages
│   ├── services.html       All dental services
│   ├── contact.html        Contact form + booking
│   └── insurance.html      Insurance & CDCP info
│
├── claude.md               Instructions for AI-assisted development
└── README.md               This file
```

---

## Pages

| URL | Description |
|-----|-------------|
| `/index.html` | Main landing page |
| `/pages/services.html` | Full services detail page |
| `/pages/contact.html` | Contact form + map |
| `/pages/insurance.html` | Insurance + CDCP information |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#0f766e` | Buttons, links, icons |
| `--color-text` | `#111827` | Headings |
| `--color-text-muted` | `#6b7280` | Body copy |
| `--color-bg` | `#ffffff` | Page background |
| `--color-bg-subtle` | `#f9fafb` | Alternate section backgrounds |
| `--color-dark` | `#111827` | Final CTA section |

Font: **Inter** (Google Fonts) – 400, 500, 600, 700 weights.

---

## Customisation

### 1. Replace images
Add photos to `/assets/images/` and update the placeholder divs in the HTML:
```html
<!-- Replace this: -->
<div class="hero__image" role="img" aria-label="...">...</div>

<!-- With this: -->
<img src="assets/images/clinic-interior.webp" alt="Hamilton Care Dental clinic interior"
     width="1200" height="900" loading="lazy" class="hero__image-photo" />
```

### 2. Replace the map
In `index.html` and `pages/contact.html`, replace `.map-placeholder` with a Google Maps `<iframe>`.

### 3. Update clinic details
Search the project for `123 Main Street West` and `(289) 755-2568` and replace with real values.

### 4. Add booking system
Replace `href="#book"` buttons with your online booking URL (Jane App, Cliniko, etc.).

---

## Accessibility

- Semantic HTML5 elements throughout (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels on all interactive and landmark elements
- Keyboard-navigable accordion (Arrow keys, Home, End)
- Focus-visible styles on all interactive elements
- `aria-hidden="true"` on all decorative SVGs
- Minimum 4.5:1 contrast ratio on all text

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No IE11 support. ES modules required.
