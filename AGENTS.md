## Learned User Preferences

- Avoid heavy use of em dashes in marketing and team bio copy; it reads as generic AI tone.
- Prefer plain-language security mentions over dense technical security jargon in public-facing bios unless the page is explicitly technical.
- When writing team member bios, omit geographic base location when it is not required or the subject prefers not to state it on the site.

## Learned Workspace Facts

- For agent-facing site behavior, start at `/.well-known/agent-skills/index.json`.
- If copy changes on `/`, `/services`, `/ai-consulting`, `/ai-development`, `/ai-training`, or `/ai-governance`, update `api/_content/agent-markdown-pages.ts` to keep the markdown representations aligned.
- The About Us founder cards and bios are authored only in `about-us.html`; `/about-us` is not a supported agent-markdown route, so those edits do not require updates to `api/_content/agent-markdown-pages.ts` or related markdown sync.
- Founder card portraits use the `founder-photo` pattern in `about-us.html`: grayscale filter by default, full colour on hover, `:focus-visible`, and when the card has `.is-active` (expanded/detail rail).
