import { getToken } from "@/utils/auth-storage";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = getToken();

  return fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}
