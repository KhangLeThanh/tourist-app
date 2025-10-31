import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSearch } from "../app/context/SearchContext";
import { globalStyles } from "../app/styles/globalStyles";

const DropdownSuggestion: React.FC = () => {
  const { suggestions, setSuggestions, setSelectedPlace, setLocation } =
    useSearch();
  return (
    suggestions.length > 0 && (
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
                setLocation("");
              }}
            >
              <Text>{item.formatted}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  );
};

export default DropdownSuggestion;
