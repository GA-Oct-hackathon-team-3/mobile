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
import { useRouter } from "expo-router";

const giftData = {
  gifts: [
    {
      id: "1",
      gift_name: "Handmade Leather Wallet",
      gift_price: "50.00",
      gift_image: "wallet",
    },
    {
      id: "2",
      gift_name: "Artisan Chocolate Box",
      gift_price: "30.00",
      gift_image: "chocolate",
    },
    {
      id: "3",
      gift_name: "Vintage Pendant Necklace",
      gift_price: "40.00",
      gift_image: "necklace",
    },
    {
      id: "4",
      gift_name: "Customized Mug",
      gift_price: "15.00",
      gift_image: "mug",
    },
    {
      id: "5",
      gift_name: "Decorative Candle Set",
      gift_price: "25.00",
      gift_image: "url/to/candle_set_image.jpg",
    },
    // ... (continue in the same pattern)
    {
      id: "29",
      gift_name: "Gourmet Coffee Beans",
      gift_price: "20.00",
      gift_image: "url/to/coffee_beans_image.jpg",
    },
    {
      id: "30",
      gift_name: "Luxury Bathrobe",
      gift_price: "80.00",
      gift_image: "url/to/bathrobe_image.jpg",
    },
    {
      id: "31",
      gift_name: "Luxury Bathrobe",
      gift_price: "80.00",
      gift_image: "url/to/bathrobe_image.jpg",
    },
  ],
};

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

const Gifts = ({ isExplore }: GiftProps) => {
  const router = useRouter();
  const GiftItem = ({ item }: GiftItemProps) => (
    <View style={styles.itemContainer}>
      <View>
        <Image
          source={require(`../assets/images/wallet.jpg`)}
          style={styles.giftImage}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 40, bottom: 12 }}
        >
          <FontAwesome name="heart-o" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.giftName}>{item.gift_name}</Text>
      <Text style={styles.giftPrice}>${item.gift_price}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.brightWhite }]}>
      {isExplore ? (
        <View style={styles.exploreHeader}>
          <View style={styles.textRec}>
            <Text style={styles.headerText}>Personalized Recommendations</Text>
          </View>
          <TouchableOpacity>
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 2 }}
            >
              <Image
                source={require("../assets/images/refresh.png")}
                style={{ height: 20, width: 20 }}
              />
              <Text style={{ fontFamily: "PilcrowRounded" }}>Refresh</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/filters")}>
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 2 }}
            >
              <Image
                source={require("../assets/images/filter1.png")}
                style={{ height: 20, width: 20 }}
              />
              <Text style={{ fontFamily: "PilcrowRounded" }}>Filter</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.giftTop}>
          <Text style={styles.text}>Favorited Gifts</Text>
          {isExplore ? (
            <Image
              source={require("../assets/images/pencil.png")}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <View></View>
          )}
        </View>
      )}
      <FlatList
        data={giftData.gifts}
        renderItem={({ item }) => <GiftItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
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
