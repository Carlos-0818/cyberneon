/**
 * App Router
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RequireAuth from "./RequireAuth";
import RequireGuest from "./RequireGuest";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === Public Pages === */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
        </Route>

        {/* === Auth Pages === */}
        <Route element={<RequireGuest />}>
          <Route path="auth/signup" element={<SignupPage />} />
          <Route path="auth/login" element={<LoginPage />} />
        </Route>

        {/* === Private Pages === */}
        <Route element={<RequireAuth />}>
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
