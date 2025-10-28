import { useState } from "react";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../api/favouriteApi";

export type FavouriteItem = {
  id: string;
  name: string;
  address: string;
  type: string;
};

export const useFavorites = () => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addItem = async ({ id, name, address, type }: FavouriteItem) => {
    try {
      const newFav = await addFavourite(id, name, address, type);
      setFavourites((prev) => [newFav, ...prev]);
    } catch (err) {
      console.error("Failed to remove favourite:", err);
    }
  };
  const removeItem = async (id: string) => {
    try {
      await removeFavourite(id);
    } catch (err) {
      setFavourites((prev) => prev.filter((fav) => fav.id !== id));

      console.error("Failed to remove favourite:", err);
    }
  };
  const getItems = async () => {
    setLoading(true);

    try {
      const data = await getFavourites();
      setFavourites(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  };
  return { addItem, removeItem, getItems, loading, favourites };
};
