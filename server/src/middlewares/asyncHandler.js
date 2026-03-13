/**
 * 包裝 async controller / middleware
 * 自動攔截 Promise 錯誤並交給 errorHandler
 */
export function asyncHandler(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
