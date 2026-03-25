/**
 * 統一成功回傳格式
 */
export function ok(
  res,
  data = null,
  message = "OK",
  code = "OK",
  status = 200,
) {
  return res.status(status).json({
    success: true,
    code,
    message,
    data,
  });
}

/**
 * 統一失敗回傳格式
 */
export function fail(res, status, code, message) {
  return res.status(status).json({
    success: false,
    code,
    message,
    data: null,
  });
}
