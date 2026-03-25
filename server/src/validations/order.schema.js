/**
 * Order 相關 Zod 驗證 schema
 */

import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),

  recipientName: z.string().trim().min(1, "Recipient name is required"),
  recipientPhone: z.string().trim().min(10, "Recipient phone is required"),
  shippingAddress: z.string().trim().min(1, "Shipping address is required"),

  note: z.string().trim().optional(),
});
