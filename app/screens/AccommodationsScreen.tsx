import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import DropdownSuggestion from "../../components/DropdownSuggestion";
import ModalMap from "../../components/ModalMap";
import PlaceCard from "../../components/PlaceCard";
import { fetchPlaces, Place } from "../api/geoapify";
import { fetchLocationResult } from "../api/geoLocation";
import { useSearch } from "../context/SearchContext";
import { PlaceType } from "../enum";
import { useDebounce } from "../hooks/useDebounce";
import { globalStyles } from "../styles/globalStyles";

const [selectedAccomodation, setSelecteAccomodation] = useState<Place | null>(
  null
);
const AccommodationsScreen: React.FC = () => {
  const [accomodations, setAccomodations] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const { location, setSuggestions, selectedPlace } = useSearch();
  const debouncedQuery = useDebounce(location, 600);

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

      <DropdownSuggestion />
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <PlaceCard
          place={accomodations}
          setSelectedPlace={setSelecteAccomodation}
          typePlace={PlaceType.hotel}
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
