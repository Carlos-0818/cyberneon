/**
 * Order Controller
 * 負責處理訂單相關 API
 */

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import { ok } from "../utils/response.js";
import { AppError } from "../utils/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

/**
 * 產生訂單編號
 */
function generateOrderNumber() {
  return `ORD-${Date.now()}`;
}

/**
 * 建立訂單
 * POST /api/orders
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { items, recipientName, recipientPhone, shippingAddress, note } =
    req.body;

  const userId = req.user.id;

  // 先取出所有 producId
  const productIds = items.map((item) => item.productId);

  // 查詢商品資料
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // 建立 product 對照表，方便後續快速查找
  const productMap = new Map(products.map((product) => [product.id, product]));

  let totalAmount = 0;
  const orderItemsData = [];

  for (const item of items) {
    const product = productMap.get(item.productId);

    // 檢查商品是否存在
    if (!product) {
      throw new AppError(ERROR_CODES.NOT_FOUND, "Product not found", 404);
    }

    // 檢查商品狀態是否可販售
    if (product.status !== "active") {
      throw new AppError(
        ERROR_CODES.BAD_REQUEST,
        "Product is not available",
        400,
      );
    }

    // 檢查庫存
    if (item.quantity > product.stock) {
      throw new AppError(ERROR_CODES.BAD_REQUEST, "Insufficient stock", 400);
    }

    const subtotal = product.price * item.quantity;
    totalAmount += subtotal;

    // 建立商品快照
    orderItemsData.push({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      unitPrice: product.price,
      quantity: item.quantity,
      subtotal,
    });
  }

  const orderNumber = generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    // 建立訂單
    const createdOrder = await tx.order.create({
      data: {
        orderNumber,
        totalAmount,
        recipientName,
        recipientPhone,
        shippingAddress,
        note,
        userId,
      },
    });

    // 建立訂單明細
    await tx.orderItem.createMany({
      data: orderItemsData.map((item) => ({
        ...item,
        orderId: createdOrder.id,
      })),
    });

    // 扣庫存
    for (const item of items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // 回傳完整訂單資料
    return tx.order.findUnique({
      where: {
        id: createdOrder.id,
      },
      include: {
        items: true,
      },
    });
  });

  return ok(res, order, "Order created successfully", ERROR_CODES.OK, 201);
});

/**
 * 取得當前使用者的訂單列表
 * GET /api/orders
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ok(res, orders, "Orders fetched successfully");
});

/**
 * 取得當前使用者的訂單詳情
 * GET /api/orders/:id
 */
export const getMyOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Order not found", 404);
  }

  return ok(res, order, "Order fetched successfully");
});
