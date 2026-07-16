import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Reveal from "./components/Reveal";
import SafeImage from "./components/SafeImage";
import styles from "./home.module.css";
import { products } from "../data/products";

export default function Home() {
  return (
    <main id="home">
      <section className="hero" aria-labelledby="hero-title">
        <article className="hero-copy">
          <header className="hero-kicker">
            <p className="eyebrow">Scandinavian design house</p>
            <span>Est. 2026 · Москва</span>
          </header>
          <h1 id="hero-title">
            <span className="hero-brand">NORDIC</span>
            <span className="hero-tagline">Тишина, принявшая форму.</span>
          </h1>
          <footer className="hero-footer">
            <p>
              Иконы северного дизайна, собранные в&nbsp;одной спокойной
              коллекции.
            </p>
            <Link className="primary-button" href="/catalog/">
              Смотреть каталог
              <ArrowDownRight size={18} />
            </Link>
          </footer>
        </article>
      </section>

      <Reveal className="catalog-section" aria-labelledby="catalog-title">
        <header className="section-heading">
          <p className="eyebrow">Каталог · 2026</p>
          <h2 id="catalog-title">Коллекция NORDIC</h2>
          <p>
            Мебель, свет и&nbsp;текстиль для спокойного современного дома.
          </p>
        </header>
        <section className="product-grid" aria-label="Предметы каталога">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </section>
        <footer className={styles.catalogFooter}>
          <Link href="/catalog/">
            Смотреть все предметы <ArrowRight size={18} />
          </Link>
        </footer>
      </Reveal>

      <Reveal className={styles.founder} aria-labelledby="founder-title">
        <article>
          <p className="eyebrow">Основатель NORDIC</p>
          <blockquote id="founder-title">
            «Дом не&nbsp;должен впечатлять. Он должен возвращать вас
            к&nbsp;себе».
          </blockquote>
          <footer>
            <strong>Элиас Норден</strong>
            <span>Копенгаген · 2026</span>
          </footer>
        </article>
      </Reveal>

      <Reveal
        id="philosophy"
        className="philosophy-section"
        aria-labelledby="philosophy-title"
      >
        <p className="eyebrow">Hygge — это достаточно</p>
        <article>
          <h2 id="philosophy-title">
            Дом становится теплее не&nbsp;от&nbsp;количества вещей,
            а&nbsp;от&nbsp;того, как они живут вместе.
          </h2>
          <section className="philosophy-notes" aria-label="Принципы производства">
            <p><strong>01</strong>Древесина из&nbsp;лесов с&nbsp;ответственным управлением.</p>
            <p><strong>02</strong>Разборные соединения и&nbsp;ремонтопригодная конструкция.</p>
            <p><strong>03</strong>Натуральные масла вместо тяжёлых лаков.</p>
          </section>
        </article>
      </Reveal>

      <Reveal className={styles.editorial} aria-labelledby="editorial-title">
        <figure className={styles.editorialVisual}>
          <SafeImage
            src="https://loremflickr.com/1800/1200/scandinavian-interior"
            alt="Светлая гостиная со скандинавской мебелью"
            width="1800"
            height="1200"
            loading="lazy"
          />
          <figcaption>Дом у&nbsp;воды · Стокгольм</figcaption>
        </figure>
        <article className={styles.editorialCopy}>
          <p className="eyebrow">Интерьер недели · 01</p>
          <h2 id="editorial-title">Комната, в&nbsp;которой легко остаться.</h2>
          <p>
            Тёплый дуб, шерсть и&nbsp;мягкий свет создают спокойный ритм без
            лишних предметов.
          </p>
          <nav aria-label="Предметы из интерьера">
            {products.slice(0, 2).map((product) => (
              <Link key={product.id} href={`/product/${product.slug}/`}>
                <span>{product.brand}</span>
                <strong>{product.name}</strong>
                <ArrowRight size={18} />
              </Link>
            ))}
          </nav>
        </article>
      </Reveal>

    </main>
  );
}
