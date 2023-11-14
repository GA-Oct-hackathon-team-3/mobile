import React from "react";
import AddTags from "../../../components/screens/AddTags";
import { Stack } from "expo-router";
import Header from "../../../components/Header";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Add Tags",
          header: () => <Header />,
        }}
      />

      <AddTags />
    </>
  );
};

export default Page;
