/**
 * Main Layout
 *
 * 說明：
 * - 前台共用版型
 * - 負責組合 Navbar 與頁面內容
 */

import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
