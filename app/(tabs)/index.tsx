import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "react-native";
import MainScreen from "../../components/MainScreen";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <>
      <MainScreen />
      <TouchableOpacity
        onPress={() => router.push("/add-friend")}
        style={styles.floatingButtonContainer}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <FontAwesome name="plus" size={20} color="white" />
          <Text style={styles.addText}>Add Friend</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  addText: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0.48,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 120,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#53CF85",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
});
