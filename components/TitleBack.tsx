import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";

const TitleBack = ({ title, marginLeft, paddingRight, fetchFriend = null }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const backPressed = () => {
    if (fetchFriend) {
      fetchFriend();
    }
    router.back();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        width: width,
        paddingRight: paddingRight ? paddingRight : 0,
      }}
    >
      <TouchableOpacity onPress={backPressed}>
        <Image
          source={require("../assets/images/arrow-left.png")}
          style={{
            height: 24,
            width: 24,
            left: marginLeft ? marginLeft : -40,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "PilcrowMedium",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TitleBack;
