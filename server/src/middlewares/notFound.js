import { ERROR_CODES } from "../constants/errorCodes.js";
import { fail } from "../utils/response.js";

/**
 * 處理所有未匹配到的路由
 */
export function notFound(_req, res, _next) {
  return fail(res, 404, ERROR_CODES.NOT_FOUND, "Not found");
}
