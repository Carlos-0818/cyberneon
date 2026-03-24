/**
 * App Router
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import RequireAuth from "./RequireAuth";
import RequireGuest from "./RequireGuest";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import OrdersPage from "../pages/OrdersPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

import RequireAdmin from "./RequireAdmin";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import AdminCreateProductPage from "../pages/AdminCreateProductPage";
import AdminEditProductPage from "../pages/AdminEditProductPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === Public Pages === */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* === Auth Pages === */}
        <Route element={<RequireGuest />}>
          <Route path="auth/signup" element={<SignupPage />} />
          <Route path="auth/login" element={<LoginPage />} />
        </Route>

        {/* === Private Pages === */}
        <Route element={<RequireAuth />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
        </Route>

        {/* === Admin Pages === */}
        <Route element={<RequireAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route
              path="products/create"
              element={<AdminCreateProductPage />}
            />
            <Route
              path="products/:id/edit"
              element={<AdminEditProductPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
