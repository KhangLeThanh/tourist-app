import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSearch } from "../app/context/SearchContext";
import { globalStyles } from "../app/styles/globalStyles";

const SearchBar: React.FC = () => {
  const { selectedPlace, location, setLocation, clearSearch } = useSearch();
  return (
    <View>
      {selectedPlace && (
        <Text style={globalStyles.name}>
          You select: {selectedPlace.formatted}
        </Text>
      )}
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter area or city name"
          value={location}
          onChangeText={setLocation}
        />
        {location.length > 0 && (
          <TouchableOpacity style={globalStyles.icon} onPress={clearSearch}>
            <MaterialIcons name="close" size={24} color="#555" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
