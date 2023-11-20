import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { getToken, getUser } from "../../utilities/users-service";
import { getProfile } from "../../utilities/profile-service";

interface AuthContextInterface {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (dummyUser: any) => void;
  logout: () => Promise<void>;
  onboarded: boolean;
  setOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  showReminders: boolean;
  setShowReminders: React.Dispatch<React.SetStateAction<boolean>>;
  dismissReminders: () => Promise<void>;
  dismissOnboarding: () => Promise<void>;
}

const initialState: AuthContextInterface = {
  token: null,
  setToken: () => {}, // No-op function for initial state
  login: () => {}, // Replace with actual login logic
  logout: async () => {}, // Replace with actual logout logic
  onboarded: false,
  setOnboarded: () => {}, // No-op function for initial state
  userData: null, // Replace 'null' with the actual initial state for userData
  setUserData: () => {}, // No-op function for initial state
  showReminders: true,
  setShowReminders: () => {}, // No-op function for initial state
  dismissReminders: async () => {}, // Replace with actual logic for dismissing reminders
  dismissOnboarding: async () => {}, // Replace with actual logic for dismissing onboarding
};

const AuthContext = React.createContext<AuthContextInterface>(initialState);

export function useProtectedRoute(token) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      setTimeout(() => {
        if (!token) {
          router.replace("/landing");
        } else if (token) {
          router.replace("/");
        }
      }, 1);
    } else {
      setImmediate(() => {
        if (!token) {
          router.replace("/landing");
        } else if (token) {
          router.replace("/");
        }
      });
    }
  }, [token]);
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [onboarded, setOnboarded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showReminders, setShowReminders] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setupUserData();
  }, [token]);

  const getUserToken = async () => {
    if (Platform.OS === "web") {
      let token = await getToken();
      if (token) {
        setToken(token);
        let data = await getUser();
        setUserData(data);
      }
    } else {
      let token = await getToken();
      if (token) {
        setToken(token);
        let data = await getUser();
        setUserData(data);
      }
    }
  };

  const setupUserData = async () => {
    try {
      await getOnboarded();
    } catch (error) {
      console.log(error, "ERROR ONBOARDED");
    }
    try {
      await getUserToken();
    } catch (error) {
      console.log(error, "ERROR GETTING USER TOKEN");
    }
    try {
      await getShowReminders();
    } catch (error) {
      console.log(error, "ERROR GETTING SHOW REMINDERS");
    }

    try {
      await fetchUserProfile();
    } catch (error) {
      console.log(error, "ERROR FETCHING USER PROFILE");
    }

    return;
  };

  const fetchUserProfile = async () => {
    const data = await getProfile();

    setUserProfile(data.profile);
  };

  const getOnboarded = async () => {
    if (Platform.OS === "web") {
      const value = localStorage.getItem("onboarded");
      if (value === "true") setOnboarded(true);
      else setOnboarded(false);
    } else {
      const value = await SecureStore.getItemAsync("onboarded");
      if (value === "true") setOnboarded(true);
      else setOnboarded(false);
    }
  };

  const dismissOnboarding = async () => {
    if (Platform.OS === "web") {
      localStorage.setItem("onboarded", "true");
      await getOnboarded();
    } else {
      await SecureStore.setItemAsync("onboarded", "true");
      await getOnboarded();
    }
  };

  useProtectedRoute(token);

  const login = () => {};

  const logout = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
      localStorage.removeItem("showReminders");
      localStorage.removeItem("onboarded");
    } else {
      try {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("showReminders");
        await SecureStore.deleteItemAsync("onboarded");
      } catch (error) {
        console.log("ERROR REMOVING FROM SECURE STORE", error);
      }
    }

    setToken(null);
    setOnboarded(false);
    setShowReminders(true);
    setUserData(null);
  };

  const dismissReminders = async () => {
    if (Platform.OS === "web") {
      localStorage.setItem("showReminders", "false");
      await getShowReminders();
    } else {
      await SecureStore.setItemAsync("showReminders", "false");
      await getShowReminders();
    }
  };

  const getShowReminders = async () => {
    if (Platform.OS === "web") {
      const value = localStorage.getItem("showReminders");
      if (value === "false") setShowReminders(false);
      else setShowReminders(true);
    } else {
      const value = await SecureStore.getItemAsync("showReminders");
      console.log("this is the value: ", value);
      if (value === "false") setShowReminders(false);
      else setShowReminders(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        onboarded,
        setOnboarded,
        userData,
        setUserData,
        setShowReminders,
        showReminders,
        dismissReminders,
        dismissOnboarding,
        userProfile,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
