/**
 * Admin Product Controller
 * 負責處理後台商品管理 API
 */

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";
import { ok } from "../../utils/response.js";
import { AppError } from "../../utils/AppError.js";
import { ERROR_CODES } from "../../constants/errorCodes.js";

/**
 * 取得後台商品列表
 * GET /api/admin/products
 */
export const getAdminProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const keyword = req.query.keyword?.trim() || "";
  const status = req.query.status?.trim() || "";

  const skip = (page - 1) * limit;

  const where = {};

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

  // 狀態篩選
  if (status) {
    where.status = status;
  }

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
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
    "Admin products fetched successfully",
  );
});

/**
 * 取得後台商品詳情
 * GET /api/admin/products/:id
 */
export const getAdminProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Product not found", 404);
  }

  return ok(res, product, "Admin product fetched successfully");
});

/**
 * 新增商品
 * POST /api/admin/products
 */
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    brand,
    price,
    stock,
    images,
    specs,
    description,
    status,
    categoryId,
  } = req.body;

  // 檢查 slug 是否已經存在
  const existingProduct = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (existingProduct) {
    throw new AppError(ERROR_CODES.CONFLICT, "Slug already exists", 409);
  }

  // 檢查 category 是否存在
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Category not found", 404);
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      brand,
      price,
      stock,
      images,
      specs,
      description,
      status,
      categoryId,
    },
    include: {
      category: true,
    },
  });

  return ok(
    res,
    product,
    "Admin product created successfully",
    ERROR_CODES.OK,
    201,
  );
});

/**
 * 更新商品
 * PATCH /api/admin/products/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!existingProduct) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Product not found", 404);
  }

  // 如果 slug 有更新，需檢查 slug 是否有重複
  if (updateData.slug) {
    const existingSlugProduct = await prisma.product.findUnique({
      where: {
        slug: updateData.slug,
      },
    });

    if (existingSlugProduct && existingSlugProduct.id !== id) {
      throw new AppError(ERROR_CODES.CONFLICT, "Slug already exists", 409);
    }
  }

  // 如果 categoryId 有更新，需檢查 categoryId 是否存在
  if (updateData.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: updateData.categoryId,
      },
    });

    if (!category) {
      throw new AppError(ERROR_CODES.NOT_FOUND, "Category not found", 404);
    }
  }

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      category: true,
    },
  });

  return ok(res, product, "Admin product updated successfully");
});

/**
 * 刪除商品
 * DELETE /api/admin/products/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: {
      id,
    },
  });

  return ok(res, null, "Admin product deleted successfully");
});
