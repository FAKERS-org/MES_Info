/**
 * Application configuration
 *
 * All configurable values are centralized here.
 * Components and services reference these constants instead of hard-coded values.
 */

export const APP_CONFIG = {
  name: "MES Universities",
  version: "0.1.0",
  environment: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export const THEME_CONFIG = {
  storageKey: "theme",
  defaultTheme: "light" as const,
  darkClass: "dark",
} as const;

export const LANGUAGE_CONFIG = {
  storageKey: "lang",
  defaultLanguage: "kh" as const,
  supportedLanguages: ["kh", "en"] as const,
} as const;

export const API_CONFIG = {
  /** Base URL of the external MES API. Override with NEXT_PUBLIC_API_URL, or API_URL for server side. */
  baseUrl:
    typeof window === "undefined" && process.env.API_URL
      ? (process.env.API_URL.endsWith("/api/v1") ? process.env.API_URL : `${process.env.API_URL}/api/v1`)
      : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"),
} as const;