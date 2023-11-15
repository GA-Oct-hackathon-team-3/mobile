import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/Theme";
import { useLocalSearchParams, useRouter } from "expo-router";

interface GiftProps {
  isExplore: boolean;
}

interface GiftItemProps {
  item: {
    gift_name: string;
    gift_price: string | number;
    id: string;
  };
}

const Gifts = ({ isExplore, favoriteGifts, isEnabled }) => {
  const GiftItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Image
          source={item.image}
          alt={item.imageSearchQuery}
          style={styles.giftImage}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 40, bottom: 12 }}
        >
          <FontAwesome name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.giftName}>{item.title}</Text>
      <Text style={styles.giftPrice}>${item.estimatedCost}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isExplore ? (
        <>
          <View style={styles.exploreHeader}>
            <View style={styles.textRec}>
              <Text>Personalized Recommendations</Text>
            </View>
            <FontAwesome name="refresh" size={20} color="black" />
            <FontAwesome name="filter" size={20} color="black" />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 20,
              height: 400,
              paddingTop: 40,
              paddingHorizontal: 40,
            }}
          >
            <FontAwesome name={"tags"} size={60} color={"lightgray"} />
            <Text style={styles.text}>
              Add tags to get personalized gift recommendations
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.giftTop}>
          <Text>Favorited Gifts</Text>
          <FontAwesome name="pencil" size={20} color="black" />
          {favoriteGifts && favoriteGifts.length > 0 ? (
            <FlatList
              data={favoriteGifts}
              renderItem={({ item }) => <GiftItem item={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          ) : (
            <View style={styles.giftTop}>
              <Text>No favorites</Text>
              <FontAwesome name="pencil" size={20} color="black" />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderRadius: 10,
    paddingTop: 10,
    // backgroundColor: colors.cream,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 8,
    padding: 16,
    flex: 1, // This ensures the items take up equal space
    flexDirection: "column", // stack children vertically
    // alignItems: "center", // align items in the center horizontally
  },
  giftImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  giftName: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 4,
    fontFamily: "PilcrowRounded",
  },
  giftPrice: {
    fontSize: 16,
    fontFamily: "PilcrowBold",
    textAlign: "left",
  },
  exploreHeader: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  textRec: {
    maxWidth: 120,
  },
  giftTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  text: {
    fontFamily: "PilcrowMedium",
    fontSize: 16,
  },
  headerText: {
    fontFamily: "PilcrowMedium",
    fontSize: 16,
  },
});

export default Gifts;
