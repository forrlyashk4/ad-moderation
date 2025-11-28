/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "./config";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions extends RequestInit {
  method?: HttpMethod;
  params?: Record<string, any>;
  json?: unknown;
}

export function buildUrl(path: string, params?: Record<string, any>) {
  const isAbsolute = /^https?:\/\//i.test(API_BASE_URL);

  let url: URL;

  if (isAbsolute) {
    // режим без прокси, прямой запрос на бек
    const base = API_BASE_URL.endsWith("/") ? API_BASE_URL : API_BASE_URL + "/";

    const rel = path.startsWith("/") ? path.slice(1) : path;

    url = new URL(rel, base);
  } else {
    // режим с прокси (API_BASE_URL = '/api/v1')
    const basePath = API_BASE_URL.endsWith("/")
      ? API_BASE_URL.slice(0, -1)
      : API_BASE_URL;

    const rel = path.startsWith("/") ? path : "/" + path;

    url = new URL(basePath + rel, window.location.origin);
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
}

export async function apiClient<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { params, json, method = "GET", headers, ...rest } = options;

  const url = buildUrl(path, params);

  const res = await fetch(url, {
    method,
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : options.body,
    ...rest,
  });

  if (!res.ok) {
    // тут можешь навесить логирование, обработку 401, 403 и т.п.
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed ${res.status} ${res.statusText} ${text}`);
  }

  // если без тела 204 и т.п.
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
