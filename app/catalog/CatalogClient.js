"use client";

import { ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useStore } from "../components/StoreProvider";
import { products } from "../../data/products";
import styles from "./catalog.module.css";

const categories = [
  { value: "all", label: "Все предметы" },
  { value: "living", label: "Гостиная" },
  { value: "dining", label: "Столовая" },
  { value: "lighting", label: "Свет" },
];

const materials = ["Все", ...new Set(products.map((item) => item.materialGroup))];

export default function CatalogClient() {
  const { count, setCartOpen } = useStore();
  const [category, setCategory] = useState("all");
  const [material, setMaterial] = useState("Все");
  const [sort, setSort] = useState("editorial");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (categories.some((item) => item.value === requested)) {
      setCategory(requested);
    }
  }, []);

  const chooseCategory = (value) => {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState({}, "", url);
  };

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        (category === "all" || product.categoryKey === category) &&
        (material === "Все" || product.materialGroup === material),
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, material, sort]);

  const reset = () => {
    chooseCategory("all");
    setMaterial("Все");
    setSort("editorial");
  };

  const filtered = category !== "all" || material !== "Все" || sort !== "editorial";

  return (
    <>
      <header className={styles.hero}>
        <p className="eyebrow">Коллекция · 2026</p>
        <h1>Предметы для<br />спокойного дома</h1>
        <p>
          Иконы северного дизайна и&nbsp;новые формы — с&nbsp;понятным
          происхождением, материалами и&nbsp;размерами.
        </p>
      </header>

      <section className={styles.catalog} aria-labelledby="results-title">
        <aside className={styles.filters} aria-label="Фильтры каталога">
          <header>
            <SlidersHorizontal size={17} />
            <h2>Фильтры</h2>
            {filtered && (
              <button type="button" onClick={reset}>
                Сбросить <X size={14} />
              </button>
            )}
          </header>

          <fieldset>
            <legend>Комната</legend>
            {categories.map((item) => (
              <button
                key={item.value}
                className={category === item.value ? styles.active : ""}
                type="button"
                onClick={() => chooseCategory(item.value)}
              >
                {item.label}
                <span>
                  {item.value === "all"
                    ? products.length
                    : products.filter((product) => product.categoryKey === item.value).length}
                </span>
              </button>
            ))}
          </fieldset>

          <fieldset>
            <legend>Материал</legend>
            {materials.map((item) => (
              <button
                key={item}
                className={material === item ? styles.active : ""}
                type="button"
                onClick={() => setMaterial(item)}
              >
                {item}
              </button>
            ))}
          </fieldset>
        </aside>

        <section className={styles.results}>
          <header className={styles.resultsHeader}>
            <h2 id="results-title">{visibleProducts.length} предметов</h2>
            <label>
              <span>Сортировка</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="editorial">Выбор редакции</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </label>
          </header>

          {visibleProducts.length ? (
            <section className="product-grid" aria-label="Результаты каталога">
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </section>
          ) : (
            <article className={styles.empty}>
              <h3>Ничего не найдено</h3>
              <p>Измените сочетание комнаты и&nbsp;материала.</p>
              <button type="button" onClick={reset}>Показать всё</button>
            </article>
          )}

          <footer className={styles.cartFooter}>
            <button type="button" onClick={() => setCartOpen(true)}>
              <span>
                <ShoppingBag size={18} />
                Открыть корзину
              </span>
              <strong>{count}</strong>
            </button>
          </footer>
        </section>
      </section>
    </>
  );
}
