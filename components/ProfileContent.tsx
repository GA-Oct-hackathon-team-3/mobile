import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Gifts from "./Gifts";

const ProfileContent = ({ giftPreferences, tags, favoriteGifts }) => {
  return (
    <View style={styles.container}>
      <View style={styles.giftTypeContainer}>
        {/* Gift Type Top */}
        <View style={styles.giftTop}>
          <Text>Gift Type</Text>
          <FontAwesome name="pencil" size={20} color="black" />
        </View>
        {/* Gift Type Bottom */}
        <View style={styles.giftSquareContainer}>
          <View style={styles.giftTypeSquare}>
            <FontAwesome name="music" size={34} color="black" />
            <Text>Experience</Text>
          </View>
          <View style={styles.giftTypeSquare}>
            <FontAwesome name="gift" size={34} color="black" />
            <Text>Presents</Text>
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        <View style={styles.giftTop}>
          <Text>Selected Tags</Text>
          <FontAwesome name="pencil" size={20} color="black" />
        </View>
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Text>Reading</Text>
          </View>
          <View style={styles.tag}>
            <Text>Outdoor Activities</Text>
          </View>

          <View style={styles.tag}>
            <Text>Arts and Crafts</Text>
          </View>
          <View style={styles.tag}>
            <Text>Games</Text>
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        <Gifts isExplore={false} favoriteGifts={favoriteGifts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 28,
  },
  giftTypeContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 150,
  },
  giftTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  giftTypeSquare: {
    backgroundColor: "lightgray",
    height: 80,
    width: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  giftSquareContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    gap: 20,
  },

  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 100,
    padding: 10,
    alignItems: "center",
    gap: 12,
  },
  tag: {
    flexDirection: "row",
    borderColor: "gray",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
  },
});

export default ProfileContent;
