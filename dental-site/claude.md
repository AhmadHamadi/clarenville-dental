# Hamilton Care Dental – Claude Project Instructions

## Project Overview
Static HTML/CSS/JS dental landing page for Hamilton Care Dental, a dental clinic in Hamilton, Ontario.

## Stack
- **HTML5** – Semantic, WCAG-compliant markup
- **CSS** – Custom properties, no framework (no Tailwind, no Bootstrap)
- **JavaScript** – Vanilla ES modules, no libraries or bundler

## Folder Structure
```
dental-site/
├── index.html              ← Main landing page (root)
├── assets/
│   ├── images/             ← Place all photos here (WebP preferred)
│   └── icons/              ← SVG icon files if extracted from HTML
├── css/
│   ├── styles.css          ← Base reset, CSS variables, layout, grids, sections
│   ├── components.css      ← Reusable UI: navbar, hero, cards, buttons, footer
│   └── utilities.css       ← Helper classes: text, spacing, display, flex
├── js/
│   ├── main.js             ← Entry point – loads components via fetch(), inits modules
│   ├── navigation.js       ← Mobile menu toggle, smooth scroll
│   └── faq.js              ← FAQ accordion (ARIA-compliant)
├── components/             ← HTML fragments injected by main.js
│   ├── navbar.html
│   ├── hero.html
│   ├── services.html
│   ├── reviews.html
│   ├── faq.html
│   └── footer.html
└── pages/                  ← Standalone full HTML pages
    ├── services.html
    ├── contact.html
    └── insurance.html
```

## Local skills (.claude/skills/)

This project has **local skills** in the repo’s `.claude/skills/` folder. **Use them in Cursor (and any editor) when working on this repo** — they live in the project, so any session with access to the files can read and apply them.

| Skill | Use when |
|-------|----------|
| **react-best-practices** | React/Next.js performance, bundles, waterfalls, rendering (N/A for this vanilla HTML/CSS/JS site) |
| **senior-frontend** | React/Next/TS frontend scaffolding, component generator, bundle analyzer (N/A for this vanilla site) |
| **ui-design-system** | Design tokens, design systems, token generation, handoff |
| **ui-ux-pro-max** | UI/UX decisions: colors, typography, accessibility, layout, animations, styles (glassmorphism, minimal, etc.), 9 stacks |

For this **vanilla dental site**, prefer **ui-ux-pro-max** and **ui-design-system** for design/UI choices; **frontend-design** (Cursor skill) for distinctive sections. React skills apply if you add a React/Next layer later.

## Design & frontend (skill)
For **new sections, components, and UI work**, always apply the **frontend-design** skill (`.cursor/skills/frontend-design/SKILL.md` or Cursor’s frontend-design skill). It ensures:
- Intentional aesthetic direction (no generic “AI UI”)
- DFII check before building (design feasibility & impact)
- Clear design thinking (purpose, tone, differentiation anchor)
- Execution rules: typography, color via CSS variables, spatial composition, restrained motion
- No anti-patterns (e.g. Inter/Roboto, default Tailwind layouts, symmetrical filler)
New pages and sections should feel distinctive and production-grade, not template-like.

## Important Rules
1. **No inline styles** – All styles belong in `/css/`
2. **No emoji icons** – Use inline SVG only
3. **No CDN JS libraries** – Vanilla JS only
4. **CSS class naming** – Follow existing BEM-inspired conventions (`block__element--modifier`)
5. **Component loading** – `main.js` uses `fetch()` to inject component HTML. Requires a local HTTP server.

## Color System (CSS Variables)
```
--color-primary:        #0f766e   (deep teal – primary actions)
--color-primary-dark:   #0d6360
--color-primary-light:  #f0fdfa   (tinted backgrounds)
--color-text:           #111827   (headings)
--color-text-muted:     #6b7280   (body copy)
--color-bg:             #ffffff
--color-bg-subtle:      #f9fafb   (alternate sections)
--color-border:         #e5e7eb
--color-dark:           #111827   (dark CTA section)
--color-charcoal:       #1f2937
--color-amber:          #f59e0b   (star ratings only)
```

## Typography
- Font: **Inter** (Google Fonts) with system-ui fallback
- Body: 16px / 1.5 line-height
- H1: 3rem (desktop), 2.25rem (mobile)
- H2: ~1.875rem
- All type sizes defined as CSS variables (`--text-xs` through `--text-5xl`)

## Local Development
Requires a local HTTP server (fetch() does not work on `file://`):
```bash
# VS Code – install "Live Server" extension and click "Go Live"
# OR
npx serve .
# OR
python3 -m http.server 8080
```
Then open: http://localhost:8080

## Adding Real Images
Replace all `div.hero__image`, `div.dentist__photo`, and `div.map-placeholder` with:
```html
<img src="assets/images/your-file.webp" alt="Descriptive alt text" width="1200" height="900" loading="lazy" />
```
Store images in `/assets/images/`. Use WebP format at 85% quality. Max width 1400px.

## Replacing the Map
In `index.html` and `pages/contact.html`, replace the `.map-placeholder` div with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  width="100%" height="360"
  style="border:0;" allowfullscreen loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Hamilton Care Dental location map"
></iframe>
```

## SEO Checklist
- [ ] Replace placeholder meta description with final clinic copy
- [ ] Add `<link rel="canonical">` to each page
- [ ] Add Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Submit sitemap to Google Search Console after deployment
