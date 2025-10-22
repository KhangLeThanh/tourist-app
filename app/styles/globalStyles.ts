import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  icon: ViewStyle;
  suggestion: ViewStyle;
  placeItem: ViewStyle;
  placeName: TextStyle;
  name: TextStyle;
  address: TextStyle;
  item: ViewStyle;
  dropdown: ViewStyle;
}

export const globalStyles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    paddingRight: 35, // leave space for icon
  },
  icon: {
    position: "absolute",
    right: 10,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  placeItem: {
    marginTop: 10,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 6,
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 999,
    elevation: 5, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});
