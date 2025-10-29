import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#f57c00",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 70,
          paddingBottom: 10,
        },
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
      <Tabs.Screen
        name="Favourite"
        options={{
          title: "Favourite",
          tabBarLabel: "Favourite",
          tabBarIcon: ({ size }) => (
            <FontAwesome name="heart" color="#f57c00" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
