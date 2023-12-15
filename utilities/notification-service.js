import sendRequest from "./send-request";
import { WEB_BASE_URL } from "./constants";

export async function acceptNotifications(tokenObj) {
  const res = await sendRequest(WEB_BASE_URL + '/device', "POST", tokenObj);

  console.log("res", res);
  return res;
}

export async function getNotifications () {
    const response = await sendRequest(WEB_BASE_URL + '/notifications', 'GET', null);
    return response;
}
