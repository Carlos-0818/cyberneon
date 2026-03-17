/**
 * Admin Category 路由
 */

import { Router } from "express";

import { validate } from "../../middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../validations/admin.category.schema.js";
import {
  getAdminCategories,
  getAdminCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/admin/category.controller.js";

const router = Router();

/**
 * 取得分類列表
 * GET /api/admin/categories
 */
router.get("/", getAdminCategories);

/**
 * 取得分類詳情
 * GET /api/admin/categories/:id
 */
router.get("/:id", getAdminCategoryById);

/**
 * 建立分類
 * POST /api/admin/categories
 */
router.post("/", validate(createCategorySchema), createCategory);

/**
 * 更新分類
 * PATCH /api/admin/categories/:id
 */
router.patch("/:id", validate(updateCategorySchema), updateCategory);

/**
 * 刪除分類
 * DELETE /api/admin/categories/:id
 */
router.delete("/:id", deleteCategory);

export default router;
