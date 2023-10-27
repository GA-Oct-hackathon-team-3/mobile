import React from "react";
import Filters from "../components/Filters";
import { Stack } from "expo-router";
import Header from "../components/Header";

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
      {/* <View style={{ height: 40, backgroundColor: colors.cream }}></View> */}
      {/* <Header /> */}

      <Filters />
    </>
  );
};

export default Page;
