import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ({ hour, minutes, onChange = () => null }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.clockText}>
          {hour < 10 ? "0" + hour : hour}:
          {minutes < 10 ? "0" + minutes : minutes}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={getDate(hour, minutes)}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={(e, date) => {
            setShowPicker(false);
            onChange(date.getHours(), date.getMinutes());
          }}
        />
      )}
    </>
  );
}

function getDate(hour, minutes) {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minutes);
  return date;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 300,
    backgroundColor: "white",
    borderWidth: 2,
  },
  clockText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 70,
  },
});
