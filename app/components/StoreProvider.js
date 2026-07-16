"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById, products } from "../../data/products";

const StoreContext = createContext(null);
const storageKey = "nordic-cart";

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(saved)) {
        setCart(
          saved.filter(
            (item) =>
              getProductById(item.id) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0,
          ),
        );
      }
    } catch {
      localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // The cart remains usable when storage is unavailable.
    }
  }, [cart, hydrated]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    document.body.style.overflow = cartOpen ? "hidden" : "";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [cartOpen]);

  const addItem = (id) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id);
      return existing
        ? current.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { id, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const items = cart.flatMap((item) => {
    const product = getProductById(item.id);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      products,
      items,
      count,
      total,
      cartOpen,
      setCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      quantityFor: (id) => cart.find((item) => item.id === id)?.quantity ?? 0,
    }),
    [cart, cartOpen, count, items, total],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
