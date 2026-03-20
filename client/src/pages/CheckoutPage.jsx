/**
 * Checkout Page
 *
 * Tailwind UI Block:
 * - Application UI -> Forms -> Stacked form
 *
 * 說明：
 * - 顯示結帳頁面基本資訊
 * - 提供收件資料、訂單摘要與金額資訊
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/formatPrice";
import { createOrder } from "../services/orderService";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientPhone: "",
    shippingAddress: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  /**
   * 更新表單欄位
   */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  /**
   * 建立訂單
   */
  async function handleCreateOrder() {
    if (!formData.recipientName.trim()) {
      setError("請輸入收件人姓名");
      return;
    }

    if (!formData.recipientPhone.trim()) {
      setError("請輸入收件人電話");
      return;
    }

    if (!formData.shippingAddress.trim()) {
      setError("請輸入收件地址");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        recipientName: formData.recipientName.trim(),
        recipientPhone: formData.recipientPhone.trim(),
        shippingAddress: formData.shippingAddress.trim(),
        note: formData.note.trim(),
      };

      await createOrder(payload);

      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Failed to create order:", err);
      setError("訂單建立失敗，請稍後再試。");
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
            請確認訂單內容並填寫收件資料後建立訂單。
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
            <div className="space-y-6 lg:col-span-2">
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
                          {item.brand} / {item.categoryName || "未分類"}
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

              {/* === Block Start: Shipping Form === */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-text-main">
                  收件資訊
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="recipientName"
                      className="mb-2 block text-sm font-medium text-text-main"
                    >
                      收件人姓名
                    </label>
                    <input
                      id="recipientName"
                      name="recipientName"
                      type="text"
                      value={formData.recipientName}
                      onChange={handleChange}
                      placeholder="請輸入收件人姓名"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="recipientPhone"
                      className="mb-2 block text-sm font-medium text-text-main"
                    >
                      收件人電話
                    </label>
                    <input
                      id="recipientPhone"
                      name="recipientPhone"
                      type="text"
                      value={formData.recipientPhone}
                      onChange={handleChange}
                      placeholder="請輸入收件人電話"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="shippingAddress"
                      className="mb-2 block text-sm font-medium text-text-main"
                    >
                      收件地址
                    </label>
                    <input
                      id="shippingAddress"
                      name="shippingAddress"
                      type="text"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      placeholder="請輸入收件地址"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="note"
                      className="mb-2 block text-sm font-medium text-text-main"
                    >
                      備註
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={4}
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="可填寫備註（選填）"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              {/* === Block End: Shipping Form === */}
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

                {error && (
                  <div className="mt-6 rounded-xl border border-danger/20 bg-surface p-4 text-sm text-danger">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCreateOrder}
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "建立訂單中..." : "建立訂單"}
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
