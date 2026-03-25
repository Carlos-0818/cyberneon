/**
 * Product Service
 * 負責處理商品相關 API
 * 目前同時包含前台和後台商品 API
 */

import { api } from "../lib/axios";

/* === Public APIs === */

/**
 * 取得前台商品列表
 */
export async function getProducts(params = {}) {
  const response = await api.get("/products", { params });

  return response.data.data;
}

/**
 * 取得單一商品詳情
 */
export async function getProductBySlug(slug) {
  const response = await api.get(`/products/${slug}`);

  return response.data.data;
}

/* === Admin APIs === */

/**
 * 取得後台商品列表
 */
export async function getAdminProducts(params = {}) {
  const response = await api.get("/admin/products", { params });

  return response.data.data;
}

/**
 * 取得後台單一商品詳情
 */
export async function getAdminProductById(productId) {
  const response = await api.get(`/admin/products/${productId}`);

  return response.data.data;
}

/**
 * 新增商品
 */
export async function createProduct(payload) {
  const response = await api.post("/admin/products", payload);

  return response.data.data;
}

/**
 * 更新商品
 */
export async function updateProduct(productId, payload) {
  const response = await api.patch(`/admin/products/${productId}`, payload);

  return response.data.data;
}

/**
 * 刪除商品
 */
export async function deleteProduct(productId) {
  const response = await api.delete(`/admin/products/${productId}`);

  return response.data;
}
