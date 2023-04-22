import { fetchCoffeeApi } from "../../../lib/coffee-store";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;

    const responses = await fetchCoffeeApi(latLong, limit);
    res.status(200);
    res.json(responses);
  } catch (err) {
    console.error("There is an error", err);
    res.status(500);
    res.json({ message: "Oh no something went wrong", err });
  }
};

export default getCoffeeStoresByLocation;
