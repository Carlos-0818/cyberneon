/**
 * Admin Orders Page
 *
 * Tailwind UI Block:
 * - Application UI -> Lists -> Tables
 *
 * 說明：
 * - 後台訂單管理列表頁
 * - 串接後台訂單列表 API
 * - 目前先完成列表、訂單編號搜尋、狀態篩選與 pagination
 */

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getAdminOrders } from "../services/orderService";
import { formatDate } from "../lib/formatDate";
import { formatPrice } from "../lib/formatPrice";
import {
  getOrderStatusLabel,
  getOrderStatusClass,
} from "../lib/getOrderStatus";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);

  /* === 查詢條件 === */
  const [orderNumber, setOrderNumber] = useState("");
  const [status, setStatus] = useState("");

  /* === 表單欄位 === */
  const [searchOrderNumber, setSearchOrderNumber] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * 取得訂單列表
   */
  async function fetchOrders() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getAdminOrders({
        page,
        orderNumber,
        status,
      });

      setOrders(data.orders || []);
      setPagination(data.pagination || null);
    } catch (err) {
      console.error("Failed to fetch admin orders:", err);
      setError("訂單資料讀取失敗，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [page, orderNumber, status]);

  /**
   * 取得狀態選項
   */
  const statusOptions = useMemo(() => {
    return [...new Set(orders.map((order) => order.status).filter(Boolean))];
  }, [orders]);

  /**
   * 處理訂單編號搜尋
   */
  function handleOrderNumberChange(e) {
    setSearchOrderNumber(e.target.value);
  }

  /**
   * 處理狀態篩選
   */
  function handleStatusChange(e) {
    setSelectedStatus(e.target.value);
  }

  /**
   * 套用搜尋與篩選條件
   */
  function handleSearch() {
    setOrderNumber(searchOrderNumber.trim());
    setStatus(selectedStatus);
    setPage(1);
  }

  /**
   * Enter 也能觸發搜尋
   */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  /**
   * 重設所有篩選條件
   */
  function handleClear() {
    setSearchOrderNumber("");
    setSelectedStatus("");

    setOrderNumber("");
    setStatus("");
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-main">訂單管理</h1>
            <p className="mt-3 text-text-muted">
              管理訂單列表、查看訂單詳情與追蹤訂單狀態。
            </p>
          </div>
        </div>
      </div>

      {/* === Block Start: Filters Section === */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-text-main">
              搜尋訂單
            </label>
            <input
              type="text"
              value={searchOrderNumber}
              onChange={handleOrderNumberChange}
              onKeyDown={handleKeyDown}
              placeholder="請輸入訂單編號"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              訂單狀態
            </label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
            >
              <option value="">全部狀態</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {getOrderStatusLabel(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              搜尋
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="inline-flex rounded-xl border border-border px-4 py-3 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              清除
            </button>
          </div>
        </div>
      </div>
      {/* === Block End: Filters Section === */}

      {error && (
        <div className="mt-6 rounded-2xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {/* === Block Start: Orders Table === */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        {isLoading ? (
          <div className="px-6 py-12 text-center text-sm text-text-muted">
            訂單資料讀取中
          </div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-text-muted">
            目前沒有符合條件的訂單資料
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface-subtle">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    訂單編號
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    會員帳號
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    商品數量
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    訂單金額
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    訂單狀態
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    建立時間
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-text-main">
                    操作
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-subtle/60">
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-main">
                        {order.orderNumber || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-text-muted">
                      {order.user?.email || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-text-main">
                      {order.items?.length || 0}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-text-main">
                      {formatPrice(order.totalAmount)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getOrderStatusClass(order.status)}`}
                      >
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-text-muted">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
                        >
                          查看詳情
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* === Block End: Orders Table === */}

      {/* === Block Start: Pagination === */}
      {!isLoading && !error && orders.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagination || pagination.page <= 1}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一頁
          </button>

          <div className="rounded-xl px-4 py-2 text-sm text-text-muted">
            第 {pagination.page} 頁 / 共 {pagination.totalPages} 頁
          </div>

          <button
            type="button"
            onClick={() =>
              setPage((prev) =>
                pagination ? Math.min(prev + 1, pagination.totalPages) : prev,
              )
            }
            disabled={!pagination || pagination.page >= pagination.totalPages}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            下一頁
          </button>
        </div>
      )}
      {/* === Block End: Pagination === */}
    </div>
  );
}

export default AdminOrdersPage;
