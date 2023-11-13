import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import * as friendsService from "../utilities/friends-service";

import GiftItem from "./Gift";
import { useRecommendation } from "./RecommendationContext";

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

const Explore = ({
  enableRecs,
  toggleFavorite,
  giftPreferences,
  tags,
  id,
  friend,
  friendLocation,
}) => {
  const router = useRouter();

  const { cache, updateCache } = useRecommendation();

  const [recs, setRecs] = useState([]);
  const [isRecommending, setIsRecommending] = useState(false);
  const [showError, setShowError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filteredGiftTypes, setFilteredGiftTypes] = useState(giftPreferences);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      const requestBody = {
        giftTypes: filteredGiftTypes,
        tags: filteredTags,
      };
      if (budget) requestBody.budget = budget;
      setIsRecommending(true);
      try {
        const recom = await friendsService.getRecommendations(id, requestBody);
        console.log(recom);
        setRefresh(false);
        setRecs(recom.recommendations);
        updateCache(id, recom.recommendations);
        setIsRecommending(false);
        setShowError(false);
      } catch (error) {
        setShowError(true);
        setIsRecommending(false);
        setRefresh(false);
      }
    };

    if (enableRecs && (!recs.length || refresh)) {
      if (!refresh) {
        if (cache[id] && cache[id].length) setRecs(cache[id]);
        else getRecommendations();
      } else {
        getRecommendations();
      }
    }
  }, [
    enableRecs,
    filteredGiftTypes,
    filteredTags,
    recs.length,
    id,
    refresh,
    budget,
    giftPreferences,
    tags,
    cache,
    updateCache,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.exploreHeader}>
        <View style={styles.textRec}>
          <Text>Personalized Recommendations</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="refresh" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`/users/${friend._id}/filters`)}
        >
          <FontAwesome name="filter" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        {!showError ? (
          <>
            {refresh || (!recs.length && tags.length) ? (
              <View>
                <FontAwesome name="refresh" size={30} color={colors.purple} />
              </View>
            ) : (
              <FlatList
                data={recs}
                renderItem={({ item }) => (
                  <GiftItem
                    gift={item}
                    toggleFavorite={toggleFavorite}
                    isFavorite={false}
                    location={friendLocation}
                  />
                )}
                keyExtractor={(item, idx) => idx.toString()}
                numColumns={2}
              />
            )}
          </>
        ) : (
          <View>
            <Text>
              It appears our servers are too busy, try again in a few seconds
            </Text>
          </View>
        )}
        {!enableRecs && (
          <View>
            <Text>Add tags to get personalized gift recommendations</Text>
          </View>
        )}
      </View>
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
