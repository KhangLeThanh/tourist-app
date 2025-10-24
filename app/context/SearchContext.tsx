import React, { createContext, ReactNode, useContext, useState } from "react";
import { LocationSuggestion } from "../api/geoLocation";

type SearchContextProps = {
  location: string;
  setLocation: (location: string) => void;
  clearSearch: () => void;
  suggestions: LocationSuggestion[];
  setSuggestions: (item: LocationSuggestion[]) => void;
  selectedPlace: LocationSuggestion | undefined;
  setSelectedPlace: (place?: LocationSuggestion) => void;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<LocationSuggestion>();
  const clearSearch = () => {
    setLocation("");
    setSelectedPlace(undefined);
    setSuggestions([]);
  };
  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        clearSearch,
        selectedPlace,
        setSelectedPlace,
        suggestions,
        setSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
