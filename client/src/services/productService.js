/**
 * Product Service
 * 負責處理前台商品 API
 */

import { api } from "../lib/axios";

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
