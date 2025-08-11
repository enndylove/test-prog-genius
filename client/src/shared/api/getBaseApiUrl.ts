import { DEV_SERVER_URL } from "../constants/DEV_URLS";

export function getBaseApiUrl() {
  if (import.meta.env.PROD) {
    return `${window.location.origin}`;
  }

  if (import.meta.env["VITE_API_URL"]) {
    return import.meta.env["VITE_API_URL"];
  }

  return DEV_SERVER_URL;
}
