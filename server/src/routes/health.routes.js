import { Router } from "express";

import { ok } from "../utils/response.js";

const router = Router();

/**
 * 健康檢查路由
 * GET /api/health
 * 用於確認 server 是否正常啟動
 */
router.get("/", (req, res) => {
  return ok(res, {
    service: "CyberNeon API",
    status: "healthy",
    time: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
