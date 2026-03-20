/**
 * orderService
 *
 * 說明：
 * - 管理 Order 相關 API
 */

import { api } from "../lib/axios";

/**
 * 取得我的訂單列表
 */
export async function getMyOrders() {
  const response = await api.get("/orders");
  return response.data.data;
}

/**
 * 取得單一訂單
 */
export async function getOrderById(orderId) {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data;
}

/**
 * 建立訂單
 */
export async function createOrder(payload) {
  const response = await api.post("/orders", payload);
  return response.data.data;
}
