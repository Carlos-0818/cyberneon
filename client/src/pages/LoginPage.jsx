/**
 * Login Page
 *
 * Tailwind UI Block:
 * - Application UI -> Forms -> Sign-in and Registration -> Simple sign in form
 *
 * 說明：
 * - 提供會員登入表單
 * - 登入成功後導回首頁或原本要前往的頁面
 */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  /**
   * 更新表單欄位
   */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  /**
   * 送出登入表單
   */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Failed to login:", err);
      setError("登入失敗，請確認帳號密碼是否正確");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {/* === Block Start: Login Card === */}
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <div className="mb-6">
            <Link
              to="/"
              className="text-sm text-text-muted transition hover:text-text-main"
            >
              ← 返回首頁
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-main">會員登入</h1>
            <p className="mt-3 text-sm text-text-muted">
              登入後即可查看會員狀態，並繼續後續購物流程。
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-danger/20 bg-surface p-4 text-sm text-danger">
              {error}
            </div>
          )}

          {/* === Block Start: Login Form === */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text-main"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="請輸入 Email"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-text-main"
              >
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="請輸入密碼"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "登入中..." : "登入"}
            </button>
          </form>
          {/* === Block End: Login Form === */}

          <div className="mt-6 text-center text-sm text-text-muted">
            還沒有帳號嗎？{" "}
            <Link
              to="/auth/signup"
              className="font-medium text-primary transition hover:text-primary-hover"
            >
              前往註冊
            </Link>
          </div>
        </div>
        {/* === Block End: Login Card === */}
      </div>
    </div>
  );
}

export default LoginPage;
