import { Stack, useLocalSearchParams } from "expo-router";
import UserProfile from "../../components/UserProfile";
import { DATA } from "../../components/MainScreen";
const Page = () => {
  const params = useLocalSearchParams();

  const id = params.id;

  console.log(params.id, "PARAMS");
  return (
    <>
      <Stack.Screen options={{ title: `${DATA[Number(id) - 1].first_name}` }} />

      <UserProfile />
    </>
  );
};

export default Page;
