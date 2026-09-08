# Studio template

## Deployment

This is a static HTML site. There is no build step on Vercel. What you commit is what gets deployed.

Never:

- Run `npm run build:css` or `npm run build` and commit the result. The Tailwind static build produces different output than local and will break layout.
- Add a `buildCommand` to `vercel.json`. It must stay `""`.
- Change `installCommand`, `outputDirectory`, or `framework` in `vercel.json`.
- Extract inline `<style>` blocks from HTML into separate CSS files. Pages such as `about-us.html` rely on large inline CSS that is not in Tailwind's output.
- Defer, trim, or lazy-load fonts or critical CSS.
- Modify `css/output.css` or `css/site.css` without explicit approval.
- Change cache headers in `vercel.json` for CSS/JS without explicit approval.

How it ships:

1. Edit HTML/CSS/JS locally
2. Test with `npm run dev`
3. Commit the files as they are
4. Push. Vercel deploys them as-is

Runtime is limited to the agent-markdown shim:

- `middleware.ts`
- `api/agent-markdown.ts`
- `api/_lib/agent-markdown.ts`
- `api/_content/agent-markdown-pages.ts`

Do not expand that surface, and do not move markdown into public root-level `.md` files.

If you need a new style, use an inline `style=""` attribute. Many Tailwind classes are not in `css/output.css`.

## CSS

- `css/output.css` — Tailwind build output. Do not regenerate.
- `css/site.css` — Hand-written minified layout CSS. Do not regenerate.
- `css/read-more.css` — Service, city, and industry pages plus the integrations banner.
- `css/tokens.css` — Brand tokens. Safe to edit for a rebrand.
- Inline `<style>` in HTML — page-specific. Do not extract.

## Local commands

- `npm run dev` — static server
- `npm run build:js` — minify JS (commit when JS changes)
- `npm run build:css` / `npm run build:custom-css` — local experiments only, do not commit

## Pages to handle with care

- `about-us.html` — dark layout, 600+ lines of inline CSS
- `services.html` — GSAP entrance and tab system
