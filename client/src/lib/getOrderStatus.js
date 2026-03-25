/**
 * 狀態顯示文字
 */
export function getOrderStatusLabel(value) {
  const statusMap = {
    pending: "待處理",
    paid: "已付款",
    shipped: "已出貨",
    completed: "已完成",
    cancelled: "已取消",
  };

  return statusMap[value] || value || "-";
}

/**
 * 狀態 badge 樣式
 */
export function getOrderStatusClass(value) {
  switch (value) {
    case "pending":
      return "bg-warning/10 text-warning";
    case "paid":
      return "bg-primary/10 text-primary";
    case "shipped":
      return "bg-info/10 text-info";
    case "completed":
      return "bg-success/10 text-success";
    case "cancelled":
      return "bg-danger/10 text-danger";
    default:
      return "bg-surface-subtle text-text-muted";
  }
}
