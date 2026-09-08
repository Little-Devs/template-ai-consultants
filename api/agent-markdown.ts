import { AGENT_MARKDOWN_PAGES } from "./_content/agent-markdown-pages";
import {
  AGENT_MARKDOWN_REQUEST_HEADER,
  AGENT_MARKDOWN_ROUTE_HEADER,
  isSupportedMarkdownRoute,
} from "./_lib/agent-markdown";

function buildMarkdownResponse(request: Request, includeBody: boolean) {
  if (request.headers.get(AGENT_MARKDOWN_REQUEST_HEADER) !== "1") {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const route = request.headers.get(AGENT_MARKDOWN_ROUTE_HEADER) ?? "";
  if (!isSupportedMarkdownRoute(route)) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const body = AGENT_MARKDOWN_PAGES[route];
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
    Vary: "Accept",
  });

  return new Response(includeBody ? body : null, {
    status: 200,
    headers,
  });
}

export const runtime = "nodejs";

export function GET(request: Request) {
  return buildMarkdownResponse(request, true);
}

export function HEAD(request: Request) {
  return buildMarkdownResponse(request, false);
}
