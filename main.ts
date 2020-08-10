import { serve } from "https://deno.land/std@0.64.0/http/server.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

import { ApiService } from './api.ts';
import { IdentityService } from './identity.ts';

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

const api = new ApiService();
const identity = new IdentityService();

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
      const code = params.get("code") ?? "";
      const state = params.get("state") ?? "";

      if (!code || state != "pog") {
        req.respond({ status: 400 });
        continue;
      }
      
      const token = await api.getAccessToken(code, state);

      // Allow this token to make database edits
      const uuid = await api.getUserUUID(token);
      identity.authorizeToken(token, uuid);

      req.respond({ 
        status: 302, 
        headers: new Headers({
          "Set-Cookie": `token=${token}; Max-Age=86400; SameSite=Strict;`,
          "Location": "/dashboard"
        })
      });
      continue;
  }

  // Use /app folder as scope, route pages
  switch (req.url) {
    case "/":
      req.url = "/index.html";
    case "/dashboard":
      req.url = "/dashboard.html";
    default:
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