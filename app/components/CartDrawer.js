"use client";

import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../../data/products";
import { assetUrl } from "../../lib/assets";
import { useStore } from "./StoreProvider";

export default function CartDrawer() {
  const {
    items,
    count,
    total,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
  } = useStore();

  const checkout = () => {
    if (!items.length) return;
    const order = items
      .map((item) => `${item.name} — ${item.quantity} шт.`)
      .join("\n");
    window.location.href = `mailto:hello@nordic-home.ru?subject=${encodeURIComponent(
      "Заказ NORDIC",
    )}&body=${encodeURIComponent(`${order}\n\nИтого: ${formatPrice(total)}`)}`;
  };

  return (
    <>
      <button
        className={cartOpen ? "cart-backdrop is-visible" : "cart-backdrop"}
        type="button"
        onClick={() => setCartOpen(false)}
        aria-label="Закрыть корзину"
        tabIndex={cartOpen ? 0 : -1}
      />
      <aside
        id="cart-drawer"
        className={cartOpen ? "cart-drawer is-open" : "cart-drawer"}
        role="dialog"
        aria-modal="true"
        aria-hidden={!cartOpen}
        aria-labelledby="cart-title"
      >
        <header className="cart-drawer-header">
          <section>
            <p className="eyebrow">Ваш выбор</p>
            <h2 id="cart-title">
              Корзина <span>{count}</span>
            </h2>
          </section>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Закрыть корзину"
          >
            <X size={20} />
          </button>
        </header>

        {items.length ? (
          <section className="cart-list" aria-label="Товары в корзине">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <figure>
                  <img
                    src={assetUrl(item.image)}
                    alt=""
                    width={item.width}
                    height={item.height}
                  />
                </figure>
                <section>
                  <p>{item.brand}</p>
                  <h3>{item.name}</h3>
                  <strong>{formatPrice(item.price)}</strong>
                  <footer>
                    <section
                      className="quantity-control"
                      aria-label={`Количество: ${item.quantity}`}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Уменьшить количество"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Увеличить количество"
                      >
                        <Plus size={14} />
                      </button>
                    </section>
                    <button
                      className="remove-item"
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Удалить ${item.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </footer>
                </section>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-cart">
            <ShoppingBag size={28} strokeWidth={1.3} />
            <h3>Корзина пока пуста</h3>
            <p>Добавьте предметы из&nbsp;каталога — они появятся здесь.</p>
            <Link href="/catalog/" onClick={() => setCartOpen(false)}>
              Перейти в&nbsp;каталог
            </Link>
          </section>
        )}

        <footer className="cart-summary">
          <p>
            <span>Итого</span>
            <strong>{formatPrice(total)}</strong>
          </p>
          <button type="button" onClick={checkout} disabled={!items.length}>
            Оформить заказ <ArrowUpRight size={17} />
          </button>
          <small>Доставка рассчитывается после подтверждения заказа.</small>
        </footer>
      </aside>
    </>
  );
}
