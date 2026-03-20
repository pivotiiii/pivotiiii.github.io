import {browser} from "$app/environment";

export async function fetchWithCache<T = unknown>(
  fetch: typeof globalThis.fetch,
  url: string,
  key: string,
  maxAge = 1000 * 60 * 60
): Promise<T> {
  if (browser) {
    const cached = localStorage.getItem(url);
    if (cached) {
      const cachedObj: {json: Record<string, T>; date: number} = JSON.parse(cached);
      if (Date.now() - cachedObj.date < maxAge) {
        return cachedObj.json[key];
      }
    }
  }

  const response = await fetch(url);
  const json: Record<string, T> = await response.json();

  if (browser) {
    localStorage.setItem(url, JSON.stringify({json, date: Date.now()}));
  }

  return json[key];
}
