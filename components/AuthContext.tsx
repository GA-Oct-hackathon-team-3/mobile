import React, { createContext, useState, useContext, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import { getOnboarded } from "../utilities/storage";

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
  // For simplicity, we're just tracking a user object. Set to null for no user.

  useEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    if (Platform.OS === "web") {
      let token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        getOnboarded();
      }
    } else {
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        setToken(token);
        getOnboarded();
      }
    }
    console.log(token, "this is the token");
  };

  useProtectedRoute(token);

  // Dummy login/logout functions. In real-world, you'll integrate actual auth logic here.
  const login = (dummyUser) => {};

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ token, setToken, login, logout, onboarded, setOnboarded }}
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
