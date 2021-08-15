import template from "../templates/index";

const headers = { "Content-Type": "text/html" };

export default async request => {
  const cache = caches.default;
  const cacheResponse = await cache.match(request, {});
  if (cacheResponse) {
    return cacheResponse;
  }
  try {
    const response = new Response(await template(request.cf), { headers });
    await cache.put(request.clone(), response.clone());
    return response;
  } catch (err) {
    return new Response();
  }
};
