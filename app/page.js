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

const hotspots = [
  {
    id: "chair",
    name: "Кресло Sarek",
    material: "Массив дуба, шерсть",
    price: "89 000 ₽",
    position: "left-[19%] top-[66%]",
    tooltip: "left-0 bottom-6 md:left-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2",
  },
  {
    id: "table",
    name: "Стол Runa",
    material: "Дымчатый дуб",
    price: "124 000 ₽",
    position: "left-[50%] top-[71%]",
    tooltip: "left-1/2 bottom-6 -translate-x-1/2 md:left-5 md:bottom-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2",
  },
  {
    id: "light",
    name: "Светильник Lysa",
    material: "Матовая латунь",
    price: "42 000 ₽",
    position: "right-[18%] top-[25%]",
    tooltip: "right-0 top-6 md:right-5 md:top-1/2 md:-translate-y-1/2",
  },
];

const collections = [
  {
    title: "Гостиная",
    count: "18 предметов",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Столовая",
    count: "12 предметов",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Свет",
    count: "9 предметов",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setActiveHotspot(null);
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
          <button type="button" onClick={() => scrollTo("scene")}>
            Интерьер
          </button>
          <button type="button" onClick={() => scrollTo("collections")}>
            Коллекции
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
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90"
              alt="Светлая гостиная с деревянной мебелью и льняным текстилем"
              width="2000"
              height="1333"
              fetchPriority="high"
            />
          </figure>
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
              <button className="primary-button" type="button" onClick={() => scrollTo("scene")}>
                Смотреть интерьер
                <ArrowDownRight size={18} />
              </button>
            </footer>
          </article>
        </section>

        <section id="scene" className="scene-section" aria-labelledby="scene-title">
          <header className="section-heading">
            <p className="eyebrow">Комната № 01</p>
            <h2 id="scene-title">Соберите пространство</h2>
            <p>Нажмите на&nbsp;метку, чтобы узнать о&nbsp;предмете.</p>
          </header>

          <figure className="scene">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90"
              alt="Гостиная с креслом, дубовым столом и подвесным светильником"
              width="2000"
              height="1250"
              loading="lazy"
            />
            {hotspots.map((item) => {
              const isActive = activeHotspot === item.id;
              return (
                <article
                  className={`hotspot ${item.position}`}
                  key={item.id}
                  onMouseEnter={() => setActiveHotspot(item.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <button
                    className="hotspot-trigger"
                    type="button"
                    aria-label={`Показать ${item.name}`}
                    aria-expanded={isActive}
                    onClick={() => setActiveHotspot(isActive ? null : item.id)}
                  >
                    <span />
                  </button>
                  <aside className={`product-tooltip ${item.tooltip} ${isActive ? "is-visible" : ""}`}>
                    <header>
                      <p>{item.material}</p>
                      <h3>{item.name}</h3>
                    </header>
                    <strong>{item.price}</strong>
                    <button type="button" onClick={() => addToCart(item)}>
                      {addedItem === item.id ? (
                        <>
                          Добавлено <Check size={15} />
                        </>
                      ) : (
                        <>
                          В&nbsp;корзину <ArrowUpRight size={15} />
                        </>
                      )}
                    </button>
                  </aside>
                </article>
              );
            })}
          </figure>
        </section>

        <section id="collections" className="collections-section" aria-labelledby="collections-title">
          <header className="section-heading split">
            <p className="eyebrow">Редакция NORDIC</p>
            <h2 id="collections-title">Коллекции для тихой жизни</h2>
            <p>Отобранные предметы объединены материалом, пропорцией и&nbsp;светом.</p>
          </header>
          <section className="collection-grid" aria-label="Категории мебели">
            {collections.map((collection, index) => (
              <article className={index === 1 ? "collection-card is-raised" : "collection-card"} key={collection.title}>
                <figure>
                  <img
                    src={collection.image}
                    alt={collection.title}
                    width="1200"
                    height="1500"
                    loading="lazy"
                  />
                </figure>
                <footer>
                  <span>0{index + 1}</span>
                  <h3>{collection.title}</h3>
                  <p>{collection.count}</p>
                  <button type="button" onClick={() => scrollTo("scene")} aria-label={`Открыть коллекцию «${collection.title}»`}>
                    <ArrowUpRight size={18} />
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
            <button type="button" onClick={() => scrollTo("scene")}>Интерьер</button>
            <button type="button" onClick={() => scrollTo("collections")}>Коллекции</button>
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
