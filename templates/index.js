import layout from "./layout";
import { pm25ToAqi, aqiToClass } from "../utils/aqi";
import { formatDate } from "../utils/date";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherResponses = async cf => {
  return Promise.all([
    fetch(
      `${BASE_URL}/air_pollution?lat=${cf.latitude}&lon=${cf.longitude}&appid=${OPEN_WEATHER_API_KEY}`
    ).then(r => r.json()),
    fetch(
      `${BASE_URL}/onecall?lat=${cf.latitude}&lon=${cf.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    ).then(r => r.json()),
  ]);
};

const weatherTemplate = (aqiJson, json, cf) => {
  const {
    current: {
      dt,
      sunrise,
      sunset,
      temp,
      feels_like,
      pressure,
      humidity,
      dew_point,
      uvi,
      clouds,
      visibility,
      wind_speed,
      wind_deg,
    },
  } = json;
  const pm25 = aqiJson.list[0].components["pm2_5"];
  const aqi = pm25ToAqi(pm25);
  const aqiColorClass = aqiToClass(aqi);

  return `
    <div>
      <h1 class="title is-1 has-text-white m-0">Your weather ☁️</h1>
      <h2 class="title is-4 has-text-white">📍${cf.city} ${
    cf.country
  }</h2><span>${formatDate(dt * 1000)}</span>
    </div>
    <div>
    <h5 class="title is-5 has-text-white m-0 temp">${temp}°C</h1>
    <div>Feels like ${feels_like}°C</div>
    </div>
    <div class="is-flex is-flex-direction-row is-align-items-center">
      <span class="mr-3">Air Quality</span>
      <span class="aqi ${aqiColorClass}">${aqi}</span>
    </div>
    <div>UV index ${uvi}</div>`;
};

export default async cf => {
  const responses = await weatherResponses(cf);
  return layout(`
    ${weatherTemplate(responses[0], responses[1], cf)}
    <div><a href="https://www.purpleair.com/map?#13/${cf.latitude}/${
    cf.longitude
  }">See AQIs on the map</a>.</div>
  `);
};
