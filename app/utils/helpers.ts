import { BASE_URL, API_TOKEN } from "./constants";

export async function fetchCollection(username: string) {
  const response = await fetch(`${BASE_URL}/users/${username}/collection/folders/0/releases`, {
    headers: {
      'Authorization': `Discogs token=${API_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.releases;
}
