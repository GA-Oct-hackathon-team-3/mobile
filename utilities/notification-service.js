import sendRequest from "./send-request";

const BASE_URL = "http://localhost:3010/api/device";

export async function acceptNotifications(tokenObj) {
  const res = await sendRequest(BASE_URL, "POST", tokenObj);

  console.log("res", res);
  return res;
}
