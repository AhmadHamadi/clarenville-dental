# Clarenville Dental Care — Website

Professional dental website for Clarenville Dental Care in Clarenville, Newfoundland and Labrador.

> **For AI assistants**: Read [`CLAUDE.md`](CLAUDE.md) for complete project documentation.

## Quick Start

The homepage loads components via `fetch()`, so you need an HTTP server:

```bash
cd dental-site
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Stack

- HTML5 (semantic, no frameworks)
- CSS3 (custom properties, BEM naming)
- Vanilla JavaScript (ES modules)
- Google Fonts (DM Sans, DM Serif Display)

## Structure

```
index.html              Homepage shell (loads components via JS)
components/             Homepage HTML fragments (navbar, hero, services, reviews, footer)
pages/                  Standalone inner pages (~38 files)
css/styles.css          Design tokens, reset, layout
css/components.css      All UI component styles
css/utilities.css       Atomic helper classes
js/main.js              Homepage loader + init
js/navigation.js        Nav behavior, dropdowns, mobile menu
js/faq.js               Accordion behavior
js/faq-content.js       FAQ Q&A data for all pages
js/service-page-enhancements.js   Images, galleries, related links
```

## Key Concept

The homepage and inner pages are **separate rendering paths**:
- **Homepage**: shell + `main.js` fetches components from `components/`
- **Inner pages**: complete standalone HTML with embedded navbar/footer

Shared behavior (service dropdown, mobile menu, FAQ) is applied at runtime by JavaScript modules.
