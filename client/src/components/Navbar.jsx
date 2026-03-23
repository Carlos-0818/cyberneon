/**
 * Navbar
 *
 * Tailwind UI Block:
 * - Application UI → Navigation → Simple
 *
 * 說明：
 * - 顯示前台主要導覽
 * - 顯示購物車數量
 * - 顯示登入狀態、我的訂單與登出入口
 */

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  /**
   * 處理登出
   */
  function handleLogout() {
    logout();
    navigate("/");
  }

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

          {/* === Navigation === */}
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

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-text-main"
                  : "text-text-muted transition hover:text-text-main"
              }
            >
              購物車 ({cartCount})
            </NavLink>

            {/* === Block Start: Auth === */}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-text-main"
                      : "text-text-muted transition hover:text-text-main"
                  }
                >
                  我的訂單
                </NavLink>

                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "text-text-main"
                        : "text-text-muted transition hover:text-text-main"
                    }
                  >
                    後台管理
                  </NavLink>
                )}

                <span className="text-text-muted">{user?.email}</span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-text-muted transition hover:text-text-main"
                >
                  登出
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-text-main"
                      : "text-text-muted transition hover:text-text-main"
                  }
                >
                  登入
                </NavLink>

                <NavLink
                  to="/auth/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-text-main"
                      : "text-text-muted transition hover:text-text-main"
                  }
                >
                  註冊
                </NavLink>
              </>
            )}
            {/* === Block End: Auth === */}
          </nav>
        </div>
      </header>
      {/* === Block End: Navbar === */}
    </>
  );
}

export default Navbar;
