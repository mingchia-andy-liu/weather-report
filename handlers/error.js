import notFoundTemplate from "../templates/404";
import serverErrorTemplate from "../templates/500";

const headers = { "Content-Type": "text/html" };

export const notFound = () => {
  return new Response(notFoundTemplate(), { headers });
};

export const serverError = () => {
  return new Response(serverErrorTemplate(), { headers });
};
