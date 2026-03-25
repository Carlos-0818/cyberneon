/**
 * Category Controller
 * 負責處理前台商品分類 API
 */

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import { ok } from "../utils/response.js";

/**
 * 取得分類列表
 * GET /api/categories
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    where: {
      status: "active",
    },
    orderBy: {
      name: "asc",
    },
  });

  return ok(res, categories, "Categories fetched successfully");
});
