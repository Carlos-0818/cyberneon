/**
 * Root Router
 * 聚合所有子路由（routes）
 */

import { Router } from "express";

import { auth } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

import healthRouter from "./health.routes.js";
import productRouter from "./product.routes.js";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

import adminProductRouter from "./admin/product.routes.js";

const router = Router();

/**
 * Public
 */
router.use("/health", healthRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);

/**
 * Private
 */
router.use(auth);
router.use("/users", userRouter);

/**
 * Admin
 */
router.use(requireAdmin);
router.use("/admin/products", adminProductRouter);

export default router;
