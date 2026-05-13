import StarRatings from 'react-star-ratings';
import { MdAdd, MdRemove } from 'react-icons/md';

import { useStateValue } from '@/hooks/useStateValue';
import styles from './CheckoutProduct.module.css';

type CheckoutProductProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  hideButton?: boolean;
};

export default function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  hideButton,
}: CheckoutProductProps) {
  const [, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id,
    });
  };

  return (
    <div className={`${styles.checkoutProduct} ${styles.leave}`}>
      <img className={styles.checkoutProduct__image} alt='' src={image} />

      <div className={styles.checkoutProduct__info}>
        <p className={styles.checkoutProduct__title}>{title}</p>
        <p className={styles.checkoutProduct__price}>
          <span aria-hidden>$</span>
          <strong>{price}</strong>
        </p>
        <div
          className={styles.checkoutProduct__rating}
          aria-label={`Rating ${rating} out of 5`}
        >
          <StarRatings
            rating={rating}
            starRatedColor='#ffbc00'
            numberOfStars={5}
            name={`checkout-rating-${id}`}
            starDimension='20px'
            starSpacing='15px'
          />
        </div>
        {!hideButton && (
          <button type='button' onClick={removeFromBasket}>
            Remove from basket
          </button>
        )}
      </div>
      {!hideButton && (
        <div className={styles.checkoutProduct__amountControl}>
          <strong style={{ fontSize: '20px' }}>🚫 not working yet 🚫 </strong>
          <br />
          <button type='button' aria-label='Decrease quantity'>
            <strong>
              <MdRemove aria-hidden />
            </strong>
          </button>
          <p className={styles.checkoutProduct__amount}>1</p>
          <button type='button' aria-label='Increase quantity'>
            <strong>
              <MdAdd aria-hidden />
            </strong>
          </button>
        </div>
      )}
    </div>
  );
}
