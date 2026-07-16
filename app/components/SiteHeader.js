"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./StoreProvider";

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, cartOpen, setCartOpen } = useStore();
  const isHome = pathname === "/";

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className={`site-header${isHome ? "" : " site-header--solid"}`}>
      <nav
        className={menuOpen ? "main-nav is-open" : "main-nav"}
        aria-label="Основная навигация"
      >
        <Link href="/">Главная</Link>
        <Link href="/catalog/">Каталог</Link>
        <Link href="/#philosophy">Философия</Link>
      </nav>

      <section className="header-actions" aria-label="Действия">
        <button
          className="cart-button"
          type="button"
          onClick={() => setCartOpen(true)}
          aria-expanded={cartOpen}
          aria-controls="cart-drawer"
          aria-label={`Открыть корзину: ${count} товаров`}
        >
          <ShoppingBag size={18} strokeWidth={1.7} />
          <span>{count}</span>
        </button>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </section>
    </header>
  );
}
