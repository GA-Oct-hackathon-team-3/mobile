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

function isOddAndLast(index, length) {
  return index % 2 === 0 && index === length - 1;
}

interface GiftProps {
  gift: any;
  toggleFavorite: () => void;
  isFavorite: boolean;
  location: string;
  length: number;
  index: number;
}

const GiftItem = ({
  gift,
  toggleFavorite,
  isFavorite,
  location,
  length,
  index,
}: GiftProps) => {
  const [fillHeart, setFillHeart] = useState(isFavorite); // to toggle between empty or filled heart
  const image = gift.image ? gift.image : gift.ImgSrc;
  const needsMargin = isOddAndLast(index, length);
  return (
    <View style={[styles.itemContainer, { flex: needsMargin ? 0.42 : 1 }]}>
      <View>
        <Image
          source={{ uri: image }}
          alt={gift.imageSearchQuery}
          style={styles.giftImage}
        />
        <TouchableOpacity
          onPress={(e) => {
            toggleFavorite({ recommendation: gift });
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
      <Text style={styles.giftPrice}>{gift.estimatedCost}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 8,
    padding: 16,
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
