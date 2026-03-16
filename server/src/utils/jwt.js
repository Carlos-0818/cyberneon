/**
 * JWT 工具
 * 負責簽發與驗證 access token
 */

import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

/**
 * 簽發 JWT
 */
export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

/**
 * 驗證 JWT
 */
export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}
