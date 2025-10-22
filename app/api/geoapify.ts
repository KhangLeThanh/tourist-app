import { API_KEY, BASE_URL } from "@/constants/baseApi";
import axios from "axios";

export type Place = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  address_line2: string;
};

export const fetchPlaces = async (
  lat: number,
  lon: number,
  radius: number = 5000
): Promise<Place[]> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/v2/places/?categories=catering.restaurant`,
      {
        params: {
          filter: `circle:${lon},${lat},${radius}`,
          apiKey: API_KEY,
        },
      }
    );

    // Map API response to Place[]
    return res.data.features.map((f: any) => ({
      id: f.properties.place_id,
      name: f.properties.name,
      lat: f.properties.lat,
      lon: f.properties.lon,
      address_line2: f.properties.address_line2,
    }));
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};
