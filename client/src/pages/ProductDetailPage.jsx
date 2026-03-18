/**
 * Product Detail Page
 *
 * Tailwind UI Block:
 * - Ecommerce → Components → Product Overviews → Simple
 *
 * 說明：
 * - 使用 slug 取得單一商品
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductBySlug } from "../services/productService";
import { formatPrice } from "../lib/formatPrice";

function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("商品資料讀取失敗");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-subtle p-10 text-text-muted">
        商品資料載入中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-subtle p-10 text-danger">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-subtle p-10 text-text-muted">
        找不到商品
      </div>
    );
  }

  const imageUrl = product.images?.[0];
  const specsEntries = Object.entries(product.specs || {});

  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* === Block Start: Product Detail === */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-text-muted transition hover:text-text-main"
            >
              ← 返回商品列表
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-xl bg-surface-muted">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-text-subtle">
                  No Image
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-text-muted">{product.brand}</p>

              <h1 className="mt-2 text-2xl font-bold text-text-main">
                {product.name}
              </h1>

              <p className="mt-4 text-2xl font-semibold text-text-main">
                {formatPrice(product.price)}
              </p>

              <p className="mt-6 leading-7 text-text-muted">
                {product.description || "目前尚無商品描述。"}
              </p>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-text-main">
                  商品規格
                </h2>

                {specsEntries.length > 0 ? (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    <dl className="divide-y divide-border">
                      {specsEntries.map(([key, value]) => (
                        <div
                          key={key}
                          className="grid grid-cols-3 gap-4 bg-surface px-4 py-3"
                        >
                          <dt className="text-sm font-medium text-text-main">
                            {key}
                          </dt>
                          <dd className="col-span-2 text-sm text-text-muted">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-text-muted">
                    目前尚無規格資料。
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* === Block End: Product Detail === */}
      </div>
    </div>
  );
}

export default ProductDetailPage;
