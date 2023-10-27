import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../constants/Theme";

export default function BirthdayNotification({ name, birthday, message }) {
  return (
    <View style={styles.container}>
      <FontAwesome name="birthday-cake" size={30} color="black" />

      <View>
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Place your logic here to send a message to Cara
            console.log("Message to Cara");
          }}
        >
          <Text style={styles.buttonText}>Send Message to {name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    width: "90%", // Adjust this to your desired width
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "PilcrowRounded",
  },
  button: {
    backgroundColor: colors.purple,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PilcrowRounded",
  },
});
