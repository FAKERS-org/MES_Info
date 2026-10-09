// src/lib/api/client.ts
// CLIENT-side HTTP client (axios). Only for "use client" files — hooks and
// client components. Server Components must use `apiFetch` from
// "@/lib/api/fetch" instead: axios + js-cookie have no business on the server.
import axios from "axios";
import Cookies from "js-cookie";
import { API_CONFIG } from "@/config";

const apiClient = axios.create({
    baseURL: API_CONFIG.baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach JWT to every request
apiClient.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Handle 401 Unauthorized
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid — clear it. There is no /login route
            // yet, so do NOT redirect here (it would land on the 404 page).
            // Once a login page exists, add `redirect("/login")` in this branch.
            Cookies.remove("access_token");
        }
        return Promise.reject(error);
    },
);

export default apiClient;
