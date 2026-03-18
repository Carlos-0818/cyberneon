/**
 * Navbar
 *
 * Tailwind UI Block:
 * - Application UI → Navigation → Simple
 *
 * 說明：
 * - 後續會加入 Auth / Cart / Admin 入口
 */

import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* === Block Start: Navbar === */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-semibold text-text-main transition hover:text-primary"
          >
            CyberNeon
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-text-main"
                  : "text-text-muted transition hover:text-text-main"
              }
            >
              商品列表
            </NavLink>

            {/* 預留 */}
            <button
              type="button"
              className="cursor-not-allowed text-text-subtle"
            >
              登入
            </button>

            <button
              type="button"
              className="cursor-not-allowed text-text-subtle"
            >
              註冊
            </button>
          </nav>
        </div>
      </header>
      {/* === Block End: Navbar === */}
    </>
  );
}

export default Navbar;
