/**
 * Root Router
 * 聚合所有子路由（routes）
 */

import { Router } from "express";

import healthRouter from "./health.routes.js";

const router = Router();

/**
 * Public
 */
router.use("/health", healthRouter);

export default router;
