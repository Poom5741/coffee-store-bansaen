import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrl = (LatLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${LatLong}&limit=${limit}`;
};

const getListOfCoffeeStore = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",

    perPage: 30,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeApi = async (
  latLong = "13.277243%2C100.921738",
  limit = 6
) => {
  const photos = await getListOfCoffeeStore();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQURE_API_KEY,
    },
  };

  const response = await fetch(getUrl(latLong, "coffee", limit), options);
  const data = await response.json();
  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      address: result.location.formatted_address,

      name: result.name,
      locality: result.location.country,
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
};
