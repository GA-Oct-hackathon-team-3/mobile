import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image, Touchable } from "react-native";
import Gifts from "./Gifts";
import { colors } from "../constants/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const ProfileContent = () => {
  const router = useRouter();
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
          <View style={styles.giftTypeSquare}>
            <Image
              source={require("../assets/images/experiences.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.lightText}>Experience</Text>
          </View>
          <View style={styles.giftTypeSquare}>
            <Image
              source={require("../assets/images/pinkpresent.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.lightText}>Presents</Text>
          </View>
          <View style={styles.giftTypeSquare}>
            <Image
              source={require("../assets/images/donations.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.lightText}>Presents</Text>
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        <View style={styles.giftTop}>
          <Text style={styles.text}>Selected Tags</Text>
          <TouchableOpacity onPress={() => router.push("/users/edit-tags")}>
            <Image
              source={require("../assets/images/pencil.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Text style={styles.selectTagText}>Reading</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.selectTagText}>Outdoor Activities</Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.selectTagText}>Arts and Crafts</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.selectTagText}>Games</Text>
          </View>
        </View>
      </View>

      <View style={styles.giftTypeContainer}>
        <Gifts isExplore={false} />
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
    backgroundColor: colors.cream,
    borderColor: "lightgray",
    borderWidth: 1,
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
