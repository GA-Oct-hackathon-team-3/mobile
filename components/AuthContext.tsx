import React, { createContext, useState, useContext, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import { getOnboarded } from "../utilities/storage";
import { getToken, getUser } from "../utilities/users-service";

const AuthContext = createContext(null);

export function useProtectedRoute(token) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

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
  // For simplicity, we're just tracking a user object. Set to null for no user.

  useEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    if (Platform.OS === "web") {
      let token = await getToken();
      if (token) {
        setToken(token);
        getOnboarded();
        let data = await getUser();
        setUserData(data);
      }
    } else {
      let token = await getToken();
      if (token) {
        setToken(token);
        getOnboarded();
        let data = await getUser();
        setUserData(data);
      }
    }
  };

  useProtectedRoute(token);

  // Dummy login/logout functions. In real-world, you'll integrate actual auth logic here.
  const login = (dummyUser) => {};

  const logout = async () => {
    setToken(null);
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
    } else {
      await SecureStore.deleteItemAsync("token");
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
