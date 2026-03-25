/**
 * Admin Category 相關 Zod 驗證 schema
 */

import { z } from "zod";

const categoryStatusSchema = z.enum(["active", "inactive"]);

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z.string().trim().toLowerCase().min(1, "Slug is required"),
  description: z.string().trim().optional(),
  status: categoryStatusSchema,
});

export const updateCategorySchema = createCategorySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });
