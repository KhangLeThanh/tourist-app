import { API_KEY, BASE_URL } from "@/constants/baseApi";
import axios from "axios";

export type LocationSuggestion = {
  id: string;
  formatted: string;
  lat: number;
  lon: number;
};

export const fetchLocationResult = async (
  location: string
): Promise<LocationSuggestion[]> => {
  if (!location) return [];

  try {
    const res = await axios.get(`${BASE_URL}/v1/geocode/search`, {
      params: {
        text: location,
        apiKey: API_KEY,
        limit: 5,
      },
    });

    // Map API response to Place[]
    return res.data.features.map((f: any) => ({
      id: f.properties.place_id,
      lat: f.properties.lat,
      lon: f.properties.lon,
      formatted: f.properties.formatted,
    }));
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};
