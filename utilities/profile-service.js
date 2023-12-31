import { WEB_BASE_URL } from "./constants";
import { getToken } from "./users-service";
import sendRequest from "./send-request";

export async function getProfile() {
  return await sendRequest(`${WEB_BASE_URL}/users/profile/all`, "GET", null);
}

export async function updateUserProfile(userData) {
  return await sendRequest(`${WEB_BASE_URL}/users/profile`, "PUT", userData);
}

export async function uploadPhoto(file) {
  const { name, uri, type } = file;
  const formData = new FormData();
  formData.append("photo", { name, uri, type });
  const token = await getToken();

  const response = await fetch(`${WEB_BASE_URL}/users/profile/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status === 200) return response;
}
