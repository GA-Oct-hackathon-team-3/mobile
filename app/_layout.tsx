import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme, Image, Text } from "react-native";

import Colors from "../constants/Colors";
import { colors } from "../constants/Theme";
import { AuthProvider } from "../components/providers/AuthContext";
import "react-native-gesture-handler";
import Header from "../components/Header";
import { RecommendationProvider } from "../components/providers/RecommendationContext";
import UserProvider from "../components/providers/UserContext";
import MainProvider from "../components/providers/MainContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PilcrowRounded: require("../assets/fonts/PilcrowRounded-Regular.ttf"),
    PilcrowBold: require("../assets/fonts/PilcrowRounded-Bold.otf"),
    PilcrowMedium: require("../assets/fonts/PilcrowRounded-Medium.otf"),

    ...FontAwesome.font,
  });
  // if (Platform.OS === 'web') {
  //   global._frameTimestamp = null
  // }

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <MainProvider>
          <RecommendationProvider>
            <UserProvider>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="settings"
                  options={{
                    title: "Settings",
                    header: () => <Header />,
                  }}
                />
                <Stack.Screen
                  name="delete-user"
                  options={{
                    headerShown: true,
                    headerTitle: "Delete Account",
                    header: () => <Header />,
                  }}
                />
                <Stack.Screen
                  name="edit-profile"
                  options={{
                    headerShown: true,
                    headerTitle: "Delete Account",
                    header: () => <Header />,
                  }}
                />
                <Stack.Screen
                  name="edit-interests"
                  options={{
                    headerShown: true,
                    headerTitle: "Delete Account",
                    header: () => <Header />,
                  }}
                />

                <Stack.Screen
                  name="edit-reminders"
                  options={{
                    headerShown: false,
                    headerTitle: "Edit Reminders",
                  }}
                />
              </Stack>
            </UserProvider>
          </RecommendationProvider>
        </MainProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
