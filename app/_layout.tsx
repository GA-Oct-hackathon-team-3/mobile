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
import { AuthProvider } from "../components/AuthContext";
import "react-native-gesture-handler";

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
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* <Stack.Screen
            name="add-friend"
            options={{
              title: "Create Friend Profile",
              headerShown: true,
              header: () => (
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: colors.cream,
                  }}
                >
                  <Text>Test</Text>
                </View>
              ),
            }}
          /> */}
          <Stack.Screen
            name="settings"
            options={{ headerShown: true, title: "Settings" }}
          />
          {/* <Stack.Screen
            name="add-tags"
            options={{
              headerShown: true,
              title: "Add Tags",
            }}
          /> */}
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
