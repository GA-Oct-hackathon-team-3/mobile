import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../constants/Theme";

type Props = {
  handleDismissReminder: () => void;
};

function OnboardReminders({ handleDismissReminder }: Props) {
  return (
    <View style={styles.remindersContainer}>
      <View style={styles.peopleContainer}>
        <Image
          source={require("../assets/images/man.png")}
          style={{ width: 80, height: 180 }}
        />
        <Image
          source={require("../assets/images/woman.png")}
          style={{ width: 60, height: 160 }}
        />
      </View>

      <View style={styles.remindTextContainer}>
        <TouchableOpacity
          onPress={handleDismissReminder}
          style={styles.dismissCircle}
        >
          <Image
            source={require("../assets/images/close.png")}
            style={styles.close}
          />
        </TouchableOpacity>
        <Text style={styles.remindersText}>
          Your reminders will show up here!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  remindersContainer: {
    height: 130,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: colors.brightWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "visible",
    paddingTop: 12,
    marginTop: 12,
  },
  peopleContainer: {
    width: 100,
    overflow: "visible",
    flexDirection: "row",
    height: 200,
    marginTop: -20,
  },
  remindTextContainer: {
    width: 200,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 4,
  },
  remindersText: {
    fontFamily: "Helvetica Neue",
    fontSize: 24,
    paddingTop: 10,
    fontWeight: "300",
  },
  close: {
    height: 18,
    width: 18,
  },
  dismissCircle: {
    position: "absolute",
    top: -25,
    right: -12,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 20,
  },
});

export default OnboardReminders;
