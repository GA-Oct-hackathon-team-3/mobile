import { Stack, useLocalSearchParams } from "expo-router";
import UserProfileScreen from "../../../components/Profile";
const Page = () => {
  const params = useLocalSearchParams();

  const id = params.id;

  return (
    <>
      <Stack.Screen options={{ title: `User`, headerShown: false }} />

      <UserProfileScreen />
    </>
  );
};

export default Page;
