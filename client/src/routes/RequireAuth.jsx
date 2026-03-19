/**
 * RequireAuth
 *
 * 說明：
 * - 保護需要登入才能進入的頁面
 * - 未登入時導向登入頁
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function RequireAuth() {
  const location = useLocation();
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

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
