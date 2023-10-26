import React from "react";
import SignupScreen from "../../components/SignUpScreen";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignupScreen />
    </>
  );
};

export default Page;
