import StarRatings from 'react-star-ratings';

import { useStateValue } from '@/hooks/useStateValue';
import type { BasketItem } from '@/types/models';
import styles from './Product.module.css';

type ProductProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
};

export default function Product({
  id,
  title,
  image,
  price,
  rating,
}: ProductProps) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    const item: BasketItem = {
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
      <img src={image} alt={title} />
      <div className={styles.Product__info}>
        <h2 id={`product-title-${id}`} className={styles.Product__title}>
          {title}
        </h2>
        <p className={styles.Product__price}>
          <span className={styles.Product__currency} aria-hidden>
            $
          </span>
          <strong>{price}</strong>
        </p>

        <div className={styles.Product__rating} aria-label={`Rating ${rating} out of 5`}>
          <StarRatings
            rating={rating}
            starRatedColor='#ffbc00'
            numberOfStars={5}
            name={`product-rating-${id}`}
            starDimension='20px'
            starSpacing='15px'
          />
        </div>
      </div>

      <button type='button' onClick={addToBasket}>
        Add to basket
      </button>
    </article>
  );
}
