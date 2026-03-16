/**
 * Root Router
 * 聚合所有子路由（routes）
 */

import { Router } from "express";

import { auth } from "../middlewares/auth.js";

import healthRouter from "./health.routes.js";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

/**
 * Public
 */
router.use("/health", healthRouter);
router.use("/auth", authRouter);

/**
 * Private
 */
router.use(auth);
router.use("/users", userRouter);

export default router;
