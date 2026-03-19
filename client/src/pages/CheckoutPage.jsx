/**
 * Checkout Page
 *
 * Tailwind UI Block:
 * - Application UI -> Forms -> Stacked form
 *
 * 說明：
 * - 顯示結帳頁面基本資訊
 * - Phase 1 先作為 checkout stub
 * - 後續再補收件資料、付款方式、建立訂單流程
 */

import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/formatPrice";

function CheckoutPage() {
  const { cartItems } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  /**
   * 建立訂單（Phase 1 stub）
   */
  async function handleCreateOrder() {
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });

      setSubmitMessage("訂單建立成功（Phase 1 stub），後續會串接正式 API。");
    } catch (err) {
      console.error("Failed to create order:", err);
      setSubmitMessage("訂單建立失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <h1 className="text-3xl font-bold text-text-main">結帳頁面</h1>
          <p className="mt-3 text-text-muted">
            目前為 Phase 1 checkout stub，後續會補上完整下單流程。
          </p>
        </div>

        {cartItems.length === 0 ? (
          <>
            {/* === Block Start: Empty Checkout === */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-text-main">
                購物車目前沒有商品
              </h2>
              <p className="mt-3 text-text-muted">
                目前無法進行結帳，請先返回商品列表加入商品後再繼續。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                >
                  前往商品列表
                </Link>

                <Link
                  to="/cart"
                  className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
                >
                  返回購物車
                </Link>
              </div>
            </div>
            {/* === Block End: Empty Checkout === */}
          </>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* === Block Start: Checkout Summary === */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-main">
                    訂單摘要
                  </h2>
                  <Link
                    to="/cart"
                    className="text-sm text-primary transition hover:text-primary-hover"
                  >
                    返回購物車
                  </Link>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 rounded-xl border border-border p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-text-main">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                          {item.brand} / {item.category}
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                          數量：{item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-text-main">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* === Block End: Checkout Summary === */}

            {/* === Block Start: Checkout Sidebar === */}
            <div>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-text-main">
                  金額資訊
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <span>商品總金額</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <span>運費</span>
                    <span>尚未計算</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-main">
                        應付總額
                      </span>
                      <span className="text-lg font-bold text-text-main">
                        {formatPrice(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {submitMessage && (
                  <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm text-text-muted">
                    {submitMessage}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCreateOrder}
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "建立訂單中..." : "建立訂單（Phase 1 stub）"}
                </button>
              </div>
            </div>
            {/* === Block End: Checkout Sidebar === */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
