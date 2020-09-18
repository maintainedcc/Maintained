import { 
  exists, 
  getCookies, 
  serve 
} from "./deps.ts";

import { 
  AuthService, 
  BadgeService, 
  DataService, 
  IdentityService 
} from './services/mod.ts';

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

const api = new AuthService();
const badger = new BadgeService();
const data = new DataService();
const identity = new IdentityService();

for await (const req of s) {
  // Separate query parameters
  const route = req.url.split("?");
  req.url = route[0];
  const params = new URLSearchParams(route[1]);

  // High-tech router module
  // Also a massive high-tech mess

  // Identity-locked routes
  let id = identity.getAuthorization(getCookies(req)["token"]);
  // Automatic reauth attempt
  if (!id && getCookies(req)["token"]) {
    id = await api.getUserUUID(getCookies(req)["token"]);
    identity.authorizeToken(getCookies(req)["token"], id);
  }
  switch (req.url) {
    case "/api/badges/create": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      const p = { project: params.get("project") ?? "" }
      const badge = await data.createBadge(id, p.project);

      if (!badge) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(badge), status: 200 });
    })();
    continue;

    case "/api/badges/update": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      const p = {
        project: params.get("project") ?? "",
        bId: parseInt(params.get("id") ?? "-1"),
        key: params.get("key"),
        val: params.get("val"),
        keyW: parseInt(params.get("keyW") ?? ""),
        valW: parseInt(params.get("valW") ?? "")
      }
      const updBadge = await data.updateBadge(id, p.project, p.bId, p.key, p.val, p.keyW, p.valW);
      
      if (!updBadge) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(updBadge), status: 200 });
    })();
    continue;

    case "/api/badges/meta": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      const p = {
        project: params.get("project") ?? "",
        bId: parseInt(params.get("id") ?? "-1"),
        style: parseInt(params.get("style") ?? ""),
        titleColor: parseInt(params.get("colorRight") ?? ""),
        valueColor: parseInt(params.get("colorLeft") ?? ""),
        isMono: params.get("isMono") ?? ""
      }
      const updBadge = await data.updateBadgeMeta(id, p.project, p.bId, p.style, p.titleColor, p.valueColor, p.isMono);

      if (!updBadge) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(updBadge), status: 200 });
    })();
    continue;

    case "/api/badges/adv": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      const p = {
        project: params.get("project") ?? "",
        bId: parseInt(params.get("id") ?? ""),
        redirect: params.get("redirect"),
        valueSource: params.get("valueSource")
      }
      const updBadge = await data.updateBadgeAdv(id, p.project, p.bId, p.redirect, p.valueSource);

      if (!updBadge) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(updBadge), status: 200 });
    })();
    continue;

    case "/api/badges/delete": (async () => {
      if (!id) { req.respond({ status: 401 }); return }
      
      const p = {
        project: params.get("project") ?? "",
        bId: parseInt(params.get("id") ?? "")
      }
      if (!p.project || !p.bId) { req.respond({ status: 400 }); return }
      await data.deleteBadge(id, p.project, p.bId);

      req.respond({ status: 204 });
    })();
    continue;

    case "/api/projects/create": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      const p = { project: params.get("project") ?? "" }
      const project = await data.createProject(id, p.project);

      if (!project) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(project), status: 200 });
    })();
    continue;

    case "/api/projects/delete": (async () => {
      if (!id) { req.respond({ status: 401 }); return }
    
      const p = { project: params.get("project") ?? "" }
      if (!p.project) { req.respond({ status: 400 }); return }
      await data.deleteProject(id, p.project);

      req.respond({ status: 204 });
    })();
    continue;

    case "/api/user/data": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      const userData = await data.getUserInfo(id);

      req.respond({ body: JSON.stringify(userData), status: 200 });
    })();
    continue;

    case "/api/user/welcome": (async () => {
      if (!id) { req.respond({ status: 401 }); return }

      await data.setUserWelcomed(id);

      req.respond({ status: 204 });
    })();
    continue;
  }

  // Exposed routes
  switch (req.url) {
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
        req.respond({ 
          status: 302, 
          headers: new Headers({ "Location": api.getAuthURL() })
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
      // If unauthorized, redirect to the main page
      if (!id) {
        req.respond({
          status: 302,
          headers: new Headers({
            "Set-Cookie": "token=; Path=/; Max-Age=0;",
            "Location": "/" 
          })
        });
      }
      break;

    case "/":
      req.url = "app/index.html";
      break;

    default:
      // app folder is serve workspace
      req.url = `app${req.url}`;

      // Check if badge exists
      const badgeParams = req.url.split("/");
      if (badgeParams.length === 4) {
        // Get, format, and return badge
        const badgeData = await data.getBadge(badgeParams[1], badgeParams[2], parseInt(badgeParams[3]));
        if (badgeData) {
          const badge = await badger.badge(badgeData);
          req.respond({ 
            body: badge, 
            status: 200, 
            headers: new Headers({
              "Cache-Control": "no-store",
              "Content-Type": "image/svg+xml"
            }) 
          });
          continue;
        }
      }
      // Try and get the link redirect page
      else if (badgeParams.length === 5 && badgeParams[4] === "redirect") {
        req.url = "app/redirect.html";
      }
      // Get and return raw badge JSON
      else if (badgeParams.length === 5 && badgeParams[4] === "json") {
        const badgeData = await data.getBadge(badgeParams[1], badgeParams[2], parseInt(badgeParams[3]));
        if (badgeData) {
          req.respond({ 
            body: JSON.stringify(badgeData), 
            status: 200, 
            headers: new Headers({
              "Cache-Control": "no-store",
              "Content-Type": "application/json"
            })
          });
          continue;
        }
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

function decorator(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

class Class {
  @decorator(false)
  g(): void {
    console.log("run!");
  }
}