/**
 * Admin Edit Product Page
 *
 * Tailwind UI Block:
 * - Application UI -> Forms -> Stacked forms
 *
 * 說明：
 * - 後台編輯商品頁
 * - 先完成資料載入與表單填入
 */

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getAdminCategories } from "../services/categoryService";
import { getAdminProductById, updateProduct } from "../services/productService";

function AdminEditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    status: "active",
    categoryId: "",
    imagesText: "",
    specsText: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const [product, categoryData] = await Promise.all([
          getAdminProductById(id),
          getAdminCategories(),
        ]);

        setCategories(categoryData || []);

        /* === 將舊有資料帶回表單 === */
        setFormData({
          name: product.name || "",
          slug: product.slug || "",
          brand: product.brand || "",
          price: product.price || "",
          stock: product.stock || "",
          description: product.description || "",
          status: product.status || "active",
          categoryId: product.categoryId || "",
          imagesText: JSON.stringify(product.images || [], null, 2),
          specsText: JSON.stringify(product.specs || {}, null, 2),
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("商品資料讀取失敗，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  /**
   * 表單更新
   */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /**
   * 更新商品
   */
  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      setError("");

      let images = [];
      if (formData.imagesText) {
        try {
          images = JSON.parse(formData.imagesText);
        } catch (err) {
          console.error("Failed to parse imagesText:", err);
          setError("商品圖片格式錯誤，請輸入正確的 JSON 陣列。");
          return;
        }
      }

      let specs = {};
      if (formData.specsText) {
        try {
          specs = JSON.parse(formData.specsText);
        } catch (err) {
          console.error("Failed to parse specsText:", err);
          setError("商品規格格式錯誤，請輸入正確的 JSON 物件。");
          return;
        }
      }

      const payload = {
        name: formData.name,
        slug: formData.slug,
        brand: formData.brand,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        status: formData.status,
        categoryId: formData.categoryId,
        images,
        specs,
      };

      await updateProduct(id, payload);

      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("更新商品時發生錯誤，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className="p-6 text-text-muted">商品資料載入中...</div>;
  }

  if (!isLoading && error && !formData.name) {
    return <div className="p-6 text-danger">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text-main">編輯商品</h1>

          <Link
            to="/admin/products"
            className="rounded-xl border border-border px-4 py-2 text-sm"
          >
            返回列表
          </Link>
        </div>
      </div>

      {/* === Block Start: Product Form === */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-8 shadow-soft">
        {error && (
          <div className="mb-6 rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger">
            {error}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              商品名稱
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="例如：Intel Core i5-14400F"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="例如：intel-core-i5-14400f"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              品牌
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="例如：Intel"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              商品分類
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">
                {isLoading ? "分類載入中..." : "請選擇分類"}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              價格
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="例如：5490"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              庫存
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="例如：20"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-main">
              商品狀態
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition focus:border-primary"
            >
              <option value="active">已上架</option>
              <option value="inactive">已下架</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-text-main">
            商品描述
          </label>
          <textarea
            name="description"
            value={formData.description}
            rows={5}
            onChange={handleChange}
            placeholder="請輸入商品描述"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-text-main">
            商品圖片（JSON 陣列）
          </label>
          <textarea
            name="imagesText"
            value={formData.imagesText}
            rows={4}
            onChange={handleChange}
            placeholder='例如：["https://example.com/a.jpg"]'
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-text-main">
            商品規格（JSON 物件）
          </label>
          <textarea
            name="specsText"
            value={formData.specsText}
            rows={6}
            onChange={handleChange}
            placeholder='例如：{ 
                "socket": "LGA1700",
                "coreCount": "10"
                }'
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-subtle focus:border-primary"
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "儲存中..." : "儲存變更"}
          </button>

          <Link
            to="/admin/products"
            className="inline-flex justify-center rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text-main transition hover:bg-surface-muted"
          >
            取消
          </Link>
        </div>
      </div>
      {/* === Block End: Product Form === */}
    </div>
  );
}

export default AdminEditProductPage;
