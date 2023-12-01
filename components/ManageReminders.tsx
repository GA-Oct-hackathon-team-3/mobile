import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  Image,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/Theme";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Time from "./Time";
type Props = {};

function ManageReminders({}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);

  const data = [{ id: 1 }, { id: 2 }];

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Text style={styles.text}>
        Choose the time you'd prefer to be reminded
      </Text>
      <Time />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 60,
          gap: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/sun.png")}
            style={{ width: 40, height: 40 }}
          />

          <Text style={{ fontFamily: "PilcrowBold", fontSize: 16 }}>AM</Text>
        </View>

        <Switch
          trackColor={{ false: colors.cream, true: colors.brightWhite }}
          thumbColor={isEnabled ? colors.purple : colors.green}
          onValueChange={toggleSwitch}
          style={{ backgroundColor: colors.brightWhite, borderRadius: 17 }}
          value={isEnabled}
        />

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/moon.png")}
            style={{ height: 40, width: 40 }}
          />

          <Text style={{ fontFamily: "PilcrowBold", fontSize: 16 }}>PM</Text>
        </View>
      </View>

      <Text style={styles.text}>
        Choose which friends you'd like to edit reminder notification
        preferences for:
      </Text>
      <FlatList data={data} renderItem={({ item }) => <Item />} />
    </View>
  );
}

const Item = ({ name, photo, birthday }) => {
  const [checked, setChecked] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: colors.brightWhite,
        paddingHorizontal: 20,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "lightgray",
        width: width - 40,
      }}
    >
      <Image
        source={require("../assets/images/alex.jpg")}
        style={{ height: 40, width: 40, borderRadius: 20 }}
      />

      <Text style={{ fontFamily: "PilcrowBold", fontSize: 16 }}>
        Alex Thomas{" "}
        <Text style={{ fontFamily: "PilcrowRounded", fontSize: 16 }}>
          | 10 OCTOBER 1987
        </Text>
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 16,
    fontFamily: "PilcrowRounded",
    textAlign: "center",
  },
});

export default ManageReminders;
