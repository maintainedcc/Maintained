import { serve } from "https://deno.land/std@0.64.0/http/server.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";
import { getCookies } from 'https://deno.land/std@0.64.0/http/cookie.ts';

import { ApiService, BadgeService, DataService, IdentityService } from './services/mod.ts';

import { config } from './environment.ts';

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

const api = new ApiService();
const badger = new BadgeService();
const data = new DataService();
const identity = new IdentityService();

for await (const req of s) {
  // Separate query parameters
  const route = req.url.split("?");
  req.url = route[0];
  const params = new URLSearchParams(route[1]);

  // High-tech router module
  let id = identity.getAuthorization(getCookies(req)["token"]);
  switch (req.url) {
    case "/api/badges/create":
      if (!id) { req.respond({ status: 401 }); continue; }
      let badge = await data.createBadge(id, params.get("project") ?? "");
      if (!badge) { req.respond({ status: 400 }); continue; }
      req.respond({ body: JSON.stringify(badge), status: 200 });
      continue;

    case "/api/badges/update":
      if (!id) { req.respond({ status: 401 }); continue; }
      let updatedBadge = await data.updateBadge(id, params.get("project") ?? "",
        parseInt(params.get("id") ?? ""), params.get("key") ?? undefined, 
        params.get("val") ?? undefined, parseInt(params.get("keyW") ?? ""), 
        parseInt(params.get("valW") ?? ""));
      if (!updatedBadge) { req.respond({ status: 400 }); continue; }
      req.respond({ body: JSON.stringify(updatedBadge), status: 200 });
      continue;

    case "/api/badges/delete":
      if (!id) { req.respond({ status: 401 }); continue; }
      const projectId = params.get("project") ?? "";
      const badgeId = parseInt(params.get("id") ?? "");
      if (!projectId || !params.get("id")) { req.respond({ status: 400 }); continue; }
      await data.deleteBadge(id, projectId, badgeId);
      req.respond({ status: 204 });
      continue;

    case "/api/projects/create":
      if (!id) { req.respond({ status: 401 }); continue; }
      let project = await data.createProject(id, params.get("project") ?? "");
      if (!project) { req.respond({ status: 400 }); continue; }
      req.respond({ body: JSON.stringify(project), status: 200 });
      continue;

    case "/api/projects/delete":
      if (!id) { req.respond({ status: 401 }); continue; }
      if (!params.get("project")) { req.respond({ status: 400 }); continue; }
      await data.deleteProject(id, params.get("project") ?? "");
      req.respond({ status: 204 });
      continue;

    case "/api/user/data":
      if (!id) { req.respond({ status: 401 }); continue; }
      let userData = await data.getUserInfo(id);
      req.respond({ body: JSON.stringify(userData), status: 200 });
      continue;

    case "/api/user/welcome":
      if (!id) { req.respond({ status: 401 }); continue; }
      await data.setUserWelcomed(id);
      req.respond({ status: 204 });
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
      await data.ensureUser(uuid);

      req.respond({ 
        status: 302, 
        headers: new Headers({
          "Set-Cookie": `token=${token}; Max-Age=86400; SameSite=Strict; Path=/;`,
          "Location": "/dashboard"
        })
      });
      continue;

    case "/oauth/login":
      const cookies = getCookies(req);
      if (cookies["token"] && identity.isAuthorized(cookies["token"])) {
        req.respond({ 
          status: 302, 
          headers: new Headers({ "Location": "/dashboard" })
        });
      }
      else {
        const authUrl = "https://github.com/login/oauth/authorize";
        const authParams: string[][] = [
          ["client_id", config.client_id],
          ["redirect_uri", config.redirect_uri],
          ["state", "pog"]
        ];
        const authParamString = new URLSearchParams(authParams).toString();
        req.respond({ 
          status: 302, 
          headers: new Headers({ "Location": `${authUrl}?${authParamString}` })
        });
      }
      continue;

    case "/oauth/logout":
      req.respond({
        status: 302,
        headers: new Headers({
          "Set-Cookie": "token=; Path=/; Max-Age=0;",
          "Location": "/" 
        })
      });
      continue;

    case "/oauth/manage":
      req.respond({
        status: 302,
        headers: new Headers({ "Location": api.getManagementURL() })
      });
      continue;
    
    case "/dashboard":
      req.url = "app/dashboard.html";
      break;

    case "/":
      req.url = "app/index.html";
      break;

    default:
      // app folder is serve workspace
      req.url = `app${req.url}`;

      // Check if badge exists
      const badgeParams = req.url.split("/");
      if (badgeParams.length != 4) break;

      // Get, format, and return badge
      const badgeData = await data.getBadge(badgeParams[1], badgeParams[2], parseInt(badgeParams[3]));
      if (badgeData) {
        const badge = badger.badge(badgeData);
        req.respond({ 
          body: badge, 
          status: 200, 
          headers: new Headers({"Content-Type": "image/svg+xml"}) 
        });
        continue;
      }
  }

  // Check if file exists
  if (!(await exists(req.url))) {
    req.respond({ status: 404 });
    console.warn(`Resource Not Found: ${req.url}`);
    continue;
  }

  console.log(`Parse: ${route}`);

  const content = await Deno.readFile(req.url);
  let type = getMimeType(req.url);
  req.respond({ 
    body: content, 
    status: 200, 
    headers: new Headers({ "Content-Type": type })
  });
}

function getMimeType(url: string): string {
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