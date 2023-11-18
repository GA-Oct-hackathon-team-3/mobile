import DeleteUser from "../components/screens/DeleteUser";
import Header from "../components/Header";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Delete Account",
          header: () => <Header />,
        }}
      />
      <DeleteUser />
    </>
  );
};

export default Page;
