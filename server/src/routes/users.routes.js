/**
 * Users 路由
 */

import { Router } from "express";

import { getMe } from "../controllers/users.controller.js";

const router = Router();

router.get("/me", getMe);

export default router;
