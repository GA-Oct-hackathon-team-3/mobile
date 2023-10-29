import { getToken } from "./users-service";

export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const token = await getToken();

  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  console.log(options, "options", url, "url");
  const res = await fetch(url, options);

  console.log("RESPONSE", res);

  if (res.ok) {
    if (res.headers.get("content-length") === "0" || res.status === 204) {
      return null; // or however you want to handle an empty response
    }
    return res.json();
  }

  throw new Error("Bad Request");
}
