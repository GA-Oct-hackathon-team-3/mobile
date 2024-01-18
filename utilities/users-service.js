import * as usersAPI from './users-api';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { decode as atob, encode as btoa } from 'base-64';

export async function register(userData) {
  const userDataReturned = await usersAPI.register(userData);
  const token = userDataReturned.accessToken;
  Platform.OS === 'web'
    ? localStorage.setItem('token', token)
    : await SecureStore.setItemAsync('token', token);
  return getUser();
}

export async function getToken() {
  const token =
    Platform.OS === 'web'
      ? localStorage.getItem('token')
      : await SecureStore.getItemAsync('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));

  if (payload.exp < Date.now() / 1000) {
    const refresh =
      Platform.OS === 'web'
        ? localStorage.getItem('refresh')
        : await SecureStore.getItemAsync('refresh');

    const tokens = await refreshTokens('mobile', token, refresh);

    if (Platform.OS === 'web') {
      localStorage.setItem('token', tokens.accessToken);
      localStorage.setItem('refresh', tokens.refreshToken);
    } else {
      await SecureStore.setItemAsync('token', tokens.accessToken);
      await SecureStore.setItemAsync('refresh', tokens.refreshToken);
    }

    return tokens.accessToken;
  }

  return token;
}

export async function refreshTokens(device, token, refresh) {
  return await usersAPI.refreshTokens(device, token, refresh);
}

export async function login(credentials) {
  const res = await usersAPI.login(credentials);
  console.log(res, 'REPONSE USER CONTROLLER LOGIN');
  console.log('i added this: ', res.accessToken);
  Platform.OS === 'web'
    ? localStorage.setItem('token', res.accessToken)
    : await SecureStore.setItemAsync('token', res.accessToken);
  Platform.OS === 'web'
    ? localStorage.setItem('refresh', res.refreshToken)
    : await SecureStore.setItemAsync('refresh', res.refreshToken);
  return getUser();
}

export async function getUser() {
  const token = await getToken();
  let userData;
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));

    userData = {
      exp: payload.exp,
      id: payload.payload,
      token: token,
    };
  }
  return token ? userData : null;
}

export async function deleteUser(id) {
  console.log(id, 'THIS IS THE ID');
  try {
    const response = await usersAPI.deleteUser({ user: id });
    console.log(response, 'THIS IS THE RESPONSE DELETE USER');
    return response;
  } catch (err) {
    console.log(err, 'THIS IS THE ERROR');
    return null;
  }
}

export async function confirmDeleteUser(confirmToken) {
  const token = await getToken();
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;
    const response = await usersAPI.confirmDeleteUser({
      confirmationToken: confirmToken,
    });

    return response;
  }

  return null;
}
