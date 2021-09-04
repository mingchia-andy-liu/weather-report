import template from "../templates/index";

const headers = { "Content-Type": "text/html" };

export default async request => {
  return new Response(await template(request.cf), { headers });
};
