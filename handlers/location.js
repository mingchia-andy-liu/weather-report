import template from "../templates/location"

const headers = { "Content-Type": "text/html" };

export default async request => {
  try {
    const { searchParams, origin } = new URL(request.url)
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (lat == null || lon == null) {
      return Response.redirect(origin);
    }

    return new Response(await template(lat, lon, request.cf.city), { headers });
  } catch (err) {
    return new Response(err.toString(), { headers: { "Content-Type": "text/plain" } });
  }
};
