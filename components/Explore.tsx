import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as friendsService from '../utilities/friends-service';

import GiftItem from './Gift';
import { useRecommendation } from './providers/RecommendationContext';
import GiftItemSkeleton from './skeletons/GiftItemSkeleton';
import { colors } from '../constants/Theme';

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

  const getRecommendations = async () => {
    const requestBody = {
      giftTypes: filteredGiftTypes,
      tags: filteredTags,
    };
    if (budget) requestBody.budget = budget;
    setIsRecommending(true);
    try {
      const recom = await friendsService.getRecommendations(id, requestBody);
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

  useEffect(() => {
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
        <TouchableOpacity onPress={getRecommendations} disabled={!enableRecs || isRecommending}>
          <FontAwesome name="refresh" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`/users/${friend._id}/filters`)}
          disabled={!enableRecs || isRecommending}
        >
          <FontAwesome name="filter" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        {!showError ? (
          <>
            {refresh || (!recs.length && tags.length) ? (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <GiftItemSkeleton />
                  <GiftItemSkeleton />
                </View>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <GiftItemSkeleton />
                  <GiftItemSkeleton />
                </View>
              </View>
            ) : (
              <FlatList
                data={recs}
                renderItem={({ item, index }) => (
                  <GiftItem
                    gift={{ ...item, image: item.imgSrc }}
                    toggleFavorite={toggleFavorite}
                    isFavorite={false}
                    location={friendLocation}
                    index={index}
                    length={recs.length}
                  />
                )}
                keyExtractor={(item, idx) => idx.toString()}
                numColumns={2}
              />
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
              height: 400,
              paddingTop: 40,
              paddingHorizontal: 40,
            }}
          >
            <FontAwesome
              name={'exclamation-triangle'}
              size={60}
              color={colors.green}
            />
            <Text style={styles.text}>
              It appears our servers are too busy, try again in a few seconds
            </Text>
          </View>
        )}
        {!enableRecs && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 20,
              height: 400,
              paddingTop: 40,
              paddingHorizontal: 40,
            }}
          >
            <FontAwesome name={'tags'} size={60} color={'lightgray'} />
            <Text style={styles.text}>
              Add tags to get personalized gift recommendations
            </Text>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreHeader: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  textRec: {
    maxWidth: 120,
  },
  giftTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  text: {
    fontFamily: 'PilcrowRounded',
    fontSize: 18,
  },
  headerText: {
    fontFamily: 'PilcrowMedium',
    fontSize: 16,
  },
});

export default Explore;
