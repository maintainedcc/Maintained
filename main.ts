import { serve } from "https://deno.land/std@0.63.0/http/server.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const req of s) {
  const decoder = new TextDecoder("utf-8");

  // Root index or parse as relative URL
  if (req.url === "/") {
    req.url = "index.html";
  }
  else if (!req.url.startsWith(".")) {
    req.url = `.${req.url}`;
  }

  // Check if file exists
  if (!(await exists(req.url))) {
    req.respond({ status: 404 });
    console.warn(`URL Not Found: ${req.url}`);
    continue;
  }

  console.log(`Parse: ${req.url}`);

  const content = decoder.decode(await Deno.readFile(req.url));

  req.respond({ body: content });
}