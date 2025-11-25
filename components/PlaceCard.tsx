import { useFavorites } from "@/app/context/FavouriteContext";
import { globalStyles } from "@/app/styles/globalStyles";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Place } from "../app/api/geoapify";
import { PlaceType } from "../app/enum";

interface PlaceCardProps {
  place: Place[];
  typePlace: PlaceType;
  setSelectedPlace: (item: Place) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  setSelectedPlace,
  typePlace,
}) => {
  const { addItem, removeItem, favourites } = useFavorites();

  return (
    <FlatList
      data={place}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isFavorite = favourites.some((fav) => fav.id === item.id);
        return (
          <TouchableOpacity onPress={() => setSelectedPlace(item)}>
            <View style={globalStyles.card}>
              <View style={globalStyles.cardHeader}>
                <Text style={globalStyles.name}>{item.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name={typePlace} size={20} color="#f57c00" />

                  <TouchableOpacity
                    onPress={() =>
                      isFavorite
                        ? removeItem(item.id)
                        : addItem({
                            id: item.id,
                            name: item.name,
                            address: item.address_line2,
                            type: typePlace,
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
              </View>
              <Text style={globalStyles.address}>{item.address_line2}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
export default PlaceCard;
