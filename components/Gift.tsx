import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const GiftItem = ({ gift, toggleFavorite, isFavorite, location }) => {
  const [fillHeart, setFillHeart] = useState(isFavorite); // to toggle between empty or filled heart
  console.log("GIFT IMAGE", gift);
  return (
    <View style={styles.itemContainer}>
      <View>
        <Image
          source={{ uri: gift.imgSrc }}
          alt={gift.imageSearchQuery}
          style={styles.giftImage}
        />
        <TouchableOpacity
          onPress={(e) => {
            toggleFavorite(gift, e);
            setFillHeart(!fillHeart);
          }}
          style={{ position: "absolute", right: 40, bottom: 12 }}
        >
          {fillHeart ? (
            <FontAwesome name="heart" size={24} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="red" />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.giftName}>{gift.title}</Text>
      <Text style={styles.giftPrice}>${gift.estimatedCost}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default GiftItem;
