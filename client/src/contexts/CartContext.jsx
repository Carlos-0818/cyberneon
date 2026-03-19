/**
 * Cart Context
 *
 * 說明：
 * - 管理前端購物車狀態
 * - Phase 1 使用 localStorage 保存購物車資料
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "cyberneon_cart";

function getInitialCartItems() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (err) {
    console.error("Failed to parse cart data from localStorage:", err);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCartItems);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * 加入購物車
   */
  function addToCart(product) {
    const quantity = product.quantity || 1;

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCartItems, { ...product, quantity }];
    });
  }

  /**
   * 更新購物車數量
   */
  function updateCartItemQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  /**
   * 從購物車移除商品
   */
  function removeFromCart(productId) {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productId !== productId),
    );
  }

  /**
   * 計算購物車商品總數
   */
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    cartCount,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
