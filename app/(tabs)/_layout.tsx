import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
        name="Accommodations"
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
