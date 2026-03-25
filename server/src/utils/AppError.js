/**
 * 自訂應用層錯誤（可控錯誤）
 *
 * 在 controller / middleware 中主動丟出業務錯誤
 * 搭配 errorHandler 統一轉換為標準 API 回應格式
 */
export class AppError extends Error {
  constructor(code, message, statusCode) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
