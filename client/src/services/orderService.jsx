/**
 * orderService
 *
 * 說明：
 * - 管理 Order 相關 API
 */

import { api } from "../lib/axios";

/* === Public APIs === */

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

/* === Admin APIs === */

/**
 * 取得後台訂單列表
 */
export async function getAdminOrders(params = {}) {
  const response = await api.get("/admin/orders", { params });

  return response.data.data;
}

/**
 * 取得後台單一訂單詳情
 */
export async function getAdminOrderById(orderId) {
  const response = await api.get(`/admin/orders/${orderId}`);

  return response.data.data;
}

/**
 * 更新後台訂單狀態
 */
export async function updateAdminOrderStatus(orderId, payload) {
  const response = await api.patch(`/admin/orders/${orderId}/status`, payload);

  return response.data.data;
}
