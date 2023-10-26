import { Stack } from "expo-router";
import React from "react";
import LoginScreen from "../../components/LoginScreen";
import { View, Image } from "react-native";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LoginScreen />
    </>
  );
};

export default Page;
