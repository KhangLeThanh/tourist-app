import { useFavorites } from "@/app/context/FavouriteContext";
import { globalStyles } from "@/app/styles/globalStyles";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FavouriteScreen: React.FC = () => {
  const { removeItem, favourites, loading } = useFavorites();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Your Favourite List </Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : favourites ? (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={globalStyles.card}>
                <View style={globalStyles.cardHeader}>
                  <Text style={globalStyles.name}>{item.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name={item.type} size={20} color="#f57c00" />
                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <FontAwesome name="heart" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={globalStyles.address}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={globalStyles.name}>No favourites</Text>
      )}
    </View>
  );
};

export default FavouriteScreen;
