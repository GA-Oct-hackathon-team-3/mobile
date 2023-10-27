import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, SafeAreaView, View } from "react-native";

import CreateFriendsProfile from "../components/CreateFriendProfile";
import { Stack } from "expo-router";
import { colors } from "../constants/Theme";
import Header from "../components/Header";

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Add Friend",
          header: () => <Header />,
        }}
      />
      {/* <View style={{ height: 40, backgroundColor: colors.cream }}></View> */}
      {/* <Header /> */}

      <CreateFriendsProfile />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
