import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { fetchPlaces, Place } from "../api/geoapify";
import { fetchLocationResult, LocationSuggestion } from "../api/geoLocation";
import { useDebounce } from "../hooks/useDebounce";
import { globalStyles } from "../styles/globalStyles";

const HomeScreen: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<LocationSuggestion>();
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebounce(location, 600);

  const handleSearch = async (text: string) => {
    setLocation(text);
  };
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

      if (selectedPlaces) {
        const data = await fetchPlaces(selectedPlaces.lat, selectedPlaces.lon);
        setRestaurants(data);
      }
      setLoading(false);
    };
    loadRestaurances();
  }, [selectedPlaces]);
  const clearSearch = () => {
    setLocation("");
    setSuggestions([]);
    setSelectedPlaces(undefined);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Find Restaurants</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter area or city name"
          value={location}
          onChangeText={handleSearch}
        />
        {location.length > 0 && (
          <TouchableOpacity style={globalStyles.icon} onPress={clearSearch}>
            <MaterialIcons name="close" size={24} color="#555" />
          </TouchableOpacity>
        )}
      </View>
      {suggestions.length > 0 && (
        <View style={globalStyles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={globalStyles.suggestion}
                onPress={() => {
                  setSelectedPlaces(item);
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
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={globalStyles.item}>
              <Text style={globalStyles.name}>{item.name}</Text>
              <Text style={globalStyles.address}>{item.address_line2}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
