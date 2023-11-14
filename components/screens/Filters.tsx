import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { colors } from "../../constants/Theme";
import TitleBack from "../TitleBack";
import { Slider } from "@miblanchard/react-native-slider";
import { useLocalSearchParams } from "expo-router";
import { capitalizeFirstLetter } from "./EditFriendProfile.web";
import * as friendsService from "../../utilities/friends-service";

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 250,
    label: "$250",
  },
  {
    value: 500,
    label: "$500",
  },
  {
    value: 750,
    label: "$750",
  },
  {
    value: 1000,
    label: "$1000",
  },
];

const Filters = () => {
  const { width } = useWindowDimensions();
  const [show, setShow] = useState(null);

  const { id } = useLocalSearchParams();

  const [filters, setFilters] = useState({
    budget: "",
    tags: { selected: [], unselected: [] },
    giftType: [],
  });

  const [selectedGiftTypes, setSelectedGiftTypes] = useState([]);
  const [unselectedGiftTypes, setUnselectedGiftTypes] = useState([]);
  const [giftTypes, setGiftTypes] = useState([
    "Experience",
    "Present",
    "Donation",
  ]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [unselectedTags, setUnselectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [budget, setBudget] = useState(0);
  const [sliderMarks, setSliderMarks] = useState([50, 250, 500, 750, 1000]);

  useEffect(() => {
    fetchTags();
  }, []);

  const handlePress = (string) => {
    if (show === string) {
      setShow(null);
      return;
    }
    setShow(string);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const fetchTags = async () => {
    let friendData = await friendsService.retrieveFriend(id);

    setSelectedTags(
      friendData.tags.map((tag) => capitalizeFirstLetter(tag.title))
    );

    setTags(friendData.tags.map((tag) => capitalizeFirstLetter(tag.title)));

    setSelectedGiftTypes(
      friendData.giftPreferences.map((gift) => capitalizeFirstLetter(gift))
    );
  };

  const handleRemoveGiftType = (giftType) => {
    let newGiftTypes = filters.giftType.filter((t) => t !== giftType);
    setFilters({ ...filters, giftType: newGiftTypes });
  };

  const handleAddTag = (tag) => {
    setUnselectedTags((prev) => prev.filter((t) => t !== tag));
    setSelectedTags((prev) => [...prev, tag]);
  };

  const handleChangeTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
      setUnselectedTags((prev) => [...prev, tag]);
    } else {
      setUnselectedTags((prev) => prev.filter((t) => t !== tag));
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleChangeGiftType = (giftType) => {
    if (selectedGiftTypes.includes(giftType)) {
      setSelectedGiftTypes((prev) => prev.filter((t) => t !== giftType));
    } else {
      setSelectedGiftTypes((prev) => [...prev, giftType]);
    }
  };

  const TopTrackMark = (index) => {
    const value = sliderMarks[index];

    return (
      <View style={{ paddingTop: 20 }}>
        <Text
          style={{ fontFamily: "PilcrowBold", fontSize: 16, marginTop: 20 }}
        >
          {sliderMarks[index.index]}
        </Text>
      </View>
    );
  };

  useEffect(() => {}, [budget]);

  const handleClear = () => {
    setFilters({ budget: "", tags: [], giftType: [] });
    setShow(null);
  };
  return (
    <View style={styles.container}>
      <TitleBack title="Filters" marginLeft={-80} paddingRight={100} />

      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={styles.filterContainer}>
          <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
            Budget
          </Text>
          <TouchableOpacity onPress={() => handlePress("budget")}>
            {show === "budget" ? (
              <Image
                source={require("../../assets/images/minus.png")}
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require("../../assets/images/blackplus.png")}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === "budget" && (
          <View style={styles.sliderContainer}>
            <View
              style={{
                width: "auto",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontFamily: "PilcrowBold", fontSize: 20 }}>
                ${budget}
              </Text>
            </View>
            <Slider
              maximumValue={1000}
              minimumValue={0}
              step={50}
              trackMarks={[50, 250, 500, 750, 1000]}
              trackStyle={{ width: "100%" }}
              value={budget}
              onValueChange={(value) => setBudget(value)}
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
            width: "80%",
            backgroundColor: "black",
            alignSelf: "center",
          }}
        ></View>

        <View style={styles.filterContainer}>
          <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
            Tags
          </Text>
          <TouchableOpacity onPress={() => handlePress("tags")}>
            {show === "tags" ? (
              <Image
                source={require("../../assets/images/minus.png")}
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require("../../assets/images/blackplus.png")}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === "tags" && (
          <ScrollView style={{ maxHeight: 200 }}>
            <View style={styles.tagsSection}>
              {tags.map((tag, idx) => (
                <TouchableOpacity
                  style={[
                    styles.tag,
                    {
                      backgroundColor: selectedTags.includes(tag)
                        ? colors.green
                        : "lightgray",
                    },
                  ]}
                  key={idx}
                  onPress={() => handleChangeTag(tag)}
                >
                  <Text style={styles.selectTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "black",
            alignSelf: "center",
          }}
        ></View>

        <View style={styles.filterContainer}>
          <Text style={{ fontFamily: "PilcrowMedium", fontSize: 18 }}>
            Gift Type
          </Text>
          <TouchableOpacity onPress={() => handlePress("gifttype")}>
            {show === "gifttype" ? (
              <Image
                source={require("../../assets/images/minus.png")}
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require("../../assets/images/blackplus.png")}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === "gifttype" && (
          <View style={styles.tagsSection}>
            {giftTypes.map((giftType, idx) => (
              <TouchableOpacity
                style={[
                  styles.tag,
                  {
                    backgroundColor: selectedGiftTypes.includes(giftType)
                      ? colors.green
                      : "lightgray",
                  },
                ]}
                key={idx}
                onPress={() => handleChangeGiftType(giftType)}
              >
                <Text style={styles.selectTagText}>{giftType}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "black",
            alignSelf: "center",
          }}
        ></View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={handleClear}>
          <View
            style={{
              width: width / 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.brightWhite,
              height: 60,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "PilcrowBold",
                fontSize: 18,
              }}
            >
              CLEAR
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              width: width / 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.green,
              height: 60,
            }}
          >
            <Text
              style={{
                color: colors.brightWhite,
                fontFamily: "PilcrowBold",
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
    alignItems: "stretch",
    justifyContent: "center",
    paddingBottom: 30,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
    paddingVertical: 20,
  },
  selectTagText: {
    fontSize: 16,
    fontFamily: "PilcrowBold",
    color: colors.brightWhite,
  },
  unselectedTagText: {
    fontSize: 16,
    fontFamily: "PilcrowBold",
    color: colors.brightWhite,
  },
  tag: {
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.green,
  },
  unselectedTag: {
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",

    paddingHorizontal: 40,
    alignItems: "center",
    gap: 12,
    paddingBottom: 10,
  },
});

export default Filters;
