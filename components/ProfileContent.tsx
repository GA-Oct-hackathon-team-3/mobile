import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image, Touchable } from "react-native";
import Gifts from "./Gifts";
import { colors } from "../constants/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter, useLocalSearchParams } from "expo-router";

const ProfileContent = ({ giftPreferences, tags, favoriteGifts, user }) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.giftTypeContainer}>
        {/* Gift Type Top */}
        <View style={styles.giftTop}>
          <Text style={styles.text}>Gift Type</Text>
          <Image
            source={require("../assets/images/pencil.png")}
            style={{ height: 20, width: 20 }}
          />
        </View>
        {/* Gift Type Bottom */}
        <View style={styles.giftSquareContainer}>
          <View
            style={[
              styles.giftTypeSquare,
              {
                backgroundColor: giftPreferences?.includes("Experience")
                  ? "lightgrey"
                  : "white",
              },
            ]}
          >
            <FontAwesome name="music" size={34} color="black" />
            <Text>Experience</Text>
          </View>
          <View
            style={[
              styles.giftTypeSquare,
              {
                backgroundColor: giftPreferences?.includes("Present")
                  ? "lightgrey"
                  : "white",
              },
            ]}
          >
            <FontAwesome name="gift" size={34} color="black" />
            <Text>Presents</Text>
          </View>
          <View
            style={[
              styles.giftTypeSquare,
              {
                backgroundColor: giftPreferences?.includes("Donation")
                  ? "lightgrey"
                  : "white",
              },
            ]}
          >
            <FontAwesome name="handshake-o" size={34} color="black" />
            <Text>Donations</Text>
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        <View style={styles.giftTop}>
          <Text style={styles.text}>Selected Tags</Text>
          <TouchableOpacity
            onPress={() =>
              router.push(
                `/users/${params.id ? params.id : user._id}/edit-tags`
              )
            }
          >
            <Image
              source={require("../assets/images/pencil.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tagsSection}>
          {tags && tags.length > 0 ? (
            tags.map((tag, idx) => (
              <View style={styles.tag} key={idx}>
                <Text key={idx}>{tag.title}</Text>
              </View>
            ))
          ) : (
            <View>
              <Text>
                Your friend doesn't have any tags. Click edit to add them.
              </Text>
            </View>
          )}
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
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 150,
    backgroundColor: colors.brightWhite,
  },
  giftTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  giftTypeSquare: {
    height: 80,
    width: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
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
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.green,
  },
  text: {
    fontFamily: "PilcrowMedium",
    fontSize: 16,
  },
  lightText: {
    fontFamily: "PilcrowRounded",
    fontSize: 16,
  },
  selectTagText: {
    fontSize: 16,
    fontFamily: "PilcrowBold",
    color: colors.brightWhite,
  },
});

export default ProfileContent;
