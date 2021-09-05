<div align="center">
  <image src="static/og-image.png" alt="Weather report" width="150px" />
  <h3><a href="https://weather.aliu.dev/">Weather report</a></h3>
  <em>Yet another weather report tool, powered by Cloudflare Workers.</em>
</div>

---

[![Hosted on Cloudflare Workers](https://img.shields.io/badge/Hosted%20on-CF%20Workers-f38020?logo=cloudflare&logoColor=f38020&labelColor=282d33)](https://weather.aliu.dev/)

## Weather report

It is another weather report tool for people (mainly me) to use. ¯\\\_(ツ)\_/¯.


The reports not only shows the weather but also the air quality. Forest fire has become a serious issue over past few years. I built this site to help me understand the air quality of the day. It evolved to allowing me to search for other cities.


The default location is an approximation based on your IP (thanks to Cloudflare 🎉). But you can also search for other cities/addresses.


The site built with [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler) and runs on [Cloudflare Workers](https://developers.cloudflare.com/workers/). [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler) is used to dev, build and publish the entire site. The data are from [OpenWeather](https://openweathermap.org/) and [Nominatim](https://nominatim.org/). 2 awesome open API projects for weather and geoencoding. Their responses are cached for 5 minutes using [Cloudflare Workers KV](https://developers.cloudflare.com/workers/runtime-apis/kv) so the site does not accidentally ddos the servers.


### Features 🚀

- Local weather report
- AQI + UV index
- Search other cities
- Redirect to view the AQI on the map


### Try it 🤖
Available at: https://weather.aliu.dev.
