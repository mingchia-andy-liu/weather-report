// OpenWeather Icon List
// https://openweathermap.org/weather-conditions#How-to-get-icon-URL
const map = {
  // clear sky
  "01": { n: "🌚", d: "😎" },
  // 	few clouds
  "02": { n: "🌑", d: "🌤" },
  // scattered clouds
  "03": { n: "☁️", d: "☁️" },
  // 	broken clouds
  "04": { n: "⛅️", d: "⛅️" },
  // 	shower rain
  "09": { n: "🌧", d: "🌧" },
  // rain
  "10": { n: "🌦", d: "🌦" },
  // thunderstorm
  "11": { n: "⛈", d: "⛈" },
  // 	snow
  "13": { n: "❄️", d: "❄️" },
  // 	mist
  "50": { n: "🌫", d: "🌫" },
};

export const getEmoji = icon => {
  try {
    const weather = icon.substring(0, 2);
    const time = icon.substring(2);
    const emoji = map[weather][time];
    if (emoji == null) {
      return "☁️";
    }
    return emoji;
  } catch (error) {
    console.log("Invalid weather icon", icon);
    return "☁️";
  }
};
