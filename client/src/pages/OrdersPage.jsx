/**
 * Orders Page
 *
 * Tailwind UI Block:
 * - Application UI -> Lists -> Stacked cards
 *
 * 說明：
 * - 顯示目前登入使用者的訂單列表
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyOrders } from "../services/orderService";
import { formatPrice } from "../lib/formatPrice";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("訂單資料讀取失敗，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-main">我的訂單</h1>
              <p className="mt-3 text-text-muted">查看訂單狀態與歷史訂單</p>
            </div>

            <Link
              to="/products"
              className="inline-flex rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              前往商品列表
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-border bg-surface p-6 text-text-muted shadow-soft">
            訂單資料載入中...
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-2xl border border-danger/20 bg-surface p-6 text-danger shadow-soft">
            {error}
          </div>
        )}

        {!isLoading && !error && orders.length === 0 && (
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-text-main">
              目前沒有訂單
            </h2>
            <p className="mt-3 text-text-muted">
              您目前尚未建立任何訂單，請先前往商品列表進行選購。
            </p>

            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
              >
                前往商品列表
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {/* === Block Start: Orders List === */}
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block rounded-2xl border border-border bg-surface p-6 shadow-soft transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-text-muted">訂單編號</p>
                    <p className="mt-1 text-lg font-semibold text-text-main">
                      {order.orderNumber}
                    </p>

                    <p className="mt-3 text-sm text-text-muted">
                      建立時間：
                      {new Date(order.createdAt).toLocaleString("zh-TW")}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-text-muted">訂單總金額</p>
                    <p className="mt-1 text-lg font-bold text-text-main">
                      {formatPrice(order.totalAmount)}
                    </p>

                    <p className="mt-3 text-sm text-primary">查看訂單詳情</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* === Block End: Orders List === */}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
