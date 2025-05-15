import { isClient } from "@/helpers/isClient";

const AUTH_TOKEN_KEY = "ZAYTOONA_AUTH_TOKEN";
const REFRESH_TOKEN_KEY = "ZAYTOONA_REFRESH_TOKEN";

export async function setAccessToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAccessToken(): string {
  // Only try to access localStorage when in the client-side environment
  return (isClient && localStorage.getItem(AUTH_TOKEN_KEY)) || "";
}
export async function setRefreshToken(token: string) {
  isClient && localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function getRefreshToken(): string {
  return (isClient && localStorage.getItem(REFRESH_TOKEN_KEY)) || "";
}

export function clearAccessToken() {
  isClient && localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function clearRefreshToken() {
  isClient && localStorage.removeItem(REFRESH_TOKEN_KEY);
}
