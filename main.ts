import { serve } from "https://deno.land/std@0.64.0/http/server.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

import { config } from './environment.ts';

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const req of s) {
  // Separate query parameters
  const route = req.url.split("?");
  req.url = route[0];
  const params = new URLSearchParams(route[1]);

  // Parse any API routes
  switch (req.url) {
    case "/api/ping":
      req.respond({ body: "Pong!", status: 200 });
      continue;
    case "/oauth/callback":
      if (params.get("state") != "pog") {
        req.respond({ status: 401 });
      }
      else {
        const url = "https://github.com/login/oauth/access_token";
        fetch(`${url}?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${params.get("code")}&state=pog`, { method: "POST" })
        .then(res => res.text())
        .then(res => {
          const authParams = new URLSearchParams(res);
          const headers = new Headers();
          headers.set("set-cookie", `token=${authParams.get("access_token")}`);
          headers.set("location", "/dashboard");
          req.respond({ status: 302, headers: headers});
        });
      }
      continue;
  }

  // Root index, dashboard or parse as relative URL
  if (req.url === "/") {
    req.url = "app/index.html";
  }
  else if (req.url === "/dashboard") {
    req.url = "app/dashboard.html";
  }
  else {
    req.url = `app${req.url}`;
  }

  // Check if file exists
  if (!(await exists(req.url))) {
    req.respond({ status: 404 });
    console.warn(`Resource Not Found: ${req.url}`);
    continue;
  }

  console.log(`Parse: ${route}`);

  const content = await Deno.readFile(req.url);

  // Get type
  let type = getMimeType(req.url);
  const headers = new Headers();
  headers.set("content-type", type);

  req.respond({ body: content, status: 200, headers: headers });
}

function getMimeType(url: string) {
  const splitUrl = url.split('.');
  switch (splitUrl[splitUrl.length - 1]) {
    case "css":
      return "text/css";
    case "ico":
      return "image/x-icon";
    case "html":
      return "text/html";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    default:
      return "text/plain";
  }
}