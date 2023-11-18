import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Header from "../components/Header";

import CreateFriendsProfile from "../components/screens/CreateFriendProfile";

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
