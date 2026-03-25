/**
 * Admin Order 相關 Zod 驗證 schema
 */

import { z } from "zod";

const orderStatusSchema = z.enum([
  "pending",
  "paid",
  "shipped",
  "completed",
  "cancelled",
]);

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
});
