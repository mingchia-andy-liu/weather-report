export const getKey = (lat, lon) =>
  `${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;

export const formatResponses = (res1, res2) => {
  return {
    dt: res1.current.dt,
    temp: res1.current.temp,
    feels_like: res1.current.feels_like,
    uvi: res1.current.uvi,
    pm2_5: res2.list[0].components["pm2_5"],
    icon: res1.current.weather[0].icon,
    timezone: res1.timezone,
  };
};
