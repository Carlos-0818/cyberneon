/**
 * 通用驗證 middleware
 * 使用 Zod 驗證 req.body，失敗時交給 errorHandler
 */

import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

export function validate(schema) {
  return async function (req, _res, next) {
    try {
      const result = await schema.safeParseAsync(req.body);

      if (!result.success) {
        const message = result.error.issues[0]?.message || "Validation failed";

        return next(new AppError(ERROR_CODES.VALIDATION_ERROR, message, 400));
      }

      req.body = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
}
