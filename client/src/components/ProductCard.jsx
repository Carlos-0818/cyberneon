import { Link } from "react-router-dom";

import { formatPrice } from "../lib/formatPrice";

function ProductCard({ product }) {
  const imageUrl = product.images?.[0];

  return (
    <>
      {/* === Block Start: Product Card === */}
      <li className="group relative">
        <Link to={`/products/${product.slug}`} className="block">
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-surface-muted">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-text-subtle">
                No Image
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-medium text-text-main">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-text-muted">{product.brand}</p>

              <p className="mt-1 text-sm text-text-subtle">
                {product.category?.name || "未分類"}
              </p>
            </div>

            <p className="shrink-0 text-sm font-semibold text-text-main">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </li>
      {/* === Block End: Product Card === */}
    </>
  );
}

export default ProductCard;
