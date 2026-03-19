/**
 * RequireGuest
 *
 * 說明：
 * - 限制只有未登入使用者才能進入的頁面
 * - 已登入時導回首頁
 */

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function RequireGuest() {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-surface-subtle">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-surface px-6 py-4 text-sm text-text-muted shadow-soft">
            會員狀態確認中...
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RequireGuest;
