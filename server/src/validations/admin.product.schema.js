/**
 * Admin Product 相關 Zod 驗證 schema
 */

import { z } from "zod";

const productStatusSchema = z.enum(["active", "inactive"]);

const imageSchema = z
  .string()
  .trim()
  .pipe(
    z.url({
      message: "Image must be a valid URL",
    }),
  );

const specsSchema = z.record(z.string(), z.any());

const baseProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z.string().trim().toLowerCase().min(1, "Slug is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  price: z.number().int().min(0, "Price must be greater than or equal to 0"),
  stock: z.number().int().min(0, "Stock must be greater than or equal to 0"),
  images: z.array(imageSchema).optional(),
  specs: specsSchema.optional(),
  description: z.string().trim().optional(),
  status: productStatusSchema,
  categoryId: z.string().trim().min(1, "Category id is required"),
});

export const createProductSchema = baseProductSchema;

export const updateProductSchema = baseProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });
