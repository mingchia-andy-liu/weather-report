import template from "../templates/index";

const headers = { "Content-Type": "text/html" };

export default async request => {
  try {
    return new Response(await template(request.cf), { headers });
  } catch (err) {
    return new Response();
  }
};
