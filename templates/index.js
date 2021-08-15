import layout from "./layout";
import { pm25ToAqi } from "../utils/aqi";
import { formatDate } from "../utils/date";

const weatherTemplate = async cf => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${cf.latitude}&lon=${cf.longitude}&appid=${OPEN_WEATHER_API_KEY}`
  );
  const json = await response.json();

  const pm25 = json.list[0].components['pm2_5'];
  const date = json.list[0].dt * 1000;

  return `<div class="is-primary">
     <strong>${pm25ToAqi(pm25)}</strong>
     <strong>${formatDate(date)}</strong>
   </div>`;
};

export default async cf => {
  return layout(`
    <div class="notification">
      ${await weatherTemplate(cf)}
      <div>📍 You are near ${cf.city}. <a href="https://www.purpleair.com/map?#12/${cf.latitude}/${cf.longitude}">See AQIs on the map</a>.</div>
      <footer>
        <div>Data from <a href="https://openweathermap.org/">OpenWeather</a>. Site by <a href=https://aliu.dev>Andy Liu</a>.
      </footer>
    </div>
  `);
};
