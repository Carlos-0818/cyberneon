/**
 * Order 路由
 * 負責處理訂單相關 API
 */

import { Router } from "express";

import { validate } from "../middlewares/validate.js";
import { createOrderSchema } from "../validations/order.schema.js";
import {
  createOrder,
  getMyOrders,
  getMyOrderById,
} from "../controllers/order.controller.js";

const router = Router();

/**
 * 建立訂單
 * POST /api/orders
 */
router.post("/", validate(createOrderSchema), createOrder);

/**
 * 取的當前使用者的訂單列表
 * GET /api/orders
 */
router.get("/", getMyOrders);

/**
 * 取得當前使用者的訂單詳情
 * GET /api/orders/:id
 */
router.get("/:id", getMyOrderById);

export default router;
