import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../api/favouriteApi";
import { PlaceType } from "../enum";

export type FavouriteItem = {
  id: string;
  name: string;
  address: string;
  type: PlaceType;
};
type FavouriteContextProps = {
  favourites: FavouriteItem[];
  loading: boolean;
  addItem: (item: FavouriteItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

const FavouriteContext = createContext<FavouriteContextProps | undefined>(
  undefined
);

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addItem = async ({ id, name, address, type }: FavouriteItem) => {
    setFavourites((prev) => [{ id, name, address, type }, ...prev]);
    try {
      await addFavourite(id, name, address, type);
    } catch (err) {
      console.error("Failed to remove favourite:", err);
    }
  };
  const removeItem = async (id: string) => {
    try {
      await removeFavourite(id);
      setFavourites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error("Failed to remove favourite:", err);
    }
  };
  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const data = await getFavourites();
        console.log("test data", data);
        setFavourites(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);
  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        loading,
        addItem,
        removeItem,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouriteProvider");
  }
  return context;
};
