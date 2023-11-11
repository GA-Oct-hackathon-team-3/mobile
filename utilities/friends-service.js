import sendRequest from "./send-request";
import { getToken } from "./users-service";
import { WEB_BASE_URL } from "./constants";

const BASE_URL = `${WEB_BASE_URL}/friends`;

export async function retrieveFriends() {
  const friends = await sendRequest(BASE_URL, "GET", null);
  return friends;
}

export async function retrieveFriend(id) {
  const url = `${BASE_URL}/${id}`;

  const friend = await sendRequest(url, "GET", null);
  return friend;
}

export async function createFriend(friendData) {
  const newFriend = await sendRequest(`${BASE_URL}/create`, "POST", friendData);
  return newFriend;
}

export async function updateFriend(id, friendInput) {
  const response = await sendRequest(
    `${BASE_URL}/${id}/update`,
    "PUT",
    friendInput
  );
  return response;
}

export async function uploadPhoto(id, file) {
  console.log(id, typeof file, "ID AND FILE");

  const formData = new FormData();
  formData.append("photo", file);
  const token = getToken();

  const response = await fetch(`${BASE_URL}/${id}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  console.log(response, "RESPONSE, UPLOAD PHOTO");

  if (response.status === 200) return response;
}
