# How To Make Changes

> **Full guide**: [`dental-site/CLAUDE.md`](dental-site/CLAUDE.md)

## Quick Reference

| I want to change... | Edit this file |
|---|---|
| Homepage navbar/hero/services/reviews/footer | `dental-site/components/[name].html` |
| Inner page content | `dental-site/pages/[page].html` |
| Services dropdown links | `dental-site/js/navigation.js` → `SERVICE_LINKS` |
| FAQ content for a page | `dental-site/js/faq-content.js` → `FAQ_CONTENT` |
| Design tokens (colors, fonts) | `dental-site/css/styles.css` → `:root` |
| Component styling | `dental-site/css/components.css` |

## Important

- Homepage requires an HTTP server (`python -m http.server 8080`)
- Do not validate homepage on `file://`
- Inner pages have embedded navbar/footer — changing `components/` does NOT update them
- Shared nav behavior (dropdowns, mobile menu) is applied at runtime by `navigation.js`
