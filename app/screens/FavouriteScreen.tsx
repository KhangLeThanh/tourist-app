import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "../hooks/useFavorites";
import { globalStyles } from "../styles/globalStyles";

const FavouriteScreen: React.FC = () => {
  const { addItem, removeItem, favourites, loading } = useFavorites();

  console.log("test favourites", favourites);

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={globalStyles.card}>
                <View style={globalStyles.cardHeader}>
                  <Text style={globalStyles.name}>{item.name}</Text>
                  <MaterialIcons name={item.type} size={20} color="#f57c00" />
                </View>
                <Text style={globalStyles.address}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default FavouriteScreen;
