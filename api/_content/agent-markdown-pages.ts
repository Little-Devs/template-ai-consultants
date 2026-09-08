import type { SupportedMarkdownRoute } from "../_lib/agent-markdown";

export const AGENT_MARKDOWN_PAGES: Record<SupportedMarkdownRoute, string> = {
  "/": `---
title: Studio | Independent practice
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.

Strategy · Design · Build · Care

## Primary navigation

- Services: /services
- Start here: Discovery: /how-we-work#discover
- How We Work: /how-we-work
- About Us: /about-us
- Book a Call: /inquire

## Approach

Lorem. Ipsum. Dolor.

- Strategy: lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
- Design: ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
- Build: duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
- Care: excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.

## Best next step

- Explore services at /services
- Read how we work at /how-we-work
- Get in touch at /inquire
`,
  "/services": `---
title: Services | Strategy, Design, Build, Care | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/services
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Strategy · Design · Build · Care

## Strategy

- Route: /ai-consulting
- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.

## Design

- Route: /ai-development
- Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

## Build

- Route: /ai-training
- Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.

## Care

- Route: /ai-governance
- Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.

## Best next step

- How We Work: /how-we-work
- Get in touch: /inquire
`,
  "/ai-opportunity-map": `---
title: Opportunity Map | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/ai-opportunity-map
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Terms

- Lorem ipsum dolor sit amet consectetur adipiscing elit.
- Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
- Ut enim ad minim veniam quis nostrud exercitation ullamco.

## Best next step

- Get in touch: /inquire
- How We Work: /how-we-work
- Data & Security: /data-security
- Services: /services
`,
  "/how-we-work": `---
title: How We Work | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/how-we-work
last_updated: 2026-09-08
---

# How We Work

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## 01 Discover

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.

## 02 Define

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

## 03 Build

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.

## 04 Care

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.

## Best next step

- Get in touch: /inquire
- Services: /services
`,
  "/data-security": `---
title: Data & Security | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/data-security
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## 01

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## 02

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## 03

Ut enim ad minim veniam, quis nostrud exercitation ullamco.

## Best next step

- Get in touch: /inquire
- Care: /ai-governance
- How We Work: /how-we-work
`,
  "/ai-consulting": `---
title: Strategy | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/ai-consulting
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Best next step

- Services overview: /services
- Inquire: /inquire
`,
  "/ai-development": `---
title: Design | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/ai-development
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Best next step

- Services overview: /services
- Inquire: /inquire
`,
  "/ai-training": `---
title: Build | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/ai-training
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Best next step

- Services overview: /services
- Inquire: /inquire
`,
  "/ai-governance": `---
title: Care | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/ai-governance
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Best next step

- Services overview: /services
- Inquire: /inquire
`,
  "/ai-assistants": `---
title: Aria | Studio
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
canonical_url: https://example.com/ai-assistants
last_updated: 2026-09-08
---

# Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

## Related routes

- Services: /services
- Opportunity Map: /ai-opportunity-map
- Get in touch: /inquire
`,
};
