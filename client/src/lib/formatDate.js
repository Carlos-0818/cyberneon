/**
 * 格式化日期
 */
export function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  return date.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
