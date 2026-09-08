# Studio template

Static multi-page site. Edit HTML, CSS, and JS in place. Vercel deploys committed files as-is. There is no production build step.

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

Inquiry form: optional. See `supabase/SETUP.md`.

## Stack

Static HTML, Tailwind output in `css/output.css`, page CSS in `css/site.css` / `css/read-more.css` / `css/products.css` plus inline `<style>` on some pages. GSAP, Lucide, Lottie.
