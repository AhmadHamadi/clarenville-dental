# AI.md

> **Primary guide**: [`dental-site/CLAUDE.md`](dental-site/CLAUDE.md) — read that file first. It is the single comprehensive reference for this project.

## Quick Context

- **Project**: Clarenville Dental Care website
- **Implementation**: `dental-site/` (static HTML/CSS/JS)
- **Two rendering paths**: Homepage uses component injection via `fetch()`. Inner pages are standalone HTML.
- **Strategy docs**: `docs/clarenville/`

## Read Order

1. [`dental-site/CLAUDE.md`](dental-site/CLAUDE.md) — complete technical and content guide
2. [`AGENTS.md`](AGENTS.md) — non-negotiables and verified facts
3. `docs/clarenville/` — SEO strategy and planning (when doing strategy work)

## If Unsure

- Default to `dental-site/` as the canonical implementation
- Use the Edit Map in CLAUDE.md to find the right file
- Prefer small, source-of-truth fixes over duplicated patches
- Do not validate homepage changes on `file://` — use an HTTP server
