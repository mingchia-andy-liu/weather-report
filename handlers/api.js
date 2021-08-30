import template from "../templates/search"

const headers = {
  "Content-Type": "application/json"
};

const selfHeaders = {
  "User-Agent" : "andy@aliu.dev"
}

const baseUrl = 'https://nominatim.openstreetmap.org/search'

const getUrl = (term) => `${baseUrl}?q=${encodeURI(term)}&format=geojson&limit=1`;

const getData = (term) => {
  const url = getUrl(term);

  return fetch(url, { headers: selfHeaders }).then(res => res.json())
}

export const search = async request => {
  try {
    const { searchParams } = new URL(request.url)
    let searchTerm = searchParams.get('q')
    const data = await getData(searchTerm);
    const point = data.features[0].geometry.coordinates;
    return new Response(JSON.stringify({
      lon: point[0],
      lat: point[1]
    }), { headers });
  } catch (err) {
    return new Response();
  }
};
