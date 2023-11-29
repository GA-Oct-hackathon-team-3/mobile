import sendRequest from "./send-request";
import { WEB_BASE_URL } from "./constants";

const BASE_URL = `${WEB_BASE_URL}/`;

export async function getTags() {
  const tags = await sendRequest(BASE_URL + `tags`, "GET", null);
  return tags;
}

export async function updateTags (id, tags) {
    const response = await sendRequest(`${BASE_URL}friends/${id}/tags`, 'POST', tags);
    return response;
}

export async function getSuggestions (query) {
    const suggestions = await sendRequest(`${BASE_URL}tags/suggestions?search=${query}`, 'GET', null);
    return suggestions;
}