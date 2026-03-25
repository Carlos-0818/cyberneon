/**
 * Product 路由
 * 負責處理前台商品相關 API
 */

import { Router } from "express";

import {
  getProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";

const router = Router();

/**
 * 取得前台商品列表
 * GET /api/products
 */
router.get("/", getProducts);

/**
 * 取得前台商品詳情
 * GET /api/products/:slug
 */
router.get("/:slug", getProductBySlug);

export default router;
