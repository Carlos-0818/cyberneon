/**
 * authService
 *
 * 說明：
 * - 統一管理 Auth 相關 API
 * - Phase 1 先提供 signup / login
 */

import { api } from "../lib/axios";

/**
 * 註冊會員
 */
export async function signup(payload) {
  const response = await api.post("/auth/signup", payload);
  return response.data.data;
}

/**
 * 會員登入
 */
export async function login(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data.data;
}

/**
 * 取得目前登入使用者的資訊
 */
export async function getMe() {
  const response = await api.get("/users/me");
  return response.data.data;
}
