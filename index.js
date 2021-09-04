import { Router } from "itty-router";
import index from "./handlers/index";
import { robotsTxt, siteMap } from "./handlers/seo";
import * as api from "./handlers/api";
import search from "./handlers/search";
import location from "./handlers/location";
import image from "./handlers/image";
import { notFound, serverError } from "./handlers/error";

// Create a new router
const router = Router();

const cacheWrapper = fn => {
  return async request => {
    const cache = caches.default;
    const cacheResponse = await cache.match(request);
    if (cacheResponse) {
      return cacheResponse;
    }

    console.log("cache miss for", new URL(request.url).pathname);
    const response = await fn(request);
    await cache.put(request.clone(), response.clone());
    return response;
  };
};

const errorWrapper = fn => {
  return async request => {
    try {
      const response = await fn(request);
      return response;
    } catch (error) {
      return serverError();
    }
  };
};

/*
Our index route, a simple hello world.
*/
router
  .get("/robots.txt", robotsTxt)
  .get("/sitemap.xml", siteMap)
  .get("/api/location", api.search)
  .get("/location", errorWrapper(location))
  .get("/search", errorWrapper(search))
  .get("/static/*", errorWrapper(cacheWrapper(image)))
  .get("/", errorWrapper(index));

router.all("*", notFound);

addEventListener("fetch", e => {
  e.respondWith(router.handle(e.request));
});
