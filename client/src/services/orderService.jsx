/**
 * orderService
 *
 * 說明：
 * - 統一管理 Order 相關 API
 * - Phase 1 先提供 createOrder
 */

import { api } from "../lib/axios";

/**
 * 建立訂單
 */
export async function createOrder(payload) {
  const response = await api.post("/orders", payload);
  return response.data.data;
}
