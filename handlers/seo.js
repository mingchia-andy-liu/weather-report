const plainHeaders = { "Content-Type": "text/plain" };
const xmlHeaders = { "Content-Type": "text/xml; charset=utf-8" };

const lastModifyDate = new Date(2021, 7, 21);

const robotsTxtBody = `
User-Agent: *
Sitemap: https://weather.aliu.dev/sitemap.xml
`.trim();

const siteMapBody = () => {
  return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <url>
        <loc>https://weather.aliu.dev/</loc>
        <lastmod>${lastModifyDate.toISOString()}</lastmod>
      </url>
    </urlset>`;
};

export const robotsTxt = () => {
  return new Response(robotsTxtBody, { headers: plainHeaders });
};

export const siteMap = () => {
  return new Response(siteMapBody(), { headers: xmlHeaders });
};
