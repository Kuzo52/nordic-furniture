"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const products = [
  {
    id: "chair",
    name: "Кресло «Вишбон CH24»",
    brand: "Carl Hansen & Søn",
    material: "Дуб, плетёный бумажный шнур",
    price: 118000,
    category: "Кресла",
    image: "images/premium-chair.jpg",
    width: 1200,
    height: 1600,
  },
  {
    id: "sofa",
    name: "Диван «Аутлайн»",
    brand: "Muuto",
    material: "Шерсть Divina, алюминий",
    price: 349000,
    category: "Диваны",
    image: "images/premium-sofa.jpg",
    width: 1000,
    height: 563,
  },
  {
    id: "light",
    name: "Светильник «PH 5»",
    brand: "Louis Poulsen",
    material: "Формованный алюминий",
    price: 112000,
    category: "Свет",
    image: "images/premium-lamp.jpg",
    width: 600,
    height: 600,
  },
  {
    id: "table",
    name: "Стол «Андрогин»",
    brand: "Audo Copenhagen",
    material: "Маслёный дуб, камень",
    price: 390000,
    category: "Столы",
    image: "images/premium-table.jpg",
    width: 1275,
    height: 1700,
  },
  {
    id: "sideboard",
    name: "Комод «Халлер M51»",
    brand: "USM",
    material: "Сталь, хромированные трубы",
    price: 218000,
    category: "Хранение",
    image: "images/premium-sideboard.jpg",
    width: 2000,
    height: 2000,
  },
  {
    id: "rug",
    name: "Ковёр «Парк Грей»",
    brand: "Nordic Knots",
    material: "Новозеландская шерсть",
    price: 165000,
    category: "Текстиль",
    image: "images/premium-rug.jpg",
    width: 900,
    height: 1125,
  },
];

const formatPrice = (value) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addedItem, setAddedItem] = useState(null);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    document.body.style.overflow = cartOpen ? "hidden" : "";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [cartOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const addToCart = (item) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      return existing
        ? current.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          )
        : [...current, { ...item, quantity: 1 }];
    });
    setAddedItem(item.id);
    setCartOpen(true);
    window.setTimeout(() => setAddedItem(null), 1600);
  };

  const updateQuantity = (id, change) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const checkout = () => {
    const order = cartItems
      .map((item) => `${item.name} — ${item.quantity} шт.`)
      .join("\n");
    window.location.href = `mailto:hello@nordic-home.ru?subject=${encodeURIComponent("Заказ NORDIC")}&body=${encodeURIComponent(`${order}\n\nИтого: ${formatPrice(cartTotal)}`)}`;
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
          <button
            className="cart-button"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-expanded={cartOpen}
            aria-controls="cart-drawer"
            aria-label={`Открыть корзину: ${cartCount} товаров`}
          >
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
            <h2 id="cart-title">Корзина <span>{cartCount}</span></h2>
          </section>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Закрыть корзину">
            <X size={20} />
          </button>
        </header>

        {cartItems.length ? (
          <section className="cart-list" aria-label="Товары в корзине">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <figure>
                  <img src={item.image} alt="" width={item.width} height={item.height} />
                </figure>
                <section>
                  <p>{item.brand}</p>
                  <h3>{item.name}</h3>
                  <strong>{formatPrice(item.price)}</strong>
                  <footer>
                    <section className="quantity-control" aria-label={`Количество: ${item.quantity}`}>
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label="Уменьшить количество">
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label="Увеличить количество">
                        <Plus size={14} />
                      </button>
                    </section>
                    <button className="remove-item" type="button" onClick={() => removeFromCart(item.id)} aria-label={`Удалить ${item.name}`}>
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
            <button type="button" onClick={() => { setCartOpen(false); scrollTo("catalog"); }}>
              Перейти в&nbsp;каталог
            </button>
          </section>
        )}

        <footer className="cart-summary">
          <p><span>Итого</span><strong>{formatPrice(cartTotal)}</strong></p>
          <button type="button" onClick={checkout} disabled={!cartItems.length}>
            Оформить заказ <ArrowUpRight size={17} />
          </button>
          <small>Доставка рассчитывается после подтверждения заказа.</small>
        </footer>
      </aside>

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
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                  />
                  <figcaption>
                    <span>{item.category}</span>
                    <small>0{index + 1}</small>
                  </figcaption>
                </figure>
                <header>
                  <p>{item.brand} · {item.material}</p>
                  <h3>{item.name}</h3>
                </header>
                <footer>
                  <strong>{formatPrice(item.price)}</strong>
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
