/**
 * Order Success Page
 *
 * Tailwind UI Block:
 * - Application UI -> Feedback -> Success message
 *
 * 說明：
 * - 顯示訂單建立成功訊息
 * - 顯示訂單編號
 * - 提供後續導覽入口
 */

import { Link, useLocation, Navigate } from "react-router-dom";

function OrderSuccessPage() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || "";

  if (!orderNumber) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {/* === Block Start: Order Success Card === */}
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <div className="text-center">
            <p className="text-sm font-medium text-primary">訂單已建立</p>
            <h1 className="mt-3 text-3xl font-bold text-text-main">下單成功</h1>
            <p className="mt-3 text-text-muted">
              感謝您的訂購，我們已收到您的訂單，將會盡速處理。
            </p>

            {orderNumber && (
              <div className="mt-6 rounded-xl border border-border bg-surface-subtle p-4">
                <p className="text-sm text-text-muted">訂單編號</p>
                <p className="mt-2 text-lg font-semibold text-text-main">
                  {orderNumber}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/orders"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              查看我的訂單
            </Link>

            <Link
              to="/products"
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              繼續逛商品
            </Link>
          </div>
        </div>
        {/* === Block End: Order Success Card === */}
      </div>
    </div>
  );
}

export default OrderSuccessPage;
