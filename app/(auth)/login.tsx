import { Stack } from "expo-router";
import React from "react";
import LoginScreen from "../../components/screens/LoginScreen";

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
