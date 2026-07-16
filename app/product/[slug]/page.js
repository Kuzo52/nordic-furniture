import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import Reveal from "../../components/Reveal";
import SafeImage from "../../components/SafeImage";
import { assetUrl } from "../../../lib/assets";
import { getProductBySlug, products } from "../../../data/products";
import ProductPurchase from "./ProductPurchase";
import styles from "./product.module.css";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.categoryKey === product.categoryKey ||
          item.materialGroup === product.materialGroup),
    )
    .slice(0, 3);

  return (
    <main className={`inner-page ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link href="/catalog/"><ArrowLeft size={15} /> Каталог</Link>
        <span>/</span>
        <span>{product.category}</span>
      </nav>

      <section className={styles.productHero} aria-labelledby="product-title">
        <section className={styles.gallery} aria-label="Фотографии товара">
          <figure className={styles.primaryImage}>
            <SafeImage
              src={assetUrl(product.image)}
              alt={product.name}
              width={product.width}
              height={product.height}
            />
          </figure>
        </section>

        <article className={styles.summary}>
          <p className="eyebrow">{product.brand} · {product.year}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className={styles.designer}>Дизайн: {product.designer}</p>
          <p className={styles.description}>{product.description}</p>
          <dl>
            <section>
              <dt>Материал</dt>
              <dd>{product.material}</dd>
            </section>
            <section>
              <dt>Производство</dt>
              <dd>Дания / ЕС</dd>
            </section>
          </dl>
          <ProductPurchase product={product} />
        </article>
      </section>

      <Reveal className={styles.dimensionSection} aria-labelledby="dimensions-title">
        <article>
          <p className="eyebrow">Размер и&nbsp;масштаб</p>
          <h2 id="dimensions-title">Подойдёт ли предмет вашему пространству?</h2>
          <p>
            Оставьте не&nbsp;менее 60&nbsp;см для свободного прохода рядом
            с&nbsp;предметом.
          </p>
        </article>
        <figure className={styles.dimensionVisual}>
          <span className={styles.width}>
            Ш {product.dimensions.width} см
          </span>
          <span className={styles.height}>
            В {product.dimensions.height} см
          </span>
          <span className={styles.depth}>
            Г {product.dimensions.depth} см
          </span>
          <svg viewBox="0 0 520 360" role="img" aria-label="Схема габаритов предмета">
            <path d="M90 285V105L255 50L430 120V290L255 335Z" />
            <path d="M90 105L255 175L430 120M255 175V335" />
          </svg>
        </figure>
      </Reveal>

      <Reveal className={styles.details} aria-label="История и уход">
        <article>
          <p className="eyebrow">Происхождение</p>
          <h2>Вещь, созданная не&nbsp;на&nbsp;сезон.</h2>
          <p>
            Конструкция допускает обслуживание и&nbsp;замену отдельных деталей.
            Материалы со&nbsp;временем приобретают патину, сохраняя прочность.
          </p>
        </article>
        <article>
          <p className="eyebrow">Уход</p>
          <h2>Простые правила</h2>
          <p>{product.care}</p>
        </article>
      </Reveal>

      {related.length > 0 && (
        <Reveal className={styles.related} aria-labelledby="related-title">
          <header>
            <p className="eyebrow">Продолжить подбор</p>
            <h2 id="related-title">Живут рядом</h2>
            <Link href="/catalog/">Весь каталог <ArrowRight size={17} /></Link>
          </header>
          <section className="product-grid" aria-label="Связанные товары">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </section>
        </Reveal>
      )}
    </main>
  );
}
