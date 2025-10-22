import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // hides the top header
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Restaurants",
          tabBarLabel: "Restaurants",
          tabBarIcon: ({ size }) => (
            <FontAwesome name="cutlery" color="#f57c00" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="accommodations"
        options={{
          title: "Accommodations",
          tabBarLabel: "Accommodations",
          tabBarIcon: ({ size }) => (
            <FontAwesome name="bed" color="#f57c00" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
