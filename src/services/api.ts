import type { University } from "@/data";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new ApiError(`Request ${path} failed`, res.status);
  }
  return (await res.json()) as T;
}

export const api = {
  universities: () => request<University[]>("/api/universities"),
};
