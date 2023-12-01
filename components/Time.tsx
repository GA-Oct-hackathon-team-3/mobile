import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Theme";

type Props = {};

function Time({}: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View style={styles.slot}>
        <Text style={styles.number}>0</Text>
      </View>
      <View style={styles.slot}>
        <Text style={styles.number}>0</Text>
      </View>
      <Text style={styles.colon}>:</Text>

      <View style={styles.slot}>
        <Text style={styles.number}>0</Text>
      </View>
      <View style={styles.slot}>
        <Text style={styles.number}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: 40,
    width: 30,
    borderRadius: 12,
    borderColor: "lightgray",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
  },
  number: {
    color: colors.green,
    fontSize: 18,
    fontFamily: "PilcrowMedium",
    textAlign: "center",
  },
  colon: {
    color: colors.green,
    fontSize: 22,
    fontFamily: "PilcrowMedium",
    textAlign: "center",
  },
});

export default Time;
