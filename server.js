/**
 * Static dev server with clean-URL support: /about-us -> about-us.html, /products -> products.html
 * Run: npm run dev (port 3000)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath).replace(/^\//, "").replace(/^(\.\.(\/|\\))+/, "") || ".";
  let filePath = path.join(ROOT, decoded);
  if (filePath.indexOf(ROOT) !== 0) filePath = ROOT;

  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const index = path.join(filePath, "index.html");
      return fs.existsSync(index) ? index : null;
    }
    return filePath;
  }

  if (!path.extname(filePath)) {
    const withHtml = filePath + ".html";
    if (fs.existsSync(withHtml)) return withHtml;
    const indexInDir = path.join(filePath, "index.html");
    if (fs.existsSync(indexInDir)) return indexInDir;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const filePath = resolvePath(urlPath);

  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(
      "File not found\n\nThe file \"" +
        path.join(ROOT, urlPath) +
        "\" cannot be found. Try adding .html (e.g. /about-us.html) or use links from the site."
    );
    return;
  }

  const ext = path.extname(filePath);
  const mime = MIME[ext] || "application/octet-stream";

  try {
    const body = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": mime });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log("Dev server at http://localhost:" + PORT);
  console.log("Clean URLs: /about-us, /products, /services, /inquire → .html");
});
