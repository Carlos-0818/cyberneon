/**
 * Status 自動轉中文
 */

export function getStatusLabel(status) {
  if (status === "active") return "已上架";
  if (status === "inactive") return "已下架";
  return status;
}
