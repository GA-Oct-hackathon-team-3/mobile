import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DUMMY_PROFILE = {
  first_name: "Alex",
  last_name: "Turner",
  birthday: "1992-01-10",
  about:
    "A passionate developer who loves sushi, cheers for the 49ers, and spends weekends coding.",
  tags: ["Sushi Lover", "49ers Fan", "Programmer"],
  image: "https://via.placeholder.com/150", // A dummy image. Replace with a real one if needed.
};

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/images/alex.jpg")}
        style={styles.profileImage}
      />
      <Text style={styles.name}>
        {DUMMY_PROFILE.first_name} {DUMMY_PROFILE.last_name}
      </Text>
      <Text style={styles.birthday}>{DUMMY_PROFILE.birthday}</Text>
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About Me</Text>
        <Text style={styles.aboutText}>{DUMMY_PROFILE.about}</Text>
      </View>
      <View style={styles.tagsSection}>
        {DUMMY_PROFILE.tags.map((tag) => (
          <View style={styles.tag} key={tag}>
            <FontAwesome name="tag" size={16} color="white" />
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  birthday: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "gray",
  },
  aboutSection: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "purple",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    alignItems: "center",
  },
  tagText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
});
