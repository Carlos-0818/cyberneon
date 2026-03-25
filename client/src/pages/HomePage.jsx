/**
 * Home Page
 *
 * Tailwind UI Block:
 * - Marketing -> Page Sections -> Hero sections
 *
 * 說明：
 * - 前台首頁
 * - 提供品牌介紹與導購入口
 * - Phase 1 使用靜態內容展示
 */

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-surface-subtle">
      {/* === Block Start: Hero Section === */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-text-main sm:text-5xl">
              打造你的下一台
              <br />
              夢幻主機
            </h1>

            <p className="mt-6 text-lg leading-8 text-text-muted">
              CyberNeon 提供 CPU、GPU、SSD、RAM 等熱門零組件，
              幫助你快速打造最適合的電腦配置。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
              >
                立即選購
              </Link>

              <Link
                to="/cart"
                className="rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-text-main transition hover:bg-surface-muted"
              >
                查看購物車
              </Link>
            </div>
          </div>

          {/* === 右側展示區（簡單卡片） === */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <p className="text-sm text-text-muted">熱門分類</p>
              <p className="mt-2 text-lg font-semibold text-text-main">CPU</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <p className="text-sm text-text-muted">熱門分類</p>
              <p className="mt-2 text-lg font-semibold text-text-main">GPU</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <p className="text-sm text-text-muted">熱門分類</p>
              <p className="mt-2 text-lg font-semibold text-text-main">SSD</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <p className="text-sm text-text-muted">熱門分類</p>
              <p className="mt-2 text-lg font-semibold text-text-main">RAM</p>
            </div>
          </div>
        </div>
      </section>
      {/* === Block End: Hero Section === */}

      {/* === Block Start: Features Section === */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-text-main">精選零組件</h3>
            <p className="mt-3 text-sm text-text-muted">
              嚴選熱門與高性價比產品，輕鬆找到適合你的配置。
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-text-main">
              清楚規格資訊
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              詳細規格整理，快速比較不同產品差異。
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-text-main">
              流暢購物體驗
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              從瀏覽到結帳，提供直覺且順暢的購物流程。
            </p>
          </div>
        </div>
      </section>
      {/* === Block End: Features Section === */}

      {/* === Block Start: CTA Section === */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-main sm:text-3xl">
          準備開始打造你的 CyberNeon 主機了嗎？
        </h2>

        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            前往商品列表
          </Link>
        </div>
      </section>
      {/* === Block End: CTA Section === */}
    </div>
  );
}

export default HomePage;
