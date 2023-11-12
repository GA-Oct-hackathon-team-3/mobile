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

import GiftItem from './Gift';

interface Explore {
  isExplore: boolean;
}

interface GiftItemProps {
  item: {
    gift_name: string;
    gift_price: string | number;
    id: string;
  };
}


const Explore = ({ enableRecs, favorites, toggleFavorite }) => {

  return (
<View style={styles.container}>
    <View style={styles.exploreHeader}>
      <View style={styles.textRec}>
        <Text>Personalized Recommendations</Text>
        {enableRecs ? 'recommendations go here'
        // <FlatList
        //   data={}
        //   renderItem={({ item }) => <GiftItem item={item} />}
        //   keyExtractor={(item) => item.id}
        //   numColumns={2}
        // /> 
        : (
            <Text>Add tags to get personalized gift recommendations</Text>
        )}
      </View>
      <FontAwesome name="refresh" size={20} color="black" />
      <FontAwesome name="filter" size={20} color="black" />
    </View>
    </View>
)
}

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

export default Explore;
