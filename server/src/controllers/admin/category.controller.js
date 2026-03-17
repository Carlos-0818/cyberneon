/**
 * Admin Category Controller
 * 負責處理後台分類管理 API
 */

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";
import { ok } from "../../utils/response.js";
import { AppError } from "../../utils/AppError.js";
import { ERROR_CODES } from "../../constants/errorCodes.js";

/**
 * 取得分類列表
 * GET /api/admin/categories
 */
export const getAdminCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return ok(res, categories, "Admin categories fetched successfully");
});

/**
 * 取得分類詳情
 * GET /api/admin/categories/:id
 */
export const getAdminCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Category not found", 404);
  }

  return ok(res, category, "Admin category fetched successfully");
});

/**
 * 建立分類
 * POST /api/admin/categories
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, status } = req.body;

  // 檢查 slug 是否重複
  const existingSlug = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (existingSlug) {
    throw new AppError(ERROR_CODES.CONFLICT, "Slug already exists", 409);
  }

  const category = await prisma.category.create({
    data: {
      name,
      slug,
      description,
      status,
    },
  });

  return ok(
    res,
    category,
    "Admin category created successfully",
    ERROR_CODES.OK,
    201,
  );
});

/**
 * 更新分類
 * PATCH /api/admin/categories/:id
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const existingCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!existingCategory) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Category not found", 404);
  }

  // 若更新 slug，需檢查是否重複
  if (updateData.slug) {
    const existingSlug = await prisma.category.findUnique({
      where: {
        slug: updateData.slug,
      },
    });

    if (existingSlug && existingSlug.id !== id) {
      throw new AppError(ERROR_CODES.CONFLICT, "Slug already exists", 409);
    }
  }

  const category = await prisma.category.update({
    where: {
      id,
    },
    data: updateData,
  });

  return ok(res, category, "Admin category updated successfully");
});

/**
 * 刪除分類
 * DELETE /api/admin/categories/:id
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!existingCategory) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Category not found", 404);
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  return ok(res, null, "Admin category deleted successfully");
});
