import React from "react";
import Filters from "../../../components/screens/Filters";
import { Stack } from "expo-router";
import Header from "../../../components/Header";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Filters",
          header: () => <Header />,
        }}
      />

      <Filters />
    </>
  );
};

export default Page;
