import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export const formatDate = (ms, timeZone) => {
  const dt = new Intl.DateTimeFormat("default", {
    timeZone: timeZone,
    timeStyle: "short",
  }).format(ms);
  const ago = formatDistanceToNowStrict(ms) + " ago";
  return `${dt} - ${ago}`;
};
