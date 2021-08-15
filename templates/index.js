import layout from "./layout";

const dateFormat = submitted_at =>
  new Date(submitted_at).toLocaleDateString("en-us");

const weatherTemplate = async cf => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${cf.latitude}&lon=${cf.longitude}&appid=${OPEN_WEATHER_API_KEY}`
  );
  const json = await response.json();

  return `<div class="is-primary">
     <code>
     ${JSON.stringify(json)}
     </code>
   </div>`;
};

export default async cf => {
  return layout(`
    <div class="notification">
      Hello there, you are from ${cf.city} ${cf.country} ${cf.latitude} ${
    cf.longitude
  }
      ${await weatherTemplate(cf)}
    </div>
  `);
};
