/**
 * Category Service
 * 負責處理前台分類 API
 */

import { api } from "../lib/axios";

/**
 * 取得前台分類列表
 */
export async function getCategories() {
  const response = await api.get("/categories");

  return response.data.data;
}
