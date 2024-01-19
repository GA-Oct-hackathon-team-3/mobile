import { WEB_BASE_URL } from './constants';
import sendRequest from './send-request';
import * as SecureStore from 'expo-secure-store';
const BASE_URL = `${WEB_BASE_URL}/`;

export function register(userData) {
  return sendRequest(`${BASE_URL}users`, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}users/mobile/login`, 'POST', credentials);
}

export async function refreshTokens(device, token, refresh) {
  try {
    const response = await fetch(`${WEB_BASE_URL}/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Refresh: `Bearer ${refresh}`,
      },
      body: JSON.stringify({ device }), // include whether web or mobile is making call
      credentials: 'include',
    });

    // if server responds that either token are missing, run logout
    if (response.status === 403) await logout();

    // if success...
    if (response.status === 200) {
      return response.json();
    }
  } catch (error) {
    console.error('Refresh token error: ', error);
  }
}

export async function logout() {
  try {
    const refresh = await SecureStore.getItemAsync('refresh');
    // call to backend to handle refresh token
    const response = await fetch(`${WEB_BASE_URL}/users/logout`, {
      method: 'GET',
      headers: {
        Refresh: `Bearer ${refresh}`,
      },
      credentials: 'include',
    });

    if (response.status === 200 || response.status === 204)  return true;

    return true;
    
  } catch (error) {
    console.error('Logout error: ', error);
  }
}

export function googleLogin(credentials) {
  return sendRequest(`${BASE_URL}googleSignin`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}check-token`);
}

export function getCurrentUser() {
  return sendRequest(`${BASE_URL}users/profile/all`);
}

export function deleteUser(user) {
  return sendRequest(`${BASE_URL}users`, 'DELETE', user);
}

export function confirmDeleteUser(token) {
  return sendRequest(`${BASE_URL}users/confirm-delete`, 'POST', token);
}
