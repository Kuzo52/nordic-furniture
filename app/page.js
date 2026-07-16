"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const products = [
  {
    id: "chair",
    name: "Кресло Sarek",
    material: "Массив дуба, шерсть",
    price: "89 000 ₽",
    category: "Кресла",
    image: "https://loremflickr.com/800/1000/chair,furniture",
    fallback: "images/product-1.jpg",
  },
  {
    id: "sofa",
    name: "Диван Fjord",
    material: "Лён, пух, ясень",
    price: "198 000 ₽",
    category: "Диваны",
    image: "https://loremflickr.com/800/1000/sofa,interior",
    fallback: "images/product-2.jpg",
  },
  {
    id: "light",
    name: "Светильник Lysa",
    material: "Матовая латунь",
    price: "42 000 ₽",
    category: "Свет",
    image: "https://loremflickr.com/800/1000/lamp,interior",
    fallback: "images/product-3.jpg",
  },
  {
    id: "table",
    name: "Стол Runa",
    material: "Дымчатый дуб",
    price: "124 000 ₽",
    category: "Столы",
    image: "https://loremflickr.com/800/1000/wooden,table",
    fallback: "images/product-4.jpg",
  },
  {
    id: "sideboard",
    name: "Комод Skog",
    material: "Дуб, натуральное масло",
    price: "96 000 ₽",
    category: "Хранение",
    image: "https://loremflickr.com/800/1000/wooden,cabinet",
    fallback: "images/product-5.jpg",
  },
  {
    id: "rug",
    name: "Ковёр Mossa",
    material: "Шерсть ручной работы",
    price: "54 000 ₽",
    category: "Текстиль",
    image: "https://loremflickr.com/800/1000/wool,rug",
    fallback: "images/product-6.jpg",
  },
];

const handleImageError = ({ currentTarget }, fallback) => {
  currentTarget.onerror = null;
  currentTarget.src = fallback;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const addToCart = (item) => {
    setCartCount((count) => count + 1);
    setAddedItem(item.id);
    window.setTimeout(() => setAddedItem(null), 1600);
  };

  return (
    <>
      <header className="site-header">
        <button
          className="wordmark"
          type="button"
          onClick={() => scrollTo("home")}
          aria-label="В начало страницы"
        >
          NORDIC
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация">
          <button type="button" onClick={() => scrollTo("catalog")}>
            Каталог
          </button>
          <button type="button" onClick={() => scrollTo("philosophy")}>
            Философия
          </button>
        </nav>

        <section className="header-actions" aria-label="Действия">
          <button className="cart-button" type="button" aria-label={`Корзина: ${cartCount} товаров`}>
            <ShoppingBag size={18} strokeWidth={1.7} />
            <span>{cartCount}</span>
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

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <figure className="hero-visual">
            <img
              src="images/hero.jpg"
              alt="Светлая гостиная с деревянной мебелью и льняным текстилем"
              width="840"
              height="534"
              fetchPriority="high"
            />
          </figure>
          <aside className="hero-edition" aria-label="Сведения о коллекции">
            <span>Edition 01</span>
            <strong>48</strong>
            <small>предметов</small>
          </aside>
          <article className="hero-copy">
            <p className="eyebrow">Стокгольм · Москва</p>
            <h1 id="hero-title">
              NORDIC.
              <span>Форма следует за&nbsp;природой.</span>
            </h1>
            <footer className="hero-footer">
              <p>
                Честные материалы, спокойные линии и&nbsp;вещи, которые красиво стареют.
              </p>
              <button className="primary-button" type="button" onClick={() => scrollTo("catalog")}>
                Смотреть каталог
                <ArrowDownRight size={18} />
              </button>
            </footer>
          </article>
        </section>

        <section className="material-strip" aria-label="Ключевые свойства коллекции">
          <p><span>01</span>Северный дуб</p>
          <p><span>02</span>Натуральная шерсть</p>
          <p><span>03</span>Ручная отделка</p>
          <p><span>04</span>Гарантия 10 лет</p>
        </section>

        <section id="catalog" className="catalog-section" aria-labelledby="catalog-title">
          <header className="section-heading">
            <p className="eyebrow">Каталог · 2026</p>
            <h2 id="catalog-title">Предметы спокойного дома</h2>
            <p>Мебель и&nbsp;свет из&nbsp;натуральных материалов — без визуального шума.</p>
          </header>

          <section className="product-grid" aria-label="Предметы мебели">
            {products.map((item, index) => (
              <article className="product-card" key={item.id}>
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="800"
                    height="1000"
                    loading="lazy"
                    onError={(event) => handleImageError(event, item.fallback)}
                  />
                  <figcaption>
                    <span>{item.category}</span>
                    <small>0{index + 1}</small>
                  </figcaption>
                </figure>
                <header>
                  <p>{item.material}</p>
                  <h3>{item.name}</h3>
                </header>
                <footer>
                  <strong>{item.price}</strong>
                  <button type="button" onClick={() => addToCart(item)}>
                    {addedItem === item.id ? (
                      <>Добавлено <Check size={15} /></>
                    ) : (
                      <>В&nbsp;корзину <ArrowUpRight size={15} /></>
                    )}
                  </button>
                </footer>
              </article>
            ))}
          </section>
        </section>

        <section id="philosophy" className="philosophy-section" aria-labelledby="philosophy-title">
          <p className="eyebrow">Hygge — это достаточно</p>
          <article>
            <h2 id="philosophy-title">
              Дом становится теплее не&nbsp;от&nbsp;количества вещей, а&nbsp;от&nbsp;того,
              как они живут вместе.
            </h2>
            <section className="philosophy-notes" aria-label="Принципы производства">
              <p>
                <strong>01</strong>
                Древесина из&nbsp;лесов с&nbsp;ответственным управлением.
              </p>
              <p>
                <strong>02</strong>
                Разборные соединения и&nbsp;ремонтопригодная конструкция.
              </p>
              <p>
                <strong>03</strong>
                Натуральные масла вместо тяжёлых лаков.
              </p>
            </section>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <section className="footer-intro">
          <p className="wordmark">NORDIC</p>
          <h2>Меньше шума.<br />Больше дома.</h2>
        </section>
        <nav aria-label="Карта сайта">
          <section>
            <h3>Каталог</h3>
            <button type="button" onClick={() => scrollTo("catalog")}>Предметы</button>
          </section>
          <section>
            <h3>О&nbsp;нас</h3>
            <button type="button" onClick={() => scrollTo("philosophy")}>Философия</button>
            <a href="mailto:hello@nordic-home.ru">Связаться</a>
          </section>
          <section>
            <h3>Шоурум</h3>
            <address>Москва, Хлебозавод<br />Новодмитровская, 1</address>
          </section>
        </nav>
        <section className="legal">
          <small>© 2026 NORDIC</small>
          <a href="mailto:privacy@nordic-home.ru">Политика конфиденциальности</a>
        </section>
      </footer>
    </>
  );
}
