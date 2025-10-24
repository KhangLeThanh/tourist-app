import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSearch } from "../app/context/SearchContext";
import { globalStyles } from "../app/styles/globalStyles";

const SearchBar: React.FC = () => {
  const { location, setLocation, clearSearch } = useSearch();
  return (
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
  );
};

export default SearchBar;
