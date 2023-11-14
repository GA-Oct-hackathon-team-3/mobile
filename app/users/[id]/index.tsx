import { Stack } from "expo-router";
import UserProfileScreen from "../../../components/screens/Profile";
const Page = () => {
  return (
    <>
      <Stack.Screen options={{ title: `User`, headerShown: false }} />

      <UserProfileScreen />
    </>
  );
};

export default Page;
