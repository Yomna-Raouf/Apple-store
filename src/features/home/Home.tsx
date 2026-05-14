import SafeImage from '@/components/SafeImage/SafeImage';
import Product from '@/features/catalog';
import hero from '@/assets/images/mac2.png';
import { HOME_CATALOG } from './catalogData';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.Home}>
      <section
        className={styles.Home__imageContainer}
        aria-labelledby='home-hero-heading'
      >
        <div className={styles.Home__imageDescription}>
          <h1 id='home-hero-heading' className={styles.Home__heroHeading}>
            <span className={styles.Home__heroPrefix}>Get more with</span>{' '}
            <span className={styles.Home__heroAccent}>
              <strong>Apple.</strong>
            </span>
          </h1>
          <p className={styles.Home__lede}>
            Discover the latest iPhone, Mac, iPad, and accessories — designed
            to work seamlessly together. Free delivery on qualifying orders.
          </p>
        </div>
        <SafeImage
          key={hero}
          src={hero}
          alt='Apple products and accessories'
          className={styles.Home__image}
          fallbackClassName={styles.Home__imageFallback}
          loading='eager'
        />
      </section>

      <section
        className={styles.Home__catalog}
        aria-labelledby='catalog-heading'
      >
        <div className={styles.Home__catalogHeader}>
          <h2 id='catalog-heading' className={styles.Home__catalogTitle}>
            Featured
          </h2>
          <p className={styles.Home__catalogSub}>
            New arrivals and bestsellers, with clear pricing and delivery at a
            glance.
          </p>
        </div>

        <div className={styles.Home__grid}>
          {HOME_CATALOG.map((item) => (
            <Product key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
