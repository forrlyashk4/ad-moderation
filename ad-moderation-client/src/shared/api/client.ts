import { API_BASE_URL } from "./config";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Primitive = string | number | boolean;
type QueryValue = Primitive | Primitive[];
interface ApiRequestOptions extends RequestInit {
  method?: HttpMethod;
  params?: Record<string, QueryValue | null | undefined>;
  json?: unknown;
}

export function buildUrl(
  path: string,
  params?: Record<string, QueryValue | null | undefined>
) {
  const isAbsolute = /^https?:\/\//i.test(API_BASE_URL);

  let url: URL;

  if (isAbsolute) {
    const base = API_BASE_URL.endsWith("/") ? API_BASE_URL : API_BASE_URL + "/";

    const rel = path.startsWith("/") ? path.slice(1) : path;

    url = new URL(rel, base);
  } else {
    const basePath = API_BASE_URL.endsWith("/")
      ? API_BASE_URL.slice(0, -1)
      : API_BASE_URL;

    const rel = path.startsWith("/") ? path : "/" + path;

    url = new URL(basePath + rel, window.location.origin);
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          url.searchParams.append(key, String(v));
        });
      } else {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}
class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
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
      ...(headers instanceof Headers ? Object.fromEntries(headers) : headers),
    },
    body: json ? JSON.stringify(json) : options.body,
    ...rest,
  });

  if (!res.ok) {
    let errorBody = null;

    try {
      errorBody = await res.json();
    } catch {
      errorBody = await res.text().catch(() => null);
    }

    throw new ApiError(res.status, res.statusText, errorBody);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
