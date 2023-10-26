const DUMMY_PROFILE = {
  first_name: "Alex",
  last_name: "Turner",
  birthday: "1992-01-10",
  about:
    "A passionate developer who loves sushi, cheers for the 49ers, and spends weekends coding.",
  tags: ["Sushi Lover", "49ers Fan", "Programmer"],
  image: "https://via.placeholder.com/150", // A dummy image. Replace with a real one if needed.
};
// Import necessary components and libraries
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Gifts from "./Gifts";
import ProfileContent from "./ProfileContent";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function CurrentUserProfileScreen() {
  const [selected, setSelected] = useState("profile");

  const handleSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCover}></View>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/alex.jpg")}
          style={styles.avatar}
        />
        <Text>Anthony Sudol</Text>
        <Text>Friend</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDescription}>
          <Text style={{ color: "#804C46", fontWeight: "bold" }}>10</Text>
          <Text>January</Text>
        </View>
        <View
          style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
        ></View>
        <View style={styles.infoDescription}>
          <Text style={{ color: "#804C46", fontWeight: "bold" }}>180 </Text>
          <Text>Days left</Text>
        </View>
        <View
          style={{ height: 30, width: 1, backgroundColor: "lightgray" }}
        ></View>

        <View style={styles.infoDescription}>
          <Text style={{ color: "#804C46", fontWeight: "bold" }}>27</Text>
          <Text>Age</Text>
        </View>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          style={{ position: "relative", right: -40, top: 0 }}
        />
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("profile")}
        >
          <Text
            style={selected == "profile" ? styles.selected : styles.unselected}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("gifts")}
        >
          <Text
            style={selected == "profile" ? styles.unselected : styles.selected}
          >
            Explore Gifts
          </Text>
        </TouchableOpacity>
      </View>

      {selected == "profile" ? (
        <ScrollView>
          <ProfileContent />
        </ScrollView>
      ) : (
        <Gifts isExplore={true} />
      )}

      {/* You can add the "Favorited Gifts" section similarly */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFFF",
    paddingTop: 120,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginVertical: 10,
    paddingTop: 10,
  },
  giftType: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  infoDescription: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    color: "black",
    textDecorationLine: "underline",
  },

  unselected: {
    color: "gray",
  },
  backgroundCover: {
    position: "absolute",
    left: 0,
    height: 140,
    right: 0,
    top: 0,
    backgroundColor: "#F5F5F5",
  },
});
