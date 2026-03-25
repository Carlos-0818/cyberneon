/**
 * axios instance
 *
 * 說明：
 * - 統一管理 API base URL
 * - 自動夾帶 JWT token
 */

import axios from "axios";

const AUTH_TOKEN_STORAGE_KEY = "cyberneon_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * Request interceptor
 * - 如果 localStorage 有 token，就自動帶進 Authorization header
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
