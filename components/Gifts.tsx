import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Gifts = ({ isExplore, favoriteGifts }) => {
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
    <View style={styles.exploreHeader}>
      <View style={styles.textRec}>
        <Text>Personalized Recommendations</Text>
      </View>
      <FontAwesome name="refresh" size={20} color="black" />
      <FontAwesome name="filter" size={20} color="black" />
    </View>
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
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
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
    fontSize: 12,
    textAlign: "left",
    marginBottom: 4,
  },
  giftPrice: {
    fontSize: 16,
    fontWeight: "bold",
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
});

export default Gifts;
