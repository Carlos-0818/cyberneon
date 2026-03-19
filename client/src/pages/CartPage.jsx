/**
 * Cart Page
 *
 * 說明：
 * - 顯示購物車商品
 * - Phase 1 提供商品列表、數量控制與總金額
 */

import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/formatPrice";

function CartPage() {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-text-main">購物車</h1>

        {cartItems.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-text-muted">
            購物車目前沒有商品
            <div className="mt-4">
              <Link to="/" className="text-primary hover:underline">
                前往商品列表
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* === Block Start: Cart List === */}
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-2xl border border-border bg-surface p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* 左側：商品資訊 */}
                    <div className="flex min-w-0 flex-1 gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-text-subtle">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <Link
                          to={`/products/${item.slug}`}
                          className="font-medium text-text-main hover:text-primary"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-sm text-text-muted">
                          {item.brand}
                        </p>

                        <p className="mt-1 text-sm text-text-subtle">
                          {item.categoryName || "未分類"}
                        </p>

                        <p className="mt-3 text-sm text-text-muted">
                          單價：{formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* 右側：操作區 */}
                    <div className="flex flex-col gap-3 sm:items-end">
                      {/* === Block Start: Cart Quantity Control === */}
                      <div className="flex items-center rounded-xl border border-border bg-surface">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.productId,
                              item.quantity - 1,
                            )
                          }
                          className="px-3 py-2 text-sm text-text-main transition hover:bg-surface-muted"
                        >
                          -
                        </button>

                        <span className="px-4 py-2 text-sm text-text-main">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="px-3 py-2 text-sm text-text-main transition hover:bg-surface-muted"
                        >
                          +
                        </button>
                      </div>
                      {/* === Block End: Cart Quantity Control === */}

                      <p className="text-right font-semibold text-text-main">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-sm text-danger hover:underline"
                      >
                        移除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* === Block End: Cart List === */}

            {/* === Block Start: Cart Summary === */}
            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-xs rounded-2xl border border-border bg-surface p-6 text-right shadow-soft">
                <p className="text-sm text-text-muted">總金額</p>
                <p className="mt-2 text-xl font-bold text-text-main">
                  {formatPrice(totalPrice)}
                </p>

                {/* === Block Start: Checkout Button === */}
                <Link
                  to="/checkout"
                  className="mt-6 block w-full rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-primary-hover"
                >
                  前往結帳
                </Link>
                {/* === Block End: Checkout Button === */}
              </div>
            </div>
            {/* === Block End: Cart Summary === */}
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
