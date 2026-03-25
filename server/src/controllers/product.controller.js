/**
 * Product Controller
 * 負責處理前台商品相關 API
 */

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import { ok } from "../utils/response.js";
import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

/**
 * 取得前台商品列表
 * GET /api/products
 */
export const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const keyword = req.query.keyword?.trim() || "";
  const category = req.query.category?.trim() || "";
  const sort = req.query.sort?.trim() || "latest";

  const skip = (page - 1) * limit;

  const where = {
    status: "active",
  };

  // 關鍵字搜尋
  if (keyword) {
    where.OR = [
      {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      {
        slug: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    ];
  }

  // 分類篩選（以 category slug 為主）
  if (category) {
    where.category = {
      slug: category,
    };
  }

  let orderBy = {
    createdAt: "desc",
  };

  if (sort === "price_asc") {
    orderBy = { price: "asc" };
  }

  if (sort === "price_desc") {
    orderBy = { price: "desc" };
  }

  if (sort === "name_asc") {
    orderBy = { name: "asc" };
  }

  if (sort === "name_desc") {
    orderBy = { name: "desc" };
  }

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.product.count({
      where,
    }),
  ]);

  return ok(
    res,
    {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
    "Products fetched successfully",
  );
});

/**
 * 取得前台商品詳情
 * GET /api/products/:slug
 */
export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: "active",
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Product not found", 404);
  }

  return ok(res, product, "Product fetched successfully");
});
