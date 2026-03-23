/**
 * Admin Products Page
 *
 * Tailwind UI Block:
 * - Application UI -> Lists -> Tables
 *
 * 說明：
 * - 後台商品管理列表頁
 * - 串接後台商品列表 API
 * - 目前先完成列表、搜尋、篩選與 pagination
 */

import { useEffect, useMemo, useState } from "react";

import { formatPrice } from "../lib/formatPrice";
import { getStatusLabel } from "../lib/getStatusLabel";
import { getAdminProducts } from "../services/productService";
import { getAdminCategories } from "../services/categoryService";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);

  /* === 查詢條件 === */
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  /* === 表單欄位 === */
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAdminCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getAdminProducts({
          page,
          keyword,
          status,
          category,
        });

        setProducts(data.products || []);
        setPagination(data.pagination || null);
      } catch (err) {
        console.error("Failed to fetch admin products:", err);
        setError("商品資料讀取失敗，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [page, keyword, status, category]);

  // 取得狀態選項
  const statusOptions = useMemo(() => {
    return [
      ...new Set(products.map((product) => product.status).filter(Boolean)),
    ];
  }, [products]);

  /**
   * 處理搜尋框輸入
   */
  function handleKeywordChange(e) {
    setSearchKeyword(e.target.value);
  }

  /**
   * 處理狀態篩選
   */
  function handleStatusChange(e) {
    setSelectedStatus(e.target.value);
  }

  /**
   * 處理分類篩選
   */
  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  /**
   * 套用搜尋和篩選條件
   */
  function handleSearch() {
    setKeyword(searchKeyword.trim());
    setStatus(selectedStatus);
    setCategory(selectedCategory);
    setPage(1);
  }

  /**
   * Enter 也能觸發搜尋
   */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  /**
   * 重設所有篩選條件
   */
  function handleClear() {
    setSearchKeyword("");
    setSelectedStatus("");
    setSelectedCategory("");

    setKeyword("");
    setStatus("");
    setCategory("");
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-main">商品管理</h1>
            <p className="mt-3 text-text-muted">
              管理商品列表、分類、庫存與上架狀態
            </p>
          </div>

          <button
            type="button"
            className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            新增商品
          </button>
        </div>
      </div>

      {/* === Block Start: Filters Section === */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-text-main">
              搜尋商品
            </label>
            <input
              type="text"
              value={searchKeyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeyDown}
              placeholder="請輸入商品名稱 / Slug / 品牌"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              商品分類
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
            >
              <option value="">全部分類</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              上架狀態
            </label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
            >
              <option value="">全部狀態</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={handleSearch}
              className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              搜尋
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text-main transition hover:bg-surface-muted"
            >
              重設
            </button>
          </div>
        </div>
      </div>
      {/* === Block End: Filters Section === */}

      <div className="mt-6">
        <p className="text-sm text-text-muted">
          共 {pagination?.total ?? 0} 筆商品
        </p>
      </div>

      {/* === Block Start: Products Table === */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        {isLoading && (
          <div className="p-6 text-text-muted">商品資料載入中...</div>
        )}

        {!isLoading && error && <div className="p-6 text-danger">{error}</div>}

        {!isLoading && !error && products.length === 0 && (
          <div className="p-6 text-text-muted">目前沒有商品資料</div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface-subtle">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    商品名稱
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    分類
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    品牌
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    價格
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    庫存
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-main">
                    狀態
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-text-main">
                    操作
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-subtle/60">
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-main">
                        {product.name}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-text-muted">
                      {product.category?.name || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-text-muted">
                      {product.brand}
                    </td>

                    <td className="px-6 py-4 text-sm text-text-main">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-main">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          product.status === "active"
                            ? "bg-primary/10 text-primary"
                            : "bg-surface-subtle text-text-muted"
                        }`}
                      >
                        {getStatusLabel(product.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-text-main transition hover:bg-surface-muted"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="rounded-xl border border-danger/30 px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger/5"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* === Block End: Products Table === */}

      {/* === Block Start: Pagination === */}

      {!isLoading && !error && products.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagination || pagination.page <= 1}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一頁
          </button>

          <div className="rounded-xl px-4 py-2 text-sm text-text-muted">
            第 {pagination?.page ?? 1} 頁 / 共 {pagination?.totalPages ?? 1} 頁
          </div>

          <button
            type="button"
            onClick={() =>
              setPage((prev) =>
                pagination ? Math.min(prev + 1, pagination.totalPages) : prev,
              )
            }
            disabled={!pagination || pagination.page >= pagination.totalPages}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            下一頁
          </button>
        </div>
      )}

      {/* === Block End: Pagination === */}
    </div>
  );
}

export default AdminProductsPage;
