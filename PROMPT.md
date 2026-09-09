# PROMPT.md

Provider-, framework-, and harness-agnostic reproduction prompt for this template. Fill the placeholders, then paste the Prompt block into any agent.

Read `AGENTS.md` first. Security and reliability are paramount.

---

## Prompt

Customize the `AI Consultants (Studio template)` (`ai-consultants`) website template for the following brief.

### Brief

- **Business / project:** `[who this site is for — e.g. an AI consultancy / studio]`
- **Primary goal:** `[one sentence — e.g. book a discovery call, explain AI services]`
- **Audience:** `[who lands here — e.g. SME operators evaluating AI consulting]`
- **Must keep:** existing stack, tokens, and section structure
- **Must change:** `[logo, colours, fonts, copy, contact — list only what applies]`
- **Must not:** new backend, new analytics, new framework, secrets in the repo, regenerating `css/output.css` / `css/site.css`

### Constraints

- Follow `AGENTS.md`. Do not invent services or credentials.
- Edit design tokens (`css/tokens.css` / `js/brand.js`) instead of one-off hex in components.
- Keep the current `Static HTML` + `Tailwind (committed output) + hand CSS` stack and folder layout.
- Forms stay static (`mailto:` or existing optional Supabase inquiry handler only).
- No new third-party scripts, pixels, or font hosts. Stay within the CDN allowlist in `AGENTS.md`.
- Responsive: mobile, tablet, desktop. Preserve focus styles and reduced-motion.
- Small, reviewable diff. Match local style.
- Verify with `npm run dev` (`node server.js`). Do not commit `npm run build` CSS output.

### Acceptance checks

- [ ] `README.md`, `template.json`, `AGENTS.md`, and this file were read before edits
- [ ] Tokens updated in one place; UI consumes those tokens
- [ ] Requested copy/logo/contact replaced; leftover demo names are gone
- [ ] No new backend, auth, payment, or tracking
- [ ] No secrets or `.env` committed
- [ ] `npm run check:agent-skills` succeeds if agent-skills or agent-markdown content was touched; site still serves via `npm run dev`
- [ ] Home (and any touched routes) render; empty/error states still make sense
- [ ] Keyboard and screen-reader basics still work (labels, contrast, focus)

### Deliver

Summarize files changed and any placeholder that could not be filled from the brief. Do not deploy.
