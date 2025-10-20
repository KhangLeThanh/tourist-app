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
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cutlery" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="accommodations"
        options={{
          title: "Accommodations",
          tabBarLabel: "Accommodations",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bed" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
