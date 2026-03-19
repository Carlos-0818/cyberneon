/**
 * App Router
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RequireGuest from "./RequireGuest";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
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
        </Route>

        {/* === Auth Pages === */}
        <Route element={<RequireGuest />}>
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
