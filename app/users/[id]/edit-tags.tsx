import { Stack } from "expo-router";
import React from "react";
import Header from "../../../components/Header";
import EditTags from "../../../components/screens/EditTags";

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ header: () => <Header /> }} />
      <EditTags />
    </>
  );
};

export default Page;
