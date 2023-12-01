import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import TitleBack from "../TitleBack";
import { colors } from "../../constants/Theme";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

function EditReminders({}: Props) {
  const [frequency, setFrequency] = useState({
    yearly: false,
    monthly: false,
    weekly: false,
    daily: false,
  });
  const insets = useSafeAreaInsets();
  const data = [{ id: 1 }, { id: 2 }];

  const handleChange = (value: string) => {
    setFrequency({ ...frequency, [value]: !frequency[value] });
  };
  return (
    <View
      style={[
        { paddingTop: insets.top + 8, flexDirection: "column", gap: 12 },
        styles.container,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.brightWhite,
        }}
      >
        <TextInput
          placeholder="Search by name, date, month..."
          placeholderTextColor={"gray"}
          style={styles.input}
        />
      </View>
      <TitleBack title="Reminder Frequency" />
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          paddingLeft: 40,
          paddingTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange("yearly")}
            style={
              frequency.yearly
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
            {frequency.yearly ? (
              <FontAwesome name={"check"} size={20} color={"white"} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>Yearly</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange("monthly")}
            style={
              frequency.monthly
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
            {frequency.monthly ? (
              <FontAwesome name={"check"} size={20} color={"white"} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>Monthly</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange("weekly")}
            style={
              frequency.weekly
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
            {frequency.weekly ? (
              <FontAwesome name={"check"} size={20} color={"white"} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>Weekly</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity
            onPress={() => handleChange("daily")}
            style={
              frequency.daily
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
            {frequency.daily ? (
              <FontAwesome name={"check"} size={20} color={"white"} />
            ) : null}
          </TouchableOpacity>

          <Text style={styles.text}>Daily</Text>
        </View>
      </View>

      <View
        style={{
          paddingTop: 20,
        }}
      >
        <Text style={[{ alignSelf: "center" }, styles.text]}>
          Selected Friends
        </Text>
        <FlatList data={data} renderItem={({ item }) => <Item />} />
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "PilcrowMedium",

            textAlign: "center",
          }}
        >
          Update Preferences
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Item = ({ name, photo, birthday }) => {
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
        source={require("../../assets/images/alex.jpg")}
        style={{ height: 40, width: 40, borderRadius: 20 }}
      />

      <Text style={{ fontFamily: "PilcrowBold", fontSize: 16 }}>
        Alex Thomas{" "}
        <Text style={{ fontFamily: "PilcrowRounded", fontSize: 16 }}>
          | 10 OCTOBER 1987
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,

    backgroundColor: colors.brightWhite,
    borderRadius: 10,
    width: "100%",
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.cream,
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    height: 40,

    position: "absolute",
    left: 60,
    right: 60,
    bottom: 20,

    alignItems: "center", // Center children horizontally
    justifyContent: "center",
  },
  text: {
    fontFamily: "PilcrowRounded",
    fontSize: 16,
  },
});
export default EditReminders;
