/**
 * Require Admin Route Guard
 *
 * 說明：
 * - 保護後台頁面（/admin）
 * - 必須登入且角色為 admin 才可進入
 */

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function RequireAdmin() {
  const { user, isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RequireAdmin;
