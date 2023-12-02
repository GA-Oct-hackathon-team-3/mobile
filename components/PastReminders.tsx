import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { colors } from "../constants/Theme";
type Props = {};

function PastReminders({}: Props) {
  const DATA = [
    {
      title: "This Week",
      data: ["1", "2"],
    },
    {
      title: "Past",
      data: ["1", "2"],
    },
  ];

  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item />}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={[styles.header, { paddingTop: title === "Past" ? 20 : 0 }]}
        >
          {title}
        </Text>
      )}
    />
  );
}

const Item = () => {
  const [checked, setChecked] = useState(false);
  const { width } = useWindowDimensions();

  const removeReminder = () => {
    console.log("remove");
  };
  return (
    <View style={{ width: width - 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: colors.brightWhite,
          padding: 10,
          alignItems: "center",
          marginTop: 10,
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: "10%",
        }}
      >
        <Image
          source={require("../assets/images/alex.jpg")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View>
          <Text style={styles.text}>Molly Rosenthal's</Text>
          <Text style={styles.text}>28th birthday</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: colors.pink,
              fontFamily: "PilcrowBold",
              fontSize: 32,
            }}
          >
            2
          </Text>
          <Text style={styles.text}>Days Left</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <TouchableOpacity
            onPress={() => setChecked(!checked)}
            style={
              checked
                ? {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.green,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }
                : {
                    height: 30,
                    width: 30,
                    backgroundColor: colors.brightWhite,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: 2,
                  }
            }
          >
            {checked ? (
              <FontAwesome name={"check"} size={20} color={"white"} />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.text}>Gift?</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={removeReminder}
        style={{
          position: "absolute",
          right: -10,
          top: 0,
          height: 20,
          width: 20,
          backgroundColor: colors.green,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          zIndex: 99,
        }}
      >
        <FontAwesome name={"close"} size={14} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontFamily: "PilcrowRounded",
    fontSize: 22,
  },
  title: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: "PilcrowRounded",
  },
});

export default PastReminders;
