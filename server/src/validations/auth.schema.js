/**
 * Auth 相關 Zod 驗證 schema
 */

import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .pipe(
    z.email({
      message: "Email format is invalid",
    }),
  );

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});
