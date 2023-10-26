import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const getOnboarded = async () => {
  if (Platform.OS === "web") {
    const onboarded = localStorage.getItem("onboarded");

    if (onboarded) {
      return true;
    } else {
      return false;
    }
  } else {
    const onboarded = await SecureStore.getItemAsync("onboarded");

    if (onboarded) {
      return true;
    } else {
      return false;
    }
  }
};
