import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { colors } from '../../constants/Theme';
import TitleBack from '../TitleBack';
import { Slider } from '@miblanchard/react-native-slider';
import { capitalizeFirstLetter } from './EditFriendProfile.web';
import { useUser } from '../providers/UserContext';

interface Filters {
  budget: number;
  tags: string[];
  giftType: string[];
}

const Filters = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [show, setShow] = useState('');
  const { bgColor } = useLocalSearchParams();
  const { user, fetchFriend } = useUser();
  const [sliderMarks, setSliderMarks] = useState([50, 250, 500, 750, 1000]);
  const [giftTypes, setGiftTypes] = useState([
    'Experience',
    'Present',
    'Donation',
  ]);
  const [filters, setFilters] = useState({
    budget: 0,
    tags: user.tags.map((tag : any) => tag.title),
    giftType: user.giftPreferences,
  });

  const handlePress = (section: string) => {
    if (show === section) {
      setShow('');
      return;
    }
    setShow(section);
  };

  const handleChangeTag = (tag: any) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t: any) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleChangeGiftType = (giftType: string) => {
    setFilters((prev) => ({
      ...prev,
      giftType: prev.giftType.includes(giftType)
        ? prev.giftType.filter((type: string) => type !== giftType)
        : [...prev.giftType, giftType],
    }));
  };

  const TopTrackMark = (index: any) => {
    const value = sliderMarks[index.index];

    return (
      <View style={{ paddingTop: 20 }}>
        <Text
          style={{ fontFamily: 'PilcrowBold', fontSize: 16, marginTop: 20 }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const handleClear = () => {
    setFilters({
      budget: 0,
      tags: user.tags.map((tag : any) => tag.title),
      giftType: user.giftPreferences,
    });
    setShow('');
  };

  const handleSave = () => {
    const budget = filters.budget.toString();
    const tags = filters.tags.join(',');
    const giftTypes = filters.giftType.join(',');

    router.push({
        pathname: `/users/${user._id}`, 
        params: { 
            budget,
            tags,
            giftTypes,
            bgColor
        }
    });
  }
  return (
    <View style={styles.container}>
      <TitleBack title="Filters" marginLeft={-80} paddingRight={100} />

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <View style={styles.filterContainer}>
          <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
            Budget
          </Text>
          <TouchableOpacity onPress={() => handlePress('budget')}>
            {show === 'budget' ? (
              <Image
                source={require('../../assets/images/minus.png')}
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require('../../assets/images/blackplus.png')}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === 'budget' && (
          <View style={styles.sliderContainer}>
            <View
              style={{
                width: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontFamily: 'PilcrowBold', fontSize: 20 }}>
                ${filters.budget}
              </Text>
            </View>
            <Slider
              maximumValue={1000}
              minimumValue={0}
              step={50}
              trackMarks={[50, 250, 500, 750, 1000]}
              trackStyle={{ width: '100%' }}
              value={filters.budget}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, budget: value[0] }))
              }
              renderTrackMarkComponent={(index) => (
                <TopTrackMark index={index} />
              )}
              thumbTintColor={colors.purple}
              minimumTrackTintColor={colors.purple}
            />
          </View>
        )}

        <View
          style={{
            height: 1,
            width: '80%',
            backgroundColor: 'black',
            alignSelf: 'center',
          }}
        ></View>

        <View style={styles.filterContainer}>
          <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
            Tags
          </Text>
          <TouchableOpacity onPress={() => handlePress('tags')}>
            {show === 'tags' ? (
              <Image
                source={require('../../assets/images/minus.png')}
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require('../../assets/images/blackplus.png')}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === 'tags' && (
          <ScrollView style={{ maxHeight: 200 }}>
            <View style={styles.tagsSection}>
              {user.tags.map((tag, idx) => (
                <TouchableOpacity
                  style={[
                    styles.tag,
                    {
                      backgroundColor: filters.tags.includes(tag.title)
                        ? colors.green
                        : 'lightgray',
                    },
                  ]}
                  key={idx}
                  onPress={() => handleChangeTag(tag.title)}
                >
                  <Text style={styles.selectTagText}>
                    {capitalizeFirstLetter(tag.title)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        <View
          style={{
            height: 1,
            width: '80%',
            backgroundColor: 'black',
            alignSelf: 'center',
          }}
        ></View>

        <View style={styles.filterContainer}>
          <Text style={{ fontFamily: 'PilcrowMedium', fontSize: 18 }}>
            Gift Type
          </Text>
          <TouchableOpacity onPress={() => handlePress('gifttype')}>
            {show === 'gifttype' ? (
              <Image
                source={require('../../assets/images/minus.png')}
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require('../../assets/images/blackplus.png')}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === 'gifttype' && (
          <View style={styles.tagsSection}>
            {giftTypes.map((giftType, idx) => (
              <TouchableOpacity
                style={[
                  styles.tag,
                  {
                    backgroundColor: filters.giftType.includes(
                      giftType.toLowerCase()
                    )
                      ? colors.green
                      : 'lightgray',
                  },
                ]}
                key={idx}
                onPress={() => handleChangeGiftType(giftType.toLowerCase())}
              >
                <Text style={styles.selectTagText}>{giftType}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View
          style={{
            height: 1,
            width: '80%',
            backgroundColor: 'black',
            alignSelf: 'center',
          }}
        ></View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleClear}>
          <View
            style={{
              width: width / 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.brightWhite,
              height: 60,
            }}
          >
            <Text
              style={{
                color: 'black',
                fontFamily: 'PilcrowBold',
                fontSize: 18,
              }}
            >
              CLEAR
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={filters.tags.length === 0}
        >
          <View
            style={{
              width: width / 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.green,
              height: 60,
            }}
          >
            <Text
              style={{
                color: colors.brightWhite,
                fontFamily: 'PilcrowBold',
                fontSize: 18,
              }}
            >
              SAVE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  sliderContainer: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
    paddingVertical: 20,
  },
  selectTagText: {
    fontSize: 16,
    fontFamily: 'PilcrowBold',
    color: colors.brightWhite,
  },
  unselectedTagText: {
    fontSize: 16,
    fontFamily: 'PilcrowBold',
    color: colors.brightWhite,
  },
  tag: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  unselectedTag: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingHorizontal: 40,
    alignItems: 'center',
    gap: 12,
    paddingBottom: 10,
  },
});

export default Filters;
