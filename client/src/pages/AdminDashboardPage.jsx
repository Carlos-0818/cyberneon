/**
 * Admin Dashboard Page
 *
 * Tailwind UI Block:
 * - Application UI -> Lists -> Stacked cards
 *
 * 說明：
 * - 後台首頁
 * - Phase 1 先提供可展示的 dashboard 骨架
 * - 目前先使用假資料顯示摘要資訊
 */

import { Link } from "react-router-dom";

function AdminDashboardPage() {
  // 假資料：Phase 1 先作為 dashboard 展示用
  const summaryCards = [
    {
      id: "products",
      title: "商品總數",
      value: "24",
      description: "目前商品資料已建立完成，可持續擴充。",
    },
    {
      id: "active-products",
      title: "上架中商品",
      value: "18",
      description: "目前可在前台顯示與販售的商品數量。",
    },
    {
      id: "orders",
      title: "訂單總數",
      value: "12",
      description: "目前系統內已建立的訂單筆數，可進一步查看詳情。",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-main">後台首頁</h1>
            <p className="mt-3 text-text-muted">
              歡迎進入 CyberNeon Admin，這裡提供管理商品與後台功能。
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/admin/products"
              className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              前往商品管理
            </Link>

            <Link
              to="/"
              className="inline-flex rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              返回前台
            </Link>
          </div>
        </div>
      </div>

      {/* === Block Start: Summary Cards === */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-border bg-surface p-6 shadow-soft"
          >
            <p className="text-sm font-medium text-text-muted">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-text-main">
              {card.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      {/* === Block End: Summary Cards === */}

      {/* === Block Start: Quick Actions === */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <h2 className="text-xl font-semibold text-text-main">快速操作</h2>
        <p className="mt-3 text-text-muted">
          目前 Phase 1
          僅提供商品管理與訂單管理入口，未來會逐步補上更多後台功能。
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            to="/admin/products"
            className="rounded-2xl border border-border bg-surface-subtle p-6 transition hover:border-primary/40 hover:bg-surface"
          >
            <h3 className="text-lg font-semibold text-text-main">商品管理</h3>
            <p className="mt-2 text-sm text-text-muted">
              查看商品列表、狀態、價格與庫存資訊。
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="rounded-2xl border border-border bg-surface-subtle p-6 transition hover:border-primary/40 hover:bg-surface"
          >
            <h3 className="text-lg font-semibold text-text-main">訂單管理</h3>
            <p className="mt-2 text-sm text-text-muted">
              查看訂單列表、訂單詳情與後續狀態管理。
            </p>
          </Link>

          <Link
            to="/"
            className="rounded-2xl border border-border bg-surface-subtle p-6 transition hover:border-primary/40 hover:bg-surface"
          >
            <h3 className="text-lg font-semibold text-text-main">前台首頁</h3>
            <p className="mt-2 text-sm text-text-muted">
              返回前台頁面，查看商品展示與購物流程。
            </p>
          </Link>
        </div>
      </div>
      {/* === Block End: Quick Actions === */}
    </div>
  );
}

export default AdminDashboardPage;
