import { BACKEND_URL } from "@/constants/baseApi";
import axios from "axios";

export const getFavourites = async () => {
  const res = await axios.get(BACKEND_URL);
  return res.data;
};

export const addFavourite = async (
  id: string,
  name: string,
  address: string,
  type: string
) => {
  const res = await axios.post(BACKEND_URL, { id, name, address, type });
  return res.data;
};

export const removeFavourite = async (id: string) => {
  const res = await axios.delete(`${BACKEND_URL}/${id}`);
  return res.data;
};
