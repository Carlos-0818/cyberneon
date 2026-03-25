/**
 * Admin Layout
 *
 * Tailwind UI Block:
 * - Application UI -> Application Shells -> Sidebar Layouts -> With off-white background
 *
 * 說明：
 * - 後台共用版型
 * - 左側為 Admin 導覽列
 * - 右側為後台頁面內容區
 */

import { Link, NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  function getNavLinkClassName({ isActive }) {
    const baseClassName =
      "block rounded-xl px-4 py-3 text-sm font-medium transition";

    if (isActive) {
      return `${baseClassName} bg-primary text-white shadow-soft`;
    }

    return `${baseClassName} text-text-main hover:bg-surface-muted`;
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="flex min-h-screen">
        {/* === Block Start: Admin Sidebar === */}
        <aside className="hidden w-72 border-r border-border bg-surface lg:flex lg:flex-col">
          <div className="border-b border-border px-6 py-6">
            <Link to="/admin" className="block">
              <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
                CyberNeon
              </p>
              <h1 className="mt-2 text-2xl font-bold text-text-main">Admin</h1>
            </Link>
          </div>

          <div className="flex-1 px-4 py-6">
            <p className="px-2 text-xs font-semibold uppercase tracking-wide text-text-subtle">
              後台功能
            </p>

            <nav className="mt-4 space-y-2">
              <NavLink to="/admin" end className={getNavLinkClassName}>
                後台首頁
              </NavLink>

              <NavLink to="/admin/products" className={getNavLinkClassName}>
                商品管理
              </NavLink>

              <NavLink to="/admin/orders" className={getNavLinkClassName}>
                訂單管理
              </NavLink>
            </nav>
          </div>

          <div className="border-t border-border p-4">
            <Link
              to="/"
              className="block rounded-xl border border-border px-4 py-3 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              返回前台
            </Link>
          </div>
        </aside>
        {/* === Block End: Admin Sidebar === */}

        {/* === Block Start: Admin Main Content === */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* === Block Start: Admin Mobile Header === */}
          <header className="border-b border-border bg-surface px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <Link to="/admin">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
                    CyberNeon
                  </p>
                  <h1 className="text-lg font-bold text-text-main">Admin</h1>
                </div>
              </Link>

              <Link
                to="/"
                className="inline-flex rounded-xl border border-border px-4 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
              >
                返回前台
              </Link>
            </div>

            <nav className="mt-4 grid grid-cols-2 gap-2">
              <NavLink to="/admin" end className={getNavLinkClassName}>
                後台首頁
              </NavLink>

              <NavLink to="/admin/products" className={getNavLinkClassName}>
                商品管理
              </NavLink>
            </nav>
          </header>
          {/* === Block End: Admin Mobile Header === */}

          {/* === Block Start: Admin Page Content === */}
          <main className="flex-1">
            <Outlet />
          </main>
          {/* === Block End: Admin Page Content === */}
        </div>
        {/* === Block End: Admin Main Content === */}
      </div>
    </div>
  );
}

export default AdminLayout;
