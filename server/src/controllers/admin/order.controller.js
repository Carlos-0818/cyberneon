/**
 * Admin Order Controller
 * 負責處理後台訂單管理 API
 */

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";
import { ok } from "../../utils/response.js";
import { AppError } from "../../utils/AppError.js";
import { ERROR_CODES } from "../../constants/errorCodes.js";

/**
 * 取得後台訂單列表
 * GET /api/admin/orders
 */
export const getAdminOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status?.trim() || "";
  const orderNumber = req.query.orderNumber?.trim() || "";

  const skip = (page - 1) * limit;

  const where = {};

  // 狀態篩選
  if (status) {
    where.status = status;
  }

  // 訂單編號搜尋
  if (orderNumber) {
    where.orderNumber = {
      contains: orderNumber,
      mode: "insensitive",
    };
  }

  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.order.count({
      where,
    }),
  ]);

  return ok(
    res,
    {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
    "Admin orders fetched successfully",
  );
});

/**
 * 取得後台訂單詳情
 * GET /api/admin/orders/:id
 */
export const getAdminOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      items: true,
    },
  });

  if (!order) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Order not found", 404);
  }

  return ok(res, order, "Admin order fetched successfully");
});

/**
 * 更新訂單狀態
 * PATCH /api/admin/orders/:id/status
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const existingOrder = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!existingOrder) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Order not found", 404);
  }

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      items: true,
    },
  });

  return ok(res, order, "Admin order status updated successfully");
});
