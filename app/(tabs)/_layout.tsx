import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabsLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Restaurants",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesome
                  name="cutlery"
                  size={size}
                  color={focused ? "#f57c00" : "#000"}
                />
                <Text
                  style={{ fontSize: 12, color: focused ? "#f57c00" : "#000" }}
                >
                  Restaurants
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="Accommodations"
          options={{
            headerShown: false,
            title: "Accommodations",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesome
                  name="bed"
                  size={size}
                  color={focused ? "#f57c00" : "#000"}
                />
                <Text
                  style={{ fontSize: 12, color: focused ? "#f57c00" : "#000" }}
                >
                  Accommodations
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="Favourite"
          options={{
            headerShown: false,
            title: "Favourite",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesome
                  name="heart"
                  size={size}
                  color={focused ? "#f57c00" : "#000"}
                />
                <Text
                  style={{ fontSize: 12, color: focused ? "#f57c00" : "#000" }}
                >
                  Favourite
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
