/**
 * Admin Product 路由
 * 負責處理後台商品管理 API
 */

import { Router } from "express";

import { validate } from "../../middlewares/validate.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../validations/admin.product.schema.js";
import {
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/product.controller.js";

const router = Router();

/**
 * GET /api/admin/products
 * 取得後台商品列表
 */
router.get("/", getAdminProducts);

/**
 * 取得後台商品詳情
 * GET /api/admin/products/:id
 */
router.get("/:id", getAdminProductById);

/**
 * 新增商品
 * POST /api/admin/products
 */
router.post("/", validate(createProductSchema), createProduct);

/**
 * 更新商品
 * PATCH /api/admin/products/:id
 */
router.patch("/:id", validate(updateProductSchema), updateProduct);

/**
 * 刪除商品
 * DELETE /api/admin/products/:id
 */
router.delete("/:id", deleteProduct);

export default router;
