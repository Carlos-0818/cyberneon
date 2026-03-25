/**
 * Product List Page
 *
 * Tailwind UI Block:
 * - Ecommerce → Components → Product Lists → Simple
 *
 * 說明：
 * - 目前先串接 Public Products API
 * - 商品圖片優先顯示 product.images[0]
 * - 若無圖片則顯示 placeholder
 */

import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "../components/ProductCard";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
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

        const data = await getProducts({
          page,
          keyword,
          category: selectedCategory,
        });

        setProducts(data.products);
        setPagination(data.pagination);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("商品資料讀取失敗，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [page, keyword, selectedCategory]);

  function handleSearch() {
    setPage(1);
    setKeyword(searchText.trim());
  }

  function handleClear() {
    setSearchText("");
    setKeyword("");
    setSelectedCategory("");
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-soft">
          <h1 className="text-3xl font-bold text-text-main">商品列表</h1>
          <p className="mt-3 text-text-muted">
            精選商品，快速找到你需要的配備。
          </p>
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="rounded-2xl border border-border bg-surface p-6 text-text-muted shadow-soft">
              商品資料載入中...
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-2xl border border-danger/20 bg-surface p-6 text-danger shadow-soft">
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <>
              {/* === Block Start: Product Search === */}
              <form
                className="mb-6 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="搜尋商品名稱 / 品牌..."
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-main outline-none focus:border-primary"
                />

                <button
                  type="submit"
                  className="whitespace-nowrap rounded-xl bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover"
                >
                  搜尋
                </button>
              </form>
              {/* === Block End: Product Search === */}

              {/* === Block Start: Category Filter === */}
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchText("");
                    setKeyword("");
                    setPage(1);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm ${
                    selectedCategory === ""
                      ? "bg-primary text-white"
                      : "border border-border bg-surface text-text-muted"
                  }`}
                >
                  全部
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.slug);
                      setSearchText("");
                      setKeyword("");
                      setPage(1);
                    }}
                    className={`rounded-xl px-4 py-2 text-sm ${
                      selectedCategory === category.slug
                        ? "bg-primary text-white"
                        : "border border-border bg-surface text-text-muted"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {/* === Block End: Category Filter === */}

              {/* === Block Start: Active Filters === */}
              {(keyword || selectedCategory) && (
                <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-muted">
                  <div className="flex flex-wrap items-center gap-2">
                    {keyword && (
                      <span className="flex items-center gap-1 rounded-md bg-surface-muted px-2 py-1">
                        搜尋：{keyword}
                      </span>
                    )}

                    {selectedCategory && (
                      <span className="flex items-center gap-1 rounded-md bg-surface-muted px-2 py-1">
                        分類：
                        {
                          categories.find((c) => c.slug === selectedCategory)
                            ?.name
                        }
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleClear}
                    className="text-sm text-primary hover:underline"
                  >
                    清除全部
                  </button>
                </div>
              )}
              {/* === Block End: Active Filters === */}

              <div className="mb-6">
                <p className="text-sm text-text-muted">
                  共 {pagination?.total ?? 0} 筆商品
                </p>
              </div>

              {products.length > 0 ? (
                <>
                  {/* === Block Start: Product List === */}
                  <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </ul>
                  {/* === Block End: Product List === */}

                  {/* === Block Start: Product Pagination === */}
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
                      第 {pagination?.page ?? 1} 頁 / 共{" "}
                      {pagination?.totalPages ?? 1} 頁
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setPage((prev) =>
                          pagination
                            ? Math.min(prev + 1, pagination.totalPages)
                            : prev,
                        )
                      }
                      disabled={
                        !pagination || pagination.page >= pagination.totalPages
                      }
                      className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      下一頁
                    </button>
                  </div>
                  {/* === Block End: Product Pagination === */}
                </>
              ) : (
                <div className="rounded-2xl border border-border bg-surface p-6 text-text-muted shadow-soft">
                  目前沒有商品資料。
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
