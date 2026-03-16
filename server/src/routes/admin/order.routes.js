/**
 * Admin Order 路由
 * 負責處理後台訂單管理 API
 */

import { Router } from "express";

import { validate } from "../../middlewares/validate.js";
import { updateOrderStatusSchema } from "../../validations/admin.order.schema.js";
import {
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
} from "../../controllers/admin/order.controller.js";

const router = Router();

/**
 * 取得後台訂單列表
 * GET /api/admin/orders
 */
router.get("/", getAdminOrders);

/**
 * 取得後台訂單詳情
 * GET /api/admin/orders/:id
 */
router.get("/:id", getAdminOrderById);

/**
 * 更新訂單狀態
 * PATCH /api/admin/orders/:id/status
 */
router.patch(
  "/:id/status",
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);

export default router;
