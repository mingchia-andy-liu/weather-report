import layout from "./layout";
import { pm25ToAqi, aqiToClass, uviToClass } from "../utils/aqi";
import { formatDate } from "../utils/date";
import { getEmoji } from "../utils/emoji";
import { getKey, formatResponses } from "../utils/responses";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_STREET_BASE_URL = "https://nominatim.openstreetmap.org";

const fetchWeatherResponses = async (lat, lon) => {
  return Promise.all([
    fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
    ).then(r => r.json()),
    fetch(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    ).then(r => r.json()),
  ]);
};

const selfHeaders = {
  "User-Agent": "andy@aliu.dev",
};

const getUrl = (lat, lon) =>
  `${OPEN_STREET_BASE_URL}/reverse?format=geojson&lat=${encodeURI(
    lat
  )}&lon=${encodeURI(lon)}&zoom=10`;

const weatherTemplate = (data, city) => {
  const { dt, temp, feels_like, uvi, pm2_5, icon, timezone } = data;
  const aqi = pm25ToAqi(pm2_5);
  const aqiColorClass = aqiToClass(aqi);
  const uviColorClass = uviToClass(uvi);
  const cityHeader = city
    ? `<h2 class="title is-4 has-text-white m-0">📍${city} </h2>`
    : "";

  return `
    <div>
      <h1 class="title is-1 has-text-white m-0">Your weather ${getEmoji(
        icon
      )}</h1>
      ${cityHeader}
      <span>@ ${formatDate(dt * 1000, timezone)}</span>
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

const getData = async (lat, lon) => {
  const key = getKey(lat, lon);
  const value = await WEATHER.get(key);
  if (value === null) {
    const responses = await fetchWeatherResponses(lat, lon);
    const formatted = formatResponses(responses[1], responses[0]);
    await WEATHER.put(key, JSON.stringify(formatted), { expirationTtl: 300 });
    return formatted;
  }

  return JSON.parse(value);
};

const getCity = async (lat, lon) => {
  const key = getKey(lat, lon);
  const value = await CITY.get(key);
  if (value === null) {
    const cityRes = await fetch(getUrl(lat, lon), { headers: selfHeaders });
    const cityJson = await cityRes.json();
    const feature = cityJson.features[0].properties;
    const name = feature ? feature.name : null;
    const admin = feature && feature.geocoding ? feature.geocoding.admin : null;
    const city = name ? name : admin ? admin[admin.length - 1] : null;
    if (city == null) {
      return null;
    }

    await CITY.put(key, city, { expirationTtl: 3600 });
    return city;
  }

  return value;
};

export default async (lat, lon, originCity) => {
  const data = await getData(lat, lon);
  const city = await getCity(lat, lon);
  return layout(`
    ${weatherTemplate(data, city)}
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.purpleair.com/map?#12/${lat}/${lon}"
      >
        🗺 See AQIs on the map
      </a>.
      <a href="/">Go back ${originCity}.</a>
    </div>
  `);
};
