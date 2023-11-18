import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

type Props = {
  addPressed: () => void;
};

function AddBirthdayButton({ addPressed }: Props) {
  return (
    <TouchableOpacity
      onPress={addPressed}
      style={styles.floatingButtonContainer}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Image
          source={require("../assets/images/plus.png")}
          style={{ height: 24, width: 24 }}
        />
        <Text style={styles.addText}>Add Friend</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AddBirthdayButton;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: 120,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#53CF85",
    zIndex: 99,
  },
  addText: {
    color: "#FFF",
    fontFamily: "PilcrowRounded", // Make sure the font is set up in your project.
    fontSize: 16,
    fontStyle: "normal",
    // fontWeight: "700", // Adjust the fontFamily to specify weight if needed.
    lineHeight: 19, // Approximation based on "normal" in CSS.
    letterSpacing: 0.48,
  },
});
