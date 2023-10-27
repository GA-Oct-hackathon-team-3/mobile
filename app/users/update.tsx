import React from "react";
import { View, Text } from "react-native";
import EditFriendProfile from "../../components/EditFriendProfile";
import { Stack } from "expo-router";
import Header from "../../components/Header";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: `User`,
          headerShown: true,
          header: () => <Header />,
        }}
      />

      <EditFriendProfile />
    </>
  );
};

export default Page;
