import { Router } from "itty-router";
import index from "./handlers/index";
import { robotsTxt, siteMap } from "./handlers/seo";

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router
  .get("/robots.txt", robotsTxt)
  .get("/sitemap.xml", siteMap)
  .get("/", index);

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }));

addEventListener("fetch", e => {
  e.respondWith(router.handle(e.request));
});