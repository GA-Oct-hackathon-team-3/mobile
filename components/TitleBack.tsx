import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";

const TitleBack = ({ title }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "center", width: width }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={require("../assets/images/arrow-left.png")}
          style={{ height: 24, width: 24, left: -40 }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
    </View>
  );
};

export default TitleBack;
