/**
 * Users Controller
 * 負責處理使用者相關 API
 */

import { ok } from "../utils/response.js";

export function getMe(req, res) {
  const user = req.user;

  return ok(res, {
    id: user.id,
    email: user.email,
    role: user.role,
  });
}
