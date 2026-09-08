import { next, rewrite } from "@vercel/functions";
import {
  AGENT_MARKDOWN_REQUEST_HEADER,
  AGENT_MARKDOWN_ROUTE_HEADER,
  isSupportedMarkdownRoute,
  prefersMarkdown,
} from "./api/_lib/agent-markdown";

export const config = {
  matcher: [
    "/",
    "/services",
    "/ai-opportunity-map",
    "/how-we-work",
    "/data-security",
    "/ai-consulting",
    "/ai-development",
    "/ai-training",
    "/ai-governance",
  ],
  runtime: "nodejs",
};

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (request.method !== "GET" && request.method !== "HEAD") {
    return next();
  }

  if (!isSupportedMarkdownRoute(url.pathname)) {
    return next();
  }

  if (!prefersMarkdown(request.headers.get("accept"))) {
    return next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(AGENT_MARKDOWN_REQUEST_HEADER, "1");
  requestHeaders.set(AGENT_MARKDOWN_ROUTE_HEADER, url.pathname);

  return rewrite(new URL("/api/agent-markdown", request.url), {
    request: {
      headers: requestHeaders,
    },
  });
}
