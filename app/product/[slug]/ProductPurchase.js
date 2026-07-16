"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "../../../data/products";
import { useStore } from "../../components/StoreProvider";

export default function ProductPurchase({ product }) {
  const { addItem, updateQuantity, quantityFor, setCartOpen } = useStore();
  const quantity = quantityFor(product.id);

  const addAndOpen = () => {
    addItem(product.id);
    setCartOpen(true);
  };

  return (
    <section className="product-purchase" aria-label="Покупка">
      <strong>{formatPrice(product.price)}</strong>
      {quantity ? (
        <section className="product-purchase-control">
          <button
            type="button"
            onClick={() => updateQuantity(product.id, -1)}
            aria-label="Уменьшить количество"
          >
            <Minus size={17} />
          </button>
          <span>{quantity} в&nbsp;корзине</span>
          <button
            type="button"
            onClick={() => updateQuantity(product.id, 1)}
            aria-label="Увеличить количество"
          >
            <Plus size={17} />
          </button>
          <button type="button" onClick={() => setCartOpen(true)}>
            Открыть корзину
          </button>
        </section>
      ) : (
        <button type="button" onClick={addAndOpen}>
          Добавить в&nbsp;корзину <ShoppingBag size={18} />
        </button>
      )}
      <small>В наличии · доставка от&nbsp;двух рабочих дней</small>
    </section>
  );
}
