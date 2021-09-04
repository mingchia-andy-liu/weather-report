import ogImageBase64 from "../static/og-image.base64";

const headers = {
  "Content-Type": "image/png",
  "Cache-Control": "max-age=2419200, public",
};

const imageMap = {
  "og-image.png": Buffer.from(ogImageBase64, "base64"),
};

export default request => {
  const url = new URL(request.url);
  const fileName = url.pathname.substring(8);
  if (imageMap[fileName] != null) {
    return new Response(imageMap[fileName], { headers });
  } else {
    return new Response("Not found.", { status: 404 });
  }
};
