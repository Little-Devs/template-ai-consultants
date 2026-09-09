# AI Consultants (Studio template)

Static multi-page AI consultancy template. Edit HTML, CSS, and JS in place. Vercel / Cloudflare Pages demos deploy committed files as-is. There is no production CSS build step.

## Agent docs (required)

- `AGENTS.md` — agent/LLM setup, security, tokens, CDN allowlist, template-specific notes
- `PROMPT.md` — provider-agnostic reproduction prompt
- `template.json` — catalog metadata (CONTRIBUTING format)

## Rebrand

1. `css/tokens.css` — colours and fonts
2. `js/brand.js` — `STUDIO_BRAND` name, email, URL, description

Copy on the pages is lorem ipsum. Nav labels stay so the information architecture is readable.

Hero videos use a public placeholder (`videoid="aqz-KE-bpKQ"`). Replace that ID with your own YouTube video.

## Local

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000` with clean URLs (`/about-us` → `about-us.html`). Do not use SPA-mode servers.

## Deploy

Push the files you tested locally. Do **not** regenerate `css/output.css` or `css/site.css`, and do not add a Vercel `buildCommand`.

Cloudflare Pages demos use root `_headers` (Steve CSP bar + CDN allowlist). Do not add `X-Frame-Options`.

Inquiry form: optional. See `supabase/SETUP.md`. Forms otherwise `mailto:` via brand email.

## Stack

Static HTML, Tailwind output in `css/output.css`, page CSS in `css/site.css` / `css/read-more.css` / `css/products.css` plus inline `<style>` on some pages. GSAP (local + limited CDN), Lucide, Lottie, Three.js.
