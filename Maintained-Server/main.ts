
import {
  config,
  exists, 
  getCookies, 
  serve 
} from "./deps.ts";

import { 
  AuthService, 
  BadgeService, 
  DataService
} from './services/mod.ts';

const s = serve({ port: config.port });
console.log(`http://localhost:${config.port}/`);

const auth = new AuthService();
const badger = new BadgeService();
const data = new DataService();

for await (const req of s) {
  // Separate query parameters
  const route = req.url.split("?");
  req.url = route[0];
  const params = new URLSearchParams(route[1]);

  // Exposed routes
  switch (req.url) {
    case "/oauth/callback": (async () => {
      const code = params.get("code") ?? "";
      const state = params.get("state") ?? "";

      if (!code || state != "pog") {
        req.respond({ status: 400 });
        return;
      }
      
      const token = await auth.getAccessToken(code, state);
      const uuid = await auth.authorizeToken(token);
      await data.ensureUser(uuid);

      req.respond({ 
        status: 302, 
        headers: new Headers({
          "Set-Cookie": `token=${token}; Max-Age=864000; SameSite=Strict; Path=/;`,
          "Location": "/dashboard"
        })
      });
    })();
    continue;

    case "/oauth/login": (async () => {
      const cookies = getCookies(req);
      if (cookies["token"] && auth.isAuthorized(cookies["token"])) {
        req.respond({ 
          status: 302, 
          headers: new Headers({ "Location": "/dashboard" })
        });
      }
      else {
        req.respond({ 
          status: 302, 
          headers: new Headers({ "Location": auth.getAuthURL() })
        });
      }
    })();
    continue;

    case "/oauth/logout": (async () => {
      req.respond({
        status: 302,
        headers: new Headers({
          "Set-Cookie": "token=; Path=/; Max-Age=0;",
          "Location": "/" 
        })
      });
    })();
    continue;

    case "/oauth/manage": (async () => {
      req.respond({
        status: 302,
        headers: new Headers({ "Location": auth.getManagementURL() })
      });
    })();
    continue;
      
    // Load the main file (Angular will sort routing)
    case "/dashboard":
      req.url = "index.html";
      break;

    // Alias for root (Angular app)
    case "/start":
      req.url = "index.html";
      break;

    // Root start page
    case "/":
      req.url = "index.html";
      break;

    default:
      // Check if badge exists
      const badgeParams = req.url.split("/");
      if (badgeParams.length === 4) {
        // Get, format, and return badge
        const badgeData = await data.getBadge(badgeParams[1], badgeParams[2], parseInt(badgeParams[3]));
        if (badgeData) {
          const badge = await badger.generate(badgeData);
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
        req.url = "redirect.html";
      }
      // Get and return raw badge JSON
      else if (badgeParams.length === 5 && badgeParams[4] === "json") {
        const badgeData = await data.getBadge(badgeParams[1], badgeParams[2], parseInt(badgeParams[3]));
        if (badgeData) {
          req.respond({
            body: JSON.stringify(badgeData), 
            status: 200, 
            headers: new Headers({
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-store",
              "Content-Type": "application/json"
            })
          });
          continue;
        }
      }
  }

  // Serve /app folder files (exposed)
  const serveURL = `app/${req.url}`;
  if (await exists(serveURL)) {
    let type = getMimeType(serveURL);
    req.respond({ 
      body: await Deno.readFile(serveURL), 
      status: 200, 
      headers: new Headers({ "Content-Type": type })
    });
    continue;
  }

  // Identity-locked routes
  // It's possible to reject the user at this point
  // because there is no more content to serve past this.
  let id = await auth.authorizeToken(getCookies(req)["token"]);
  if (!id) { req.respond({ status: 401 }); continue; }
  switch (req.url) {
    case "/api/badges/create": (async () => {
      const p = { project: params.get("project") ?? "" }
      const badge = await data.createBadge(id, p.project);

      if (!badge) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(badge), status: 200 });
    })();
    continue;

    case "/api/badges/update": (async () => {
      const p = { project: params.get("project") ?? "" };
      const body = await Deno.readAll(req.body);
      const badge = JSON.parse(new TextDecoder("utf8").decode(body));
      const updBadge = await data.updateBadge(id, p.project, badge);
      
      if (!updBadge) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(updBadge), status: 200 });
    })();
    continue;

    case "/api/badges/delete": (async () => {
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
      const p = { project: params.get("project") ?? "" }
      const project = await data.createProject(id, p.project);

      if (!project) { req.respond({ status: 400 }); return }
      req.respond({ body: JSON.stringify(project), status: 200 });
    })();
    continue;

    case "/api/projects/delete": (async () => {
      const p = { project: params.get("project") ?? "" }
      if (!p.project) { req.respond({ status: 400 }); return }
      await data.deleteProject(id, p.project);

      req.respond({ status: 204 });
    })();
    continue;

    case "/api/user/data": (async () => {
      const userData = await data.getUserInfo(id);

      req.respond({ body: JSON.stringify(userData), status: 200 });
    })();
    continue;

    case "/api/user/welcome": (async () => {
      await data.setUserWelcomed(id);

      req.respond({ status: 204 });
    })();
    continue;
  }

  // Last-case 404 to terminate connection (performance)
  // Happens only if all other blocks above fall through.
  req.respond({ status: 404 });
}

function getMimeType(url: string): string {
  const splitUrl = url.split('.');
  switch (splitUrl[splitUrl.length - 1]) {
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
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