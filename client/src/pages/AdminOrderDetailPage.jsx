/**
 * Admin Order Detail Page
 *
 * Tailwind UI Block:
 * - Application UI -> Lists -> Stacked cards
 *
 * 說明：
 * - 後台訂單詳情頁
 * - 顯示訂單基本資訊、收件資訊、商品明細
 * - 提供訂單狀態更新功能
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getAdminOrderById,
  updateAdminOrderStatus,
} from "../services/orderService";
import { formatPrice } from "../lib/formatPrice";
import { formatDate } from "../lib/formatDate";
import {
  getOrderStatusLabel,
  getOrderStatusClass,
} from "../lib/getOrderStatus";

function AdminOrderDetailPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const statusOptions = [
    "pending",
    "paid",
    "shipped",
    "completed",
    "cancelled",
  ];

  /**
   * 取得訂單詳情
   */
  async function fetchOrder() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getAdminOrderById(id);

      setOrder(data);
      setSelectedStatus(data.status || "");
    } catch (err) {
      console.error("Failed to fetch admin order:", err);
      setError("訂單詳情讀取失敗，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [id]);

  /**
   * 處理狀態選擇
   */
  function handleStatusChange(e) {
    setSelectedStatus(e.target.value);
  }

  /**
   * 更新訂單狀態
   */
  async function handleUpdateStatus() {
    if (!order) return;

    const confirmUpdate = window.confirm("確定要更新訂單狀態嗎？");

    if (!confirmUpdate) return;

    try {
      setIsSubmitting(true);
      setError("");

      const updatedOrder = await updateAdminOrderStatus(order.id, {
        status: selectedStatus,
      });

      setOrder(updatedOrder);
      setSelectedStatus(updatedOrder.status || "");
      alert("訂單狀態更新成功。");
    } catch (err) {
      console.error("Failed to update order status:", err);
      setError("訂單狀態更新失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center text-sm text-text-muted shadow-soft">
          訂單詳情讀取中...
        </div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-danger/30 bg-danger/5 px-6 py-12 text-center text-sm text-danger shadow-soft">
          {error}
        </div>

        <div className="mt-6">
          <Link
            to="/admin/orders"
            className="inline-flex rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
          >
            返回訂單列表
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-text-main">訂單詳情</h1>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getOrderStatusClass(order.status)}`}
              >
                {getOrderStatusLabel(order.status)}
              </span>
            </div>

            <p className="mt-3 text-text-muted">
              訂單編號：{order.orderNumber || "-"}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              建立時間：{formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/admin/orders"
              className="inline-flex rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              返回訂單列表
            </Link>
          </div>
        </div>
      </div>

      {/* === Block Start: Status Update === */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-text-main">訂單狀態管理</h2>
        <p className="mt-2 text-sm text-text-muted">可於此更新目前訂單狀態</p>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="w-full md:max-w-xs">
            <label className="mb-2 block text-sm font-medium text-text-main">
              訂單狀態
            </label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {getOrderStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleUpdateStatus}
            disabled={isSubmitting || selectedStatus === order.status}
            className="inline-flex rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "更新中..." : "更新訂單狀態"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-danger">
            {error}
          </div>
        )}
      </div>
      {/* === Block End: Status Update === */}

      {/* === Block Start: Order summary === */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-text-main">訂單資訊</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="text-text-muted">訂單編號</p>
              <p className="mt-1 font-medium text-text-main">
                {order.orderNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-text-muted">會員帳號</p>
              <p className="mt-1 font-medium text-text-main">
                {order.user?.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-text-muted">訂單狀態</p>
              <p className="mt-1 font-medium text-text-main">
                {getOrderStatusLabel(order.status)}
              </p>
            </div>

            <div>
              <p className="text-text-muted">建立時間</p>
              <p className="mt-1 font-medium text-text-main">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-text-muted">訂單總金額</p>
              <p className="mt-1 font-medium text-text-main">
                {formatPrice(order.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-text-main">收件資訊</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="text-text-muted">收件人姓名</p>
              <p className="mt-1 font-medium text-text-main">
                {order.recipientName || "-"}
              </p>
            </div>

            <div>
              <p className="text-text-muted">收件人電話</p>
              <p className="mt-1 font-medium text-text-main">
                {order.recipientPhone || "-"}
              </p>
            </div>

            <div>
              <p className="text-text-muted">配送地址</p>
              <p className="mt-1 font-medium leading-6 text-text-main">
                {order.shippingAddress || "-"}
              </p>
            </div>

            <div>
              <p className="text-text-muted">備註</p>
              <p className="mt-1 font-medium leading-6 text-text-main">
                {order.note || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* === Block End: Order summary === */}

      {/* === Block Start: Order Items === */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-text-main">訂單商品明細</h2>
        </div>

        {!order.items || order.items.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-text-muted">
            目前沒有商品資料
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface-subtle">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    商品名稱
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    商品 Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    單價
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    數量
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    小計
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-subtle/60">
                    <td className="px-6 py-4 font-medium text-text-main">
                      {item.productName || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {item.productSlug || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-main">
                      {formatPrice(item.unitPrice)}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-main">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-main">
                      {formatPrice(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* === Block End: Order Items === */}
    </div>
  );
}

export default AdminOrderDetailPage;
