/**
 * Order Detail Page
 *
 * Tailwind UI Block:
 * - Application UI -> Lists -> Stacked cards
 *
 * 說明：
 * - 顯示單一訂單詳情
 * - 顯示訂單資訊、收件資訊、商品明細與金額資訊
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";
import { formatPrice } from "../lib/formatPrice";

function OrderDetailPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order detail:", err);
        setError("訂單資料讀取失敗，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-main">訂單詳情</h1>
              <p className="mt-3 text-text-muted">
                查看訂單內容、收件資訊與金額明細。
              </p>
            </div>

            <Link
              to="/orders"
              className="inline-flex rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              返回訂單列表
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

        {!isLoading && !error && order && (
          <div className="space-y-6">
            {/* === Block Start: Order Meta === */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-text-main">訂單資訊</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-text-muted">訂單編號</p>
                  <p className="mt-1 font-medium text-text-main">
                    {order.orderNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-muted">建立時間</p>
                  <p className="mt-1 font-medium text-text-main">
                    {new Date(order.createdAt).toLocaleString("zh-TW")}
                  </p>
                </div>
              </div>
            </div>
            {/* === Block End: Order Meta === */}

            {/* === Block Start: Shipping Info === */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-text-main">收件資訊</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-text-muted">收件人姓名</p>
                  <p className="mt-1 font-medium text-text-main">
                    {order.recipientName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-muted">收件人電話</p>
                  <p className="mt-1 font-medium text-text-main">
                    {order.recipientPhone}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-sm text-text-muted">收件地址</p>
                  <p className="mt-1 font-medium text-text-main">
                    {order.shippingAddress}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-sm text-text-muted">備註</p>
                  <p className="mt-1 font-medium text-text-main">
                    {order.note || "無"}
                  </p>
                </div>
              </div>
            </div>
            {/* === Block End: Shipping Info === */}

            {/* === Block Start: Order Items === */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-text-main">商品明細</h2>

              <div className="mt-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-text-main">
                        {item.productName}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">
                        數量：{item.quantity}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">
                        單價：{formatPrice(item.unitPrice)}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm text-text-muted">小計</p>
                      <p className="mt-1 font-semibold text-text-main">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* === Block End: Order Items === */}

            {/* === Block Start: Order Total === */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-text-main">金額資訊</h2>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="font-medium text-text-main">訂單總金額</span>
                <span className="text-lg font-bold text-text-main">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
            {/* === Block End: Order Total === */}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetailPage;
