import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Touchable,
  FlatList,
  ScrollView,
} from "react-native";
import GiftItem from "./Gift";
import { colors } from "../constants/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter, useLocalSearchParams } from "expo-router";
import { capitalizeFirstLetter } from "../utilities/helpers";
const ProfileContent = ({
  giftPreferences,
  tags,
  favorites,
  user,
  toggleFavorite,
  friendLocation,
  isCurrUser = false,
}) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.giftTypeContainer}>
        <View style={styles.giftTop}>
          <Text style={styles.text}>Gift Type</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/users/${params.id}/update`,
                params: { isCurrUser: isCurrUser },
              })
            }
          >
            <Image
              source={require("../assets/images/pencil.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
        {/* Gift Type Bottom */}
        <View style={styles.giftSquareContainer}>
          <View
            style={[
              styles.giftTypeSquare,
              {
                backgroundColor: giftPreferences?.includes("experience")
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
                backgroundColor: giftPreferences?.includes("present")
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
                backgroundColor: giftPreferences?.includes("donation")
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
        {tags && tags.length > 0 ? (
          <ScrollView contentContainerStyle={styles.tagsSection}>
            {tags.map((tag, idx) => (
              <View style={styles.tag} key={idx}>
                <Text
                  key={idx}
                  style={{
                    fontFamily: "PilcrowMedium",
                    fontSize: 16,
                    color: colors.brightWhite,
                  }}
                >
                  {capitalizeFirstLetter(tag.title)}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 20,

              paddingHorizontal: 60,
              flexDirection: "row",
            }}
          >
            <FontAwesome name={"tag"} size={40} color={"lightgray"} />
            <Text style={styles.text}>
              Your friend doesn't have any tags. Click edit to add them.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.giftTypeContainer}>
        <View style={styles.giftTop}>
          <Text>Favorited Gifts</Text>
        </View>
        {favorites && favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <GiftItem
                gift={item}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
                location={friendLocation}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 20,

              paddingHorizontal: 60,
              flexDirection: "row",
            }}
          >
            <FontAwesome name={"heart"} size={40} color={"lightgray"} />
            <Text style={styles.text}>
              No favorites to display. Go to Explore Gifts tab to favorite
              gifts.{" "}
            </Text>
          </View>
        )}
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
