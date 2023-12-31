import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="edit-reminders" options={{ headerShown: false }} />
    </Stack>
  );
}

export default Layout;
