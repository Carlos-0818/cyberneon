import { fail } from "../utils/response.js";
import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

/**
 * 統一處理所有錯誤
 * 將錯誤轉換為標準 API 回應格式
 */
export function errorHandler(err, _req, res, _next) {
  // 可控錯誤（由我們自己丟的）
  if (err instanceof AppError) {
    return fail(res, err.statusCode, err.code, err.message);
  }

  // 未預期錯誤，一律回 500 INTERNAL_ERROR
  console.error("[ERROR_HANDLER] UnhandledError:", err);
  return fail(res, 500, ERROR_CODES.INTERNAL_ERROR, "Internal server error");
}
