/**
 * 負責處理使用者註冊與登入
 */

import bcrypt from "bcrypt";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../utils/jwt.js";
import { ok } from "../utils/response.js";
import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

/**
 * 使用者註冊
 * POST /api/auth/signup
 */
export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 檢查 email 是否已經存在
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(ERROR_CODES.CONFLICT, "Email already exists", 409);
  }

  // 密碼 hash，避免儲存明碼
  const passwordHash = await bcrypt.hash(password, 10);

  // 建立使用者
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  const token = signToken({ userId: user.id, role: user.role });

  return ok(
    res,
    {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    },
    "Signup successful",
    ERROR_CODES.OK,
    201,
  );
});

/**
 * 使用者登入
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(
      ERROR_CODES.UNAUTHORIZED,
      "Invalid email or password",
      401,
    );
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new AppError(
      ERROR_CODES.UNAUTHORIZED,
      "Invalid email or password",
      401,
    );
  }

  const token = signToken({ userId: user.id, role: user.role });

  return ok(res, {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  });
});
