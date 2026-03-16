/**
 * Root Router
 * 聚合所有子路由（routes）
 */

import { Router } from "express";

import { auth } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

import healthRouter from "./health.routes.js";
import productRouter from "./product.routes.js";
import categoryRouter from "./category.routes.js";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";

import adminProductRouter from "./admin/product.routes.js";
import adminOrderRouter from "./admin/order.routes.js";

const router = Router();

/**
 * Public
 */
router.use("/health", healthRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);

/**
 * Private
 */
router.use(auth);
router.use("/users", userRouter);
router.use("/orders", orderRouter);

/**
 * Admin
 */
router.use(requireAdmin);
router.use("/admin/products", adminProductRouter);
router.use("/admin/orders", adminOrderRouter);

export default router;
