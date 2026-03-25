/**
 * Category 路由
 * 負責處理前台商品分類 API
 */

import { Router } from "express";

import { getCategories } from "../controllers/category.controller.js";

const router = Router();

/**
 * 取得分類列表
 * GET /api/categories
 */
router.get("/", getCategories);

export default router;
