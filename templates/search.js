import layout from "./layout";

export default async cf => {
  return layout(
    `
    <div>
      <h1 class="title is-1 has-text-white m-0">Your weather ☁️</h1>
      <h2 class="title is-4 has-text-white m-0">Search a location</h2>
    </div>
    <div>
      <label for="site-search">Search the location:</label>
      <input placeholder="123 Main Avenue" type="search" id="search-input" name="q" aria-label="Search through site content" maxlength="30" required>
      <button id="search-button">Search</button>
      <span id="warning" style="display: none;">Cannot find the location. Please try a different address.</span>
    </div>
    <div>
      <a href="/">Go back to ${cf.city}.</a>
    </div>
  `,
    `
    <script>
      var buttonEl = document.querySelector('#search-button');
      var searchInputEl = document.querySelector('#search-input');
      var warningEl = document.querySelector('#warning');
      var url = new URL(document.URL);
      searchInputEl.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
          buttonEl.click();
        }
      });
      buttonEl.addEventListener("click", (e) => {
        var searchTerm = searchInputEl.value.trim();
        buttonEl.disabled = true;
        buttonEl.textContent = "Loading...";
        warningEl.style.display = "none";
        fetch(url.origin + "/api/location?q=" + searchTerm)
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("lat", json.lat);
            searchParams.set("lon", json.lon);
            var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
            window.history.replaceState({}, null, refresh);
            window.location.pathname = "/location";
          })
          .catch((e) => {
            buttonEl.disabled = false;
            buttonEl.textContent = "Search";
            searchInputEl.value = "";
            warningEl.style.display = "block";
          });
      });
    </script>
  `
  );
};
