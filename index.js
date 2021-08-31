import { Router } from "itty-router";
import index from "./handlers/index";
import { robotsTxt, siteMap } from "./handlers/seo";
import * as api from "./handlers/api";
import search from "./handlers/search"
import location from "./handlers/location"

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router
  .get("/robots.txt", robotsTxt)
  .get("/sitemap.xml", siteMap)
  .get("/api/location", api.search)
  .get("/location", location)
  .get("/search", search)
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
