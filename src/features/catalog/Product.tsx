import SafeImage from '@/components/SafeImage/SafeImage';
import { useStateValue } from '@/hooks/useStateValue';
import type { BasketItem } from '@/types/models';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './Product.module.css';

export type ProductDisplayProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  spec: string;
  shipping: string;
  reviewCount: number;
};

export default function Product({
  id,
  title,
  image,
  price,
  rating,
  category,
  spec,
  shipping,
}: ProductDisplayProps) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    const item: Omit<BasketItem, 'lineId' | 'quantity'> = {
      id,
      title,
      image,
      price,
      rating,
    };
    dispatch({
      type: 'ADD_TO_BASKET',
      item,
    });
  };

  return (
    <article className={styles.Product} aria-labelledby={`product-title-${id}`}>
      <div className={styles.Product__media}>
        <SafeImage
          key={image}
          src={image}
          alt={title}
          className={styles.productMediaImg}
          fallbackClassName={styles.productMediaImgFallback}
        />
      </div>

      <div className={styles.Product__main}>
        <div className={styles.Product__top}>
          <p className={styles.Product__category}>{category}</p>

          <h2 id={`product-title-${id}`} className={styles.Product__title}>
            {title}
          </h2>
          {spec ? <p className={styles.Product__spec}>{spec}</p> : null}

          <div className={styles.Product__topSpacer} aria-hidden />
        </div>

        <div className={styles.Product__commerce}>
          <p className={styles.Product__price}>{formatCurrency(price)}</p>
          <div className={styles.Product__shippingSlot}>
            {shipping ? (
              <p className={styles.Product__shipping}>{shipping}</p>
            ) : null}
          </div>
          <button type='button' onClick={addToBasket}>
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
