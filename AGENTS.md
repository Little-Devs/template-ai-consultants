# AGENTS.md

**Security and reliability are paramount.** Prefer a correct, boring change over a clever one. Do not invent backends, credentials, tracking, or third-party services.

## Template

- **Name:** `AI Consultants (Studio template)`
- **Catalog id:** `ai-consultants`
- **Repository:** `https://github.com/Little-Devs/template-ai-consultants`
- **Demo:** `https://ai-consultants.little.website/`
- **Stack:** `Static HTML` · `Tailwind (committed css/output.css) + hand CSS` · `JavaScript`
- **Catalog:** https://github.com/Little-Devs/web-templates (`templates.json`)
- **MCP:** https://mcp.little.website (`get_template`, `get_agent_docs`)

## Agent / LLM setup

1. Read `README.md`, `template.json`, this file, and `PROMPT.md`.
2. Discover tokens and components from the repo — do not restyle from memory.
3. Keep the existing stack, file layout, and build commands unless the task explicitly changes them.
4. Work in small, reviewable diffs. Match local naming, comments, and formatting.
5. Verify the change the way a user would (`npm run dev` — not SPA servers). Do **not** run or commit `npm run build` / CSS regeneration (`css/output.css`, `css/site.css`).
6. Never commit secrets, `.env` files, API keys, or machine-local paths.

This document is harness-agnostic. It applies in Cursor, Claude, Codex, Cloudflare Agents, or any other runner.

## Security and reliability

Treat every change as production-bound.

- No secrets in source, docs, or client bundles.
- No new analytics, pixels, CDNs, or third-party scripts without an explicit request. Vercel Speed Insights / `va.vercel-scripts.com` must stay removed.
- Forms stay static (typically `mailto:` via brand email) unless the optional Supabase inquiry path in `supabase/SETUP.md` is already wired.
- Sanitize any user-controlled string that reaches HTML, URLs, or attributes.
- Preserve HTTPS, existing CSP / security headers (`_headers`), and dependency pins.
- Do not weaken auth, CORS, or cookie settings if they exist.
- Prefer existing dependencies. New packages need a reason and a lockfile update.
- Respect `prefers-reduced-motion`. Do not ship layout shift or broken empty/error states.
- If unsure whether a change is safe, stop and ask — do not guess.

## Design tokens and style guides

Use the template’s tokens. Do not introduce a parallel palette or type scale.

Typical sources (use what this repo actually has):

- `template.json` → `aesthetic.colors`, `aesthetic.fonts`, `sections`
- `css/tokens.css` (`:root` custom properties)
- `js/brand.js` (`STUDIO_BRAND` name, email, URL, description)
- Tailwind theme in `tailwind.config.js` when relevant — but do **not** regenerate committed CSS

Rules:

- Change brand colour, type, or spacing by editing tokens — not one-off hex in components.
- Keep contrast WCAG AA. Do not flatten hierarchy or drop focus styles.
- Reuse existing layout primitives (grid, section wrappers, buttons, forms).
- Section on/off and light-custom (logo, colours, fonts, copy) are the default customization path.
- Inter is self-hosted under `assets/fonts`. Do not add Google Fonts (or any new font host) for body/display type; legacy Google Fonts links may still appear on some pages — prefer self-hosted Inter + Black Echo credit font.

Fill in this template’s tokens:

| Token | Value | Notes |
|-------|-------|-------|
| `--color-primary` | `#3D2265` | Primary purple |
| `--color-accent` | `#9855FF` | Accent violet |
| `--color-accent-2` | `#E63CFE` | Accent magenta |
| `--color-accent-ink` | `#5B2FA8` | Accent ink |
| `--color-paper` | `#FDFCF8` | Paper background |
| `--color-ink` | `#1C1917` | Body ink |
| `--color-muted` | `#525252` | Muted text |
| Display / body / credit | `Inter` / `Inter` / `Black Echo` | Inter self-hosted (`assets/fonts`); Black Echo credit font |

## How agents should work

- Follow `PROMPT.md` for the reproduction task. Keep placeholders brief and concrete.
- Preserve information architecture unless the prompt says to add/remove a section.
- Swap demo copy, logo, and contact details; do not rewrite the product into a different business.
- Keep performance: no new hero videos, unoptimized images, or unused JS.
- Mobile, tablet, and desktop must all keep working.
- If the catalog or MCP metadata is wrong, say so — do not “fix” `templates.json` from a template repo.

## Out of scope

Leave these alone unless the user explicitly asks and the template already supports them:

- New frameworks, meta-frameworks, or CSS libraries
- Databases, auth, payments, CMS, or serverless backends (beyond the existing optional inquiry / agent-markdown shim)
- Catalog edits, git submodules, or `web-templates` repo changes
- Production DNS, Cloudflare, or `*.little.website` deploys
- Tracking, A/B, chat widgets, or marketing pixels
- License changes (templates ship MIT)
- Expanding the agent-markdown surface (`middleware.ts`, `api/agent-markdown.ts`, `api/_lib/`, `api/_content/`)
- Regenerating or committing `css/output.css` / `css/site.css` via `npm run build`

## Contacts

- **Devs / template questions:** [devs@little.cloud](mailto:devs@little.cloud)
- **Platform (catalog, MCP, mcp.little.website):** Oppy
- **Security:** Steve

If a change could leak data, weaken a form, or add a third-party script, stop and ask Steve before shipping.

## Template-specific notes

### Rebrand and deploy

- Rebrand via `css/tokens.css` + `js/brand.js` (`STUDIO_BRAND`).
- Local: `npm install` then `npm run dev` (`node server.js`) at `http://localhost:3000` with clean URLs. Do **not** use SPA-mode servers.
- Vercel / static demos ship committed files as-is. Never run `npm run build` / `build:css` and commit the result; never add a Vercel `buildCommand`.
- Optional inquiry backend: see `supabase/SETUP.md`. Otherwise forms use `mailto:` from brand email.

### Pages (information architecture)

Core: `index`, `about-us`, `services`, `products`, `inquire`, `blog`, `book`, `thank-you`, `how-we-work`, `data-security`, `meet-maria`, `aim`, plus AI service pages (`ai-consulting`, `ai-development`, `ai-training`, `ai-governance`, `ai-assistants`, `ai-opportunity-map`, `ai-sales-lead-response`, `business-process-automation`), and `404`. Additional city / industry / blog / client-results HTML exists under subfolders.

### Agent surface

- Start at `/.well-known/agent-skills/index.json`.
- Agent-markdown shim lives under `api/` + `middleware.ts`. Do not expand that surface or move markdown into public root-level `.md` files.
- If copy changes on `/`, `/services`, `/ai-consulting`, `/ai-development`, `/ai-training`, or `/ai-governance`, update `api/_content/agent-markdown-pages.ts` to keep markdown representations aligned.
- About Us founder cards and bios are authored only in `about-us.html`; `/about-us` is not a supported agent-markdown route, so those edits do not require `api/_content/agent-markdown-pages.ts` sync.
- Founder card portraits use the `founder-photo` pattern in `about-us.html`: grayscale by default, full colour on hover, `:focus-visible`, and when the card has `.is-active` (expanded/detail rail).

### Copy preferences

- Avoid heavy use of em dashes in marketing and team bio copy; it reads as generic AI tone.
- Prefer plain-language security mentions over dense technical jargon in public-facing bios unless the page is explicitly technical.
- When writing team member bios, omit geographic base location when it is not required or the subject prefers not to state it on the site.

### CDN allowlist (do not expand without asking Steve)

This template already loads a small set of third-party script hosts. Root `_headers` CSP `script-src` allows them. Do **not** add new CDN hosts or analytics. Prefer vendoring later if a host must go; this pass does not vendor.

| Host | Role |
|------|------|
| `'self'` | Local JS (including `js/gsap/*`, `js/brand.js`, `js/site.js`, lite-youtube embed) |
| `https://cdnjs.cloudflare.com` | three.js, lottie-web |
| `https://unpkg.com` | lucide |
| `https://cdn.jsdelivr.net` | GSAP plugins on `maria/slides/*` only |
| `https://www.youtube.com` | lite-youtube `iframe_api` (loaded on demand) |

Related CSP (not script-src): `style-src` allows `'unsafe-inline'` + `https://fonts.googleapis.com`; `font-src` allows `https://fonts.gstatic.com`; `img-src` allows `https://i.ytimg.com`; `frame-src` allows YouTube nocookie/embed. Inline `<script>` blocks are common in this static HTML template, so `script-src` also includes `'unsafe-inline'` (required for demos to run under Cloudflare Pages CSP).

### Handle with care

- `about-us.html` — dark layout, large inline CSS; do not extract into separate files.
- `services.html` — GSAP entrance and tab system.
- Many Tailwind utility classes used in HTML are **not** present in `css/output.css`; prefer inline `style=""` for new one-off styles rather than regenerating Tailwind.
