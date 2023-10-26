import { Stack, useLocalSearchParams } from "expo-router";
import UserProfile from "../../components/UserProfile";
import UserProfileScreen from "../../components/Profile";
const Page = () => {
  const params = useLocalSearchParams();

  const id = params.id;

  console.log(params.id, "PARAMS");
  return (
    <>
      <Stack.Screen options={{ title: `User` }} />

      <UserProfileScreen />
    </>
  );
};

export default Page;
