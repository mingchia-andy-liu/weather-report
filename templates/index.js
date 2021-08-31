import layout from "./layout";
import { pm25ToAqi, aqiToClass, uviToClass } from "../utils/aqi";
import { formatDate } from "../utils/date";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const fetchWeatherResponses = async cf => {
  return Promise.all([
    fetch(
      `${BASE_URL}/air_pollution?lat=${cf.latitude}&lon=${cf.longitude}&appid=${OPEN_WEATHER_API_KEY}`
    ).then(r => r.json()),
    fetch(
      `${BASE_URL}/onecall?lat=${cf.latitude}&lon=${cf.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    ).then(r => r.json()),
  ]);
};

const weatherTemplate = (data, cf) => {
  const { dt, temp, feels_like, uvi, pm2_5 } = data;
  const aqi = pm25ToAqi(pm2_5);
  const aqiColorClass = aqiToClass(aqi);
  const uviColorClass = uviToClass(uvi);

  return `
    <div>
      <h1 class="title is-1 has-text-white m-0">Your weather ☁️</h1>
      <h2 class="title is-4 has-text-white m-0">📍${cf.city} ${
    cf.country
  }</h2><span>${formatDate(dt * 1000)}</span>
    </div>

    <div>
      <div class="has-text-white temp">${temp}°C</div>
      <div class="has-text-white sub-temp">Feels like ${feels_like}°C</div>
    </div>

    <div>
      <div class="is-flex mb-3 is-flex-direction-row is-align-items-center">
        <span class="mr-3">Air Quality</span>
        <span class="aqi ${aqiColorClass}">${aqi}</span>
      </div>
      <div class="is-flex is-flex-direction-row is-align-items-center">
        <span class="mr-3">UV Index</span>
        <span class="aqi ${uviColorClass}">${uvi}</span>
      </div>
    </div>`;
};

const getData = async cf => {
  const key = getKey(cf.latitude, cf.longitude);
  const value = await WEATHER.get(key);
  if (value === null) {
    const responses = await fetchWeatherResponses(cf);
    const formatted = formatResponses(responses[1], responses[0]);
    await WEATHER.put(key, JSON.stringify(formatted), { expirationTtl: 300 });
    return formatted;
  }

  return JSON.parse(value);
};

const getKey = (lat, lon) =>
  `${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;

const formatResponses = (res1, res2) => {
  return {
    dt: res1.current.dt,
    temp: res1.current.temp,
    feels_like: res1.current.feels_like,
    uvi: res1.current.uvi,
    pm2_5: res2.list[0].components["pm2_5"],
  };
};

export default async cf => {
  const data = await getData(cf);
  return layout(`
    ${weatherTemplate(data, cf)}
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.purpleair.com/map?#12/${cf.latitude}/${cf.longitude}"
      >
        See AQIs on the map
      </a>.
      <a rel="noopener noreferrer" href="/search">Search location</a>
    </div>
  `);
};
