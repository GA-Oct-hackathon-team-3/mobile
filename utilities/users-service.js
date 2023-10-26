import * as usersAPI from "./users-api";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { decode as atob, encode as btoa } from "base-64";

export async function register(userData) {
  const userDataReturned = await usersAPI.register(userData);
  console.log("userDataReturned", userDataReturned);
  const token = userDataReturned.accessToken;
  console.log("token in user service after userData", token);
  localStorage.setItem("token", token);
  return getUser();
}

export async function getToken() {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("token")
      : await SecureStore.getItemAsync("token");
  console.log("token in getToken", token);
  if (!token) return null;
  console.log("token in getToken2", token);
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export async function login(credentials) {
  const res = await usersAPI.login(credentials);

  Platform.OS === "web"
    ? localStorage.setItem("token", res.accessToken)
    : await SecureStore.setItemAsync("token", res.accessToken);
  return getUser();
}

export async function getUser() {
  const token = await getToken();
  let userData;
  if (token) {
    console.log("THIS IS THE TOKEN", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    userData = {
      username: payload.username,
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
  }
  return token ? token : null;
}

export function logOut() {
  Platform.OS === "web"
    ? localStorage.removeItem("token")
    : SecureStore.deleteItemAsync("token");
}
