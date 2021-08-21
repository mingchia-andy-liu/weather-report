export default body =>
  `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Your local weather</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css" integrity="sha512-IgmDkwzs96t4SrChW29No3NXBIBv8baW490zk5aXvhCD8vuZM3yUSkbyTBcXohkySecyzIrUwiF/qV0cuPcL3Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
  html, body {
    font-family:sans-serif;
    background-color: #0a0a0a;
    color: #fff;
    font-size: 2.5vmin;
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
    font-size: 5rem;
  }
  .sub-temp {
    font-size: 2rem;
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
    font-size: 1rem;
    padding: 0.5em 0.75em;
    border-radius: 1em;
    font-weight: 700;
  }
  footer {
    font-size: 3.5vmin;
  }
  @media (max-aspect-ratio: 1/1 ) {
    body { font-size: 2.5vmax; }
  }
</style>
</head>
<body>
  <div id="main" class="section p-5">
    ${body}
    <footer>
      <div>Data from <a href="https://openweathermap.org/">OpenWeather</a>. Site by <a href=https://aliu.dev>Andy Liu</a>.
    </footer>
  </div>
</body>
</html>
`.trim();
