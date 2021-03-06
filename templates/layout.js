export default (body, script) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Your local weather report: weather, AQI, UVI. 💨">
<meta property="og:title" content="Your local weather" key="og:title" />
<meta property="og:description" key="og:description" content="Your local weather report: weather, AQI, UVI. 💨" />
<meta property="og:image" key="og:image" content="https://weather.aliu.dev/static/og-image.png" />
<meta name="twitter:creator" key="twitter:creator" content="@andyliu__" />
<title>Your local weather</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☁️</text></svg>">
<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css" integrity="sha512-IgmDkwzs96t4SrChW29No3NXBIBv8baW490zk5aXvhCD8vuZM3yUSkbyTBcXohkySecyzIrUwiF/qV0cuPcL3Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<noscript>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css" integrity="sha512-IgmDkwzs96t4SrChW29No3NXBIBv8baW490zk5aXvhCD8vuZM3yUSkbyTBcXohkySecyzIrUwiF/qV0cuPcL3Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</noscript>
<style>
  html, body {
    font-family:sans-serif;
    background-color: #0a0a0a;
    color: #fff;
    font-size: 3vmin;
    text-align: center;
    height: 100%;
    width: 100%;
  }
  #main {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
  }
  .temp {
    font-size: 4rem;
  }
  .sub-temp {
    font-size: 1.5rem;
  }
  a {
    color: #8cc2dd;
  }
  .good {
    background-color: limegreen;
    color: black;
  }
  .fair {
    background-color: yellow;
    color: black;
  }
  .unhealthy-sensitive {
    background-color: orange;
    color: white;
  }
  .unhealthy {
    background-color: red;
    color: white;
  }
  .very-unhealthy {
    background-color: purple;
    color: white;
  }
  .hazardous {
    background-color: maroon;
    color: white;
  }
  .aqi {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: 1em;
    font-weight: 700;
  }
  @media (max-aspect-ratio: 1/1 ) {
    body { font-size: 2.5vmax; }
    aqi { font-size: 4vmax; }
  }
</style>
</head>
<body>
  <div id="main" class="section p-5">
    ${body}
    <footer class="is-flex-row">
      <div>
        Data from
        <a target="_blank" rel="noopener noreferrer" href="https://openweathermap.org/">OpenWeather</a>
        and
        <a target="_blank" rel="noopener noreferrer" href="https://nominatim.org/">Nominatim</a>.
      </div>
      <div>
        Site by <a target="_blank" rel="noopener noreferrer" href=https://aliu.dev>Andy Liu</a>.
      </div>
    </footer>
  ${script != null ? script : ""}
</body>
</html>
`.trim();
