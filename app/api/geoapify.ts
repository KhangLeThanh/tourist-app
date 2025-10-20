import axios from "axios";

const API_KEY = "5eb3504f5d724ff0b74858d692546cd1"; // replace with your key
const BASE_URL = "https://api.geoapify.com/v2/places";

export type Place = {
  id: string;
  name: string;
  categories: string;
  lat: number;
  lon: number;
};

/**
 * Fetch places from Geoapify
 * @param lat Latitude of center point
 * @param lon Longitude of center point
 * @param type Category (default "catering.restaurant")
 * @param radius Search radius in meters (default 5000)
 */
export const fetchPlaces = async (
  lat: number,
  lon: number,
  type: string = "catering.restaurant",
  radius: number = 5000
): Promise<Place[]> => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        categories: type,
        filter: `circle:${lon},${lat},${radius}`, // Geoapify: lon first
        apiKey: API_KEY,
      },
    });

    // Map API response to Place[]
    return res.data.features.map((f: any) => ({
      id: f.properties.place_id,
      name: f.properties.name,
      categories: f.properties.categories,
      lat: f.properties.lat,
      lon: f.properties.lon,
    }));
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};
