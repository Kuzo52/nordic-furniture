import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-intro">
        <p className="wordmark">NORDIC</p>
        <h2>
          Меньше шума.
          <br />
          Больше дома.
        </h2>
      </section>
      <nav aria-label="Карта сайта">
        <section>
          <h3>Каталог</h3>
          <Link href="/catalog/">Все предметы</Link>
          <Link href="/catalog/?category=living">Гостиная</Link>
        </section>
        <section>
          <h3>О&nbsp;нас</h3>
          <Link href="/#philosophy">Философия</Link>
          <a href="mailto:hello@nordic-home.ru">Связаться</a>
        </section>
        <section>
          <h3>Шоурум</h3>
          <address>
            Москва, Хлебозавод
            <br />
            Новодмитровская, 1
          </address>
        </section>
      </nav>
      <section className="legal">
        <small>© 2026 NORDIC</small>
        <a href="mailto:privacy@nordic-home.ru">Политика конфиденциальности</a>
      </section>
    </footer>
  );
}
