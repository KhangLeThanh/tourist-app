import React from "react";
import { Button, Modal, Platform, Text, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import { Place } from "../app/api/geoapify";

type ModalMapProps = {
  item: Place | null;
  onClose: () => void;
};

const ModalMap: React.FC<ModalMapProps> = ({ item, onClose }) => {
  if (!item) return null;
  if (Platform.OS === "web") {
    return (
      <View
        style={{ height: 200, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Map is only available on mobile devices.</Text>
      </View>
    );
  }
  return (
    <Modal visible={!!item} style={{ margin: 0 }} animationType="slide">
      <View style={{ flex: 1 }}>
        {/* <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: item.lat,
            longitude: item.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: item.lat,
              longitude: item.lon,
            }}
            title={item.name}
            description={item.address_line2}
          />
        </MapView> */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.address_line2}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
export default ModalMap;
