"use client";

import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../../data/products";
import { assetUrl, imageFallback } from "../../lib/assets";
import { useStore } from "./StoreProvider";

export default function ProductCard({ product, index = 0 }) {
  const { addItem, updateQuantity, quantityFor } = useStore();
  const quantity = quantityFor(product.id);

  return (
    <article className="product-card">
      <Link
        className="product-card-link"
        href={`/product/${product.slug}/`}
        aria-label={`Подробнее: ${product.name}`}
      >
        <figure>
          <img
            src={assetUrl(product.image)}
            alt={product.name}
            width={product.width}
            height={product.height}
            loading="lazy"
            onError={(event) => imageFallback(event)}
          />
          <figcaption>
            <span>{product.category}</span>
            <small>{String(index + 1).padStart(2, "0")}</small>
          </figcaption>
        </figure>
        <header>
          <p>
            {product.brand} · {product.material}
          </p>
          <h3>{product.name}</h3>
        </header>
      </Link>
      <footer>
        <strong>{formatPrice(product.price)}</strong>
        {quantity ? (
          <section
            className="product-cart-control"
            aria-label={`${product.name} в корзине`}
          >
            <span>В&nbsp;корзине</span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, -1)}
              aria-label="Уменьшить количество"
            >
              <Minus size={14} />
            </button>
            <strong>{quantity}</strong>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, 1)}
              aria-label="Увеличить количество"
            >
              <Plus size={14} />
            </button>
          </section>
        ) : (
          <button type="button" onClick={() => addItem(product.id)}>
            В&nbsp;корзину <ArrowUpRight size={15} />
          </button>
        )}
      </footer>
    </article>
  );
}
