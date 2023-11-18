import * as usersAPI from "./users-api";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { decode as atob, encode as btoa } from "base-64";

export async function register(userData) {
  const userDataReturned = await usersAPI.register(userData);
  const token = userDataReturned.accessToken;
  Platform.OS === "web"
    ? localStorage.setItem("token", token)
    : await SecureStore.setItemAsync("token", token);
  return getUser();
}

export async function getToken() {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("token")
      : await SecureStore.getItemAsync("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    Platform.OS === "web"
      ? localStorage.removeItem("token")
      : await SecureStore.deleteItemAsync("token");
    return null;
  }

  return token;
}

export async function login(credentials) {
  const res = await usersAPI.login(credentials);
  console.log(res, "REPONSE USER CONTROLLER LOGIN");

  Platform.OS === "web"
    ? localStorage.setItem("token", res.accessToken)
    : await SecureStore.setItemAsync("token", res.accessToken);
  return getUser();
}

export async function getUser() {
  const token = await getToken();
  let userData;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    userData = {
      exp: payload.exp,
      id: payload.payload,
      token: token,
    };
  }
  return token ? userData : null;
}

export function logOut() {
  Platform.OS === "web"
    ? localStorage.removeItem("token")
    : SecureStore.deleteItemAsync("token");
}

export async function deleteUser(id) {
  console.log(id, "THIS IS THE ID");
  try {
    const response = await usersAPI.deleteUser({ user: id });
    console.log(response, "THIS IS THE RESPONSE DELETE USER");
    return response;
  } catch (err) {
    console.log(err, "THIS IS THE ERROR");
    return null;
  }
}

export async function confirmDeleteUser(confirmToken) {
  const token = await getToken();
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;
    const response = await usersAPI.confirmDeleteUser({
      confirmationToken: confirmToken,
    });

    return response;
  }

  return null;
}
