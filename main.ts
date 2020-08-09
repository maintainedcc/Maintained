import { serve } from "https://deno.land/std@0.63.0/http/server.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const req of s) {
  // Parse any API routes
  switch (req.url) {
    case "/api/ping":
      req.respond({ body: "Pong!", status: 200 });
      continue;
  }

  // Root index or parse as relative URL
  if (req.url === "/") {
    req.url = "index.html";
  }
  else if (!req.url.startsWith(".")) {
    req.url = `.${req.url}`;
  }

  // Get type
  let type = "";
  const splitUrl = req.url.split('.');
  switch (splitUrl[splitUrl.length - 1]) {
    case "css":
      type = "text/css";
      break;
    case "ico":
      type = "image/x-icon";
      break;
    case "html":
      type = "text/html";
      break;
    case "svg":
      type = "image/svg+xml";
      break;
    default:
      type = "text/plain";
  }

  // Check if file exists
  if (!(await exists(req.url))) {
    req.respond({ status: 404 });
    console.warn(`URL Not Found: ${req.url}`);
    continue;
  }

  console.log(`Parse: ${req.url}`);

  const decoder = new TextDecoder("utf-8");
  const content = decoder.decode(await Deno.readFile(req.url));

  const headers = new Headers();
  headers.set("content-type", type);
  req.respond({ body: content, status: 200, headers: headers });
}