import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Reveal from "./components/Reveal";
import SafeImage from "./components/SafeImage";
import styles from "./home.module.css";
import { products } from "../data/products";

const categories = [
  {
    key: "living",
    title: "Гостиная",
    note: "Кресла, диваны и хранение",
    image: "https://loremflickr.com/1200/1500/scandinavian-living-room",
  },
  {
    key: "dining",
    title: "Столовая",
    note: "Столы и стулья",
    image: "https://loremflickr.com/1200/1500/scandinavian-dining-room",
  },
  {
    key: "lighting",
    title: "Свет",
    note: "Подвесные и настольные лампы",
    image: "https://loremflickr.com/1200/1500/scandinavian-lighting",
  },
];

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

      <section className="material-strip" aria-label="Ключевые свойства коллекции">
        <p><span>01</span>Северный дуб</p>
        <p><span>02</span>Натуральная шерсть</p>
        <p><span>03</span>Ручная отделка</p>
        <p><span>04</span>Гарантия 10 лет</p>
      </section>

      <Reveal className={styles.editorial} aria-labelledby="editorial-title">
        <figure className={styles.editorialVisual}>
          <SafeImage
            src="https://loremflickr.com/1800/1200/scandinavian-interior"
            alt="Светлая гостиная со скандинавской мебелью"
            width="1800"
            height="1200"
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

      <Reveal className={styles.categories} aria-labelledby="categories-title">
        <header className={styles.sectionIntro}>
          <p className="eyebrow">По пространствам</p>
          <h2 id="categories-title">Начните с&nbsp;комнаты</h2>
          <p>
            Три коротких маршрута по&nbsp;коллекции — от&nbsp;образа
            к&nbsp;конкретному предмету.
          </p>
        </header>
        <section className={styles.categoryGrid} aria-label="Категории каталога">
          {categories.map((category, index) => (
            <Link
              key={category.key}
              href={`/catalog/?category=${category.key}`}
              className={styles.categoryCard}
            >
              <figure>
                <SafeImage
                  src={category.image}
                  alt=""
                  width="1200"
                  height="1500"
                  loading="lazy"
                />
                <figcaption>
                  <span>0{index + 1}</span>
                  <strong>{category.title}</strong>
                  <small>{category.note}</small>
                </figcaption>
              </figure>
            </Link>
          ))}
        </section>
      </Reveal>

      <Reveal className="catalog-section" aria-labelledby="catalog-title">
        <header className="section-heading">
          <p className="eyebrow">Выбор редакции · 2026</p>
          <h2 id="catalog-title">Предметы с&nbsp;долгой жизнью</h2>
          <p>
            Узнаваемые вещи, которые не&nbsp;зависят от&nbsp;быстрых трендов.
          </p>
        </header>
        <section className="product-grid" aria-label="Избранные предметы">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </section>
        <footer className={styles.catalogFooter}>
          <Link href="/catalog/">
            Смотреть все предметы <ArrowRight size={18} />
          </Link>
        </footer>
      </Reveal>

      <Reveal className={styles.designer} aria-labelledby="designer-title">
        <article>
          <p className="eyebrow">Мастер · 01</p>
          <h2 id="designer-title">Ханс Вегнер.<br />Форма без срока.</h2>
          <blockquote>
            «У стула нет обратной стороны. Он должен быть красив со&nbsp;всех
            направлений».
          </blockquote>
          <Link href="/product/wishbone-chair/">
            История кресла CH24 <ArrowRight size={18} />
          </Link>
        </article>
        <figure>
          <SafeImage
            src="https://loremflickr.com/1400/1100/furniture-craftsman"
            alt="Мастер работает с деревянной деталью мебели"
            width="1400"
            height="1100"
            loading="lazy"
          />
        </figure>
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

      <Reveal className={styles.services} aria-label="Сервис NORDIC">
        <article>
          <span>01</span>
          <h2>Доставка с&nbsp;подъёмом</h2>
          <p>Москва и&nbsp;область — от&nbsp;двух рабочих дней.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Подбор для интерьера</h2>
          <p>Соберём спокойный комплект по&nbsp;плану вашей комнаты.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Гарантия и&nbsp;уход</h2>
          <p>Поддерживаем предметы после покупки, а&nbsp;не&nbsp;только до&nbsp;неё.</p>
        </article>
      </Reveal>
    </main>
  );
}
