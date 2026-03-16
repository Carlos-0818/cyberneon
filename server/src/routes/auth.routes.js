/**
 * Auth 路由
 * 負責處理註冊與登入 API
 */

import { Router } from "express";

import { signup, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { signupSchema, loginSchema } from "../validations/auth.schema.js";

const router = Router();

/**
 * POST /api/auth/signup
 * 使用者註冊
 */
router.post("/signup", validate(signupSchema), signup);

/**
 * POST /api/auth/login
 * 使用者登入
 */
router.post("/login", validate(loginSchema), login);

export default router;
