import sendRequest from "./send-request";
import { WEB_BASE_URL } from "./constants";

export async function acceptNotifications(tokenObj) {
  const res = await sendRequest(WEB_BASE_URL + '/device', "POST", tokenObj);

  console.log("res", res);
  return res;
}

export async function getReminders () {
    const response = await sendRequest(WEB_BASE_URL + '/reminders', 'GET', null);
    return response;
}

export async function markAsRead (notificationIds) {
    const response = await sendRequest(WEB_BASE_URL + '/reminders/read', 'PUT', { notificationIds });
    return response;
}

export async function deleteReminder (id) {
    const response = await sendRequest(WEB_BASE_URL + `/reminders/${id}/delete`, 'DELETE');
    return response;
}