import SearchBar from "@/components/SearchBar";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModalMap from "../../components/ModalMap";
import { fetchPlaces, Place } from "../api/geoapify";
import { fetchLocationResult } from "../api/geoLocation";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import { useFavorites } from "../hooks/useFavorites";
import { globalStyles } from "../styles/globalStyles";
const [selectedAccomodation, setSelecteAccomodation] = useState<Place | null>(
  null
);
const AccommodationsScreen: React.FC = () => {
  const [accomodations, setAccomodations] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    location,
    suggestions,
    setSuggestions,
    selectedPlace,
    setSelectedPlace,
  } = useSearch();
  const debouncedQuery = useDebounce(location, 600);
  const { addItem, removeItem, favourites } = useFavorites();

  useEffect(() => {
    const fetchLocation = async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }
      const results = await fetchLocationResult(debouncedQuery);
      setSuggestions(results);
    };
    fetchLocation();
  }, [debouncedQuery]);
  useEffect(() => {
    const loadRestaurances = async () => {
      setLoading(true);

      if (selectedPlace) {
        const data = await fetchPlaces(
          selectedPlace.lat,
          selectedPlace.lon,
          "accommodation.hotel"
        );
        setAccomodations(data);
      }
      setLoading(false);
    };
    loadRestaurances();
  }, [selectedPlace]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Find accomodations</Text>
      <SearchBar />

      {suggestions.length > 0 && (
        <View style={globalStyles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={globalStyles.suggestion}
                onPress={() => {
                  setSelectedPlace(item);
                  setSuggestions([]);
                }}
              >
                <Text>{item.formatted}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={accomodations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isFavorite = favourites.some((fav) => fav.id === item.id);
            return (
              <TouchableOpacity onPress={() => setSelecteAccomodation(item)}>
                <View style={globalStyles.card}>
                  <View style={globalStyles.cardHeader}>
                    <Text style={globalStyles.name}>{item.name}</Text>
                    <MaterialIcons name="bed" size={20} color="#f57c00" />
                    <TouchableOpacity
                      onPress={() =>
                        isFavorite
                          ? removeItem(item.id)
                          : addItem({
                              id: item.id,
                              name: item.name,
                              address: item.address_line2,
                              type: "accomodation",
                            })
                      }
                      style={{ marginLeft: 10 }}
                    >
                      <FontAwesome
                        name={isFavorite ? "heart" : "heart-o"}
                        size={20}
                        color={isFavorite ? "red" : "#555"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={globalStyles.address}>{item.address_line2}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <ModalMap
        item={selectedAccomodation}
        onClose={() => setSelecteAccomodation(null)}
      />
    </View>
  );
};

export default AccommodationsScreen;
