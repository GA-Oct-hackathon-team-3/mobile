import React from "react";
import LandingPage from "../../components/LandingPage";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LandingPage />
    </>
  );
};

export default Page;
