import React from "react";
import { View, Image } from "react-native";
import { colors } from "../constants/Theme";

const Header = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.cream,

        alignSelf: "center",
      }}
    >
      <Image
        source={require("../assets/images/Prently1.png")}
        style={{ width: 140, height: 60, marginTop: 40, resizeMode: "contain" }}
      />
    </View>
  );
};

export default Header;
