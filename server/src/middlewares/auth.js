/**
 * Auth middleware
 * 驗證 JWT 並解析目前登入使用者
 */

import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

export async function auth(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(ERROR_CODES.UNAUTHORIZED, "Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      throw new AppError(ERROR_CODES.UNAUTHORIZED, "User not found", 401);
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}
