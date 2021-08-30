import layout from "./layout";

export default async cf => {
  return layout(`
    <div>
      <h1 class="title is-1 has-text-white m-0">Your weather ☁️</h1>
      <h2 class="title is-4 has-text-white m-0">Search a location</h2>
    </div>
    <div>
      <label for="site-search">Search the location:</label>
      <input placeholder="123 Monopoly Avenue" type="search" id="search-input" name="q" aria-label="Search through site content" maxlength="30" required>
      <button id="search-button">Search</button>
    </div>
  `, `
    <script>
      var buttonEl = document.querySelector('#search-button');
      var searchInputEl = document.querySelector('#search-input');
      var url = new URL(document.URL)
      buttonEl.addEventListener("click", (e) => {
        var searchTerm = searchInputEl.value.trim();
        console.log(searchTerm);
        console.log(url.origin + "/api/location?q=" + searchTerm)
        fetch(url.origin + "/api/location?q=" + searchTerm)
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            console.log(json);
          })
          .catch((e) => {
            console.log(e);
            // window.location.pathname = '/';
          })
      })
    </script>
  `);
};
