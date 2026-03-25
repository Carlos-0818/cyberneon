/**
 * Category Service
 * 負責處理前台分類 API
 */

import { api } from "../lib/axios";

/* === Public APIs === */

/**
 * 取得前台分類列表
 */
export async function getCategories() {
  const response = await api.get("/categories");

  return response.data.data;
}

/* === Admin APIs === */

/**
 * 取得後台分類列表
 */
export async function getAdminCategories() {
  const response = await api.get("/admin/categories");

  return response.data.data;
}
