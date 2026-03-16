/**
 * Admin 權限驗證 middleware
 * 需搭配 auth middleware 使用
 */

import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

export function requireAdmin(req, _res, next) {
  const user = req.user;

  if (!user || user.role !== "admin") {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Forbidden", 403);
  }

  next();
}
