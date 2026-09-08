export const AGENT_MARKDOWN_REQUEST_HEADER = "x-zenias-agent-markdown";
export const AGENT_MARKDOWN_ROUTE_HEADER = "x-zenias-agent-route";

export const SUPPORTED_MARKDOWN_ROUTES = [
  "/",
  "/services",
  "/ai-opportunity-map",
  "/how-we-work",
  "/data-security",
  "/ai-consulting",
  "/ai-development",
  "/ai-training",
  "/ai-governance",
  "/ai-assistants",
] as const;

export type SupportedMarkdownRoute = (typeof SUPPORTED_MARKDOWN_ROUTES)[number];

const SUPPORTED_ROUTE_SET = new Set<string>(SUPPORTED_MARKDOWN_ROUTES);

type AcceptPreference = {
  mediaType: string;
  q: number;
  index: number;
};

export function isSupportedMarkdownRoute(pathname: string): pathname is SupportedMarkdownRoute {
  return SUPPORTED_ROUTE_SET.has(pathname);
}

function parseAcceptHeader(header: string | null): AcceptPreference[] {
  if (!header) return [];

  return header
    .split(",")
    .map((part, index) => {
      const [rawType, ...params] = part.split(";");
      const mediaType = rawType.trim().toLowerCase();
      let q = 1;

      for (const rawParam of params) {
        const [key, value] = rawParam.split("=").map((segment) => segment.trim().toLowerCase());
        if (key === "q" && value) {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) {
            q = parsed;
          }
        }
      }

      return { mediaType, q, index };
    })
    .filter((entry) => entry.mediaType && entry.q > 0);
}

function getBestPreference(entries: AcceptPreference[], mediaType: string): AcceptPreference | null {
  const matching = entries.filter((entry) => entry.mediaType === mediaType);
  if (matching.length === 0) return null;

  return matching.reduce((best, entry) => {
    if (!best) return entry;
    if (entry.q > best.q) return entry;
    if (entry.q === best.q && entry.index < best.index) return entry;
    return best;
  }, null as AcceptPreference | null);
}

function getEffectiveHtmlPreference(entries: AcceptPreference[]): AcceptPreference | null {
  return (
    getBestPreference(entries, "text/html") ??
    getBestPreference(entries, "text/*") ??
    getBestPreference(entries, "*/*")
  );
}

export function prefersMarkdown(acceptHeader: string | null): boolean {
  const parsed = parseAcceptHeader(acceptHeader);
  const markdown = getBestPreference(parsed, "text/markdown");
  const html = getEffectiveHtmlPreference(parsed);

  if (!markdown) return false;
  if (!html) return true;
  return markdown.q > html.q;
}
