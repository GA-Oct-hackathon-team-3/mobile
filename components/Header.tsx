import React from "react";
import { View, Image } from "react-native";
import { colors } from "../constants/Theme";

const Header = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.cream,

        alignSelf: "center",
      }}
    >
      <Image
        source={require("../assets/images/Prently1.png")}
        style={{ width: 200, height: 80, resizeMode: "contain" }}
      />
    </View>
  );
};

export default Header;
