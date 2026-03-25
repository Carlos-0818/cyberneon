/**
 * Auth Context
 *
 * 說明：
 * - 管理前端登入狀態
 * - Phase 1 使用 localStorage 保存 token 與 user
 * - 初始化時會用 /users/me 同步目前登入者資訊
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  signup as signupRequest,
  login as loginRequest,
  getMe,
} from "../services/authService";

const AuthContext = createContext(null);

const AUTH_TOKEN_STORAGE_KEY = "cyberneon_token";
const AUTH_USER_STORAGE_KEY = "cyberneon_user";

/**
 * 讀取初始 token
 */
function getInitialToken() {
  try {
    const storedToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    return storedToken || "";
  } catch (err) {
    console.error("Failed to read auth token from localStorage:", err);
    return "";
  }
}

/**
 * 讀取初始 user
 */
function getInitialUser() {
  try {
    const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Failed to parse auth user from localStorage:", err);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getInitialToken);
  const [user, setUser] = useState(getInitialUser);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  /**
   * 寫入登入資訊
   */
  function saveAuthData(data) {
    setToken(data.token || "");
    setUser(data.user || null);

    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.token || "");
    localStorage.setItem(
      AUTH_USER_STORAGE_KEY,
      JSON.stringify(data.user || null),
    );
  }

  /**
   * 清除登入資訊
   */
  function clearAuthData() {
    setToken("");
    setUser(null);

    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  }

  /**
   * 初始化驗證登入狀態
   */
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const userData = await getMe();

        setUser(userData || null);
        localStorage.setItem(
          AUTH_USER_STORAGE_KEY,
          JSON.stringify(userData || null),
        );
      } catch (err) {
        console.error("Failed to get current user:", err);
        clearAuthData();
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, [token]);

  /**
   * 註冊
   */
  async function signup(payload) {
    const data = await signupRequest(payload);
    saveAuthData(data);
    return data;
  }

  /**
   * 登入
   */
  async function login(payload) {
    const data = await loginRequest(payload);
    saveAuthData(data);
    return data;
  }

  /**
   * 登出
   */
  function logout() {
    clearAuthData();
  }

  /**
   * 驗證是否已經登入
   */
  const isAuthenticated = useMemo(() => {
    return Boolean(token);
  }, [token]);

  const value = {
    user,
    token,
    isAuthenticated,
    isCheckingAuth,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
