/**
 * Signup Page
 *
 * Tailwind UI Block:
 * - Application UI -> Forms -> Sign-in and Registration -> Simple sign up form
 *
 * 說明：
 * - 提供會員註冊表單
 * - 註冊成功後導回首頁
 */

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
   * 送出註冊表單
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("密碼與確認密碼不一致，請重新確認。");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await signup({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      console.error("Failed to signup:", err);
      setError("註冊失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {/* === Block Start: Signup Card === */}
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
            <h1 className="text-3xl font-bold text-text-main">會員註冊</h1>
            <p className="mt-3 text-sm text-text-muted">
              建立帳號後即可開始使用會員功能與後續購物流程。
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-danger/20 bg-surface p-4 text-sm text-danger">
              {error}
            </div>
          )}

          {/* === Block Start: Signup Form */}
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-text-main"
              >
                確認密碼
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="請再次輸入密碼"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "註冊中..." : "註冊"}
            </button>
          </form>
          {/* === Block End: Signup Form */}

          <div className="mt-6 text-center text-sm text-text-muted">
            已經有帳號了？{" "}
            <Link
              to="/auth/login"
              className="font-medium text-primary transition hover:text-primary-hover"
            >
              前往登入
            </Link>
          </div>
        </div>
        {/* === Block End: Signup Card === */}
      </div>
    </div>
  );
}

export default SignupPage;
