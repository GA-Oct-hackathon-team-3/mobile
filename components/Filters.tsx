import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { colors } from "../constants/Theme";
import TitleBack from "./TitleBack";
import { FontAwesome } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
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

  const handlePress = (string) => {
    if (show === string) {
      setShow(null);
      return;
    }
    setShow(string);
  };

  function valuetext(value) {
    console.log(value);
    return `${value}°C`;
  }
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
            <Image
              source={require("../assets/images/blackplus.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
        </View>

        {show === "budget" && (
          <Slider
            maximumValue={17}
            minimumValue={0}
            step={1}
            trackMarks={[50, 250, 500, 750, 1000]}
          />
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
              <FontAwesome name="minus" size={20} color="black" />
            ) : (
              <Image
                source={require("../assets/images/blackplus.png")}
                style={{ height: 30, width: 30 }}
              />
            )}
          </TouchableOpacity>
        </View>

        {show === "tags" && (
          <View style={styles.tagsSection}>
            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Reading</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Outdoor Activities</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Arts and Crafts</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Games</Text>
            </View>
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
            Gift Type
          </Text>
          <TouchableOpacity onPress={() => handlePress("gifttype")}>
            <Image
              source={require("../assets/images/blackplus.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
        </View>

        {show === "gifttype" && (
          <View style={styles.tagsSection}>
            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Experience</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Present</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.selectTagText}>Donation</Text>
            </View>
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
        <TouchableOpacity>
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
  tag: {
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.green,
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 100,
    paddingHorizontal: 40,
    alignItems: "center",
    gap: 12,
  },
});

export default Filters;
