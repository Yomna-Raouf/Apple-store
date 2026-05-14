import StarRatings from 'react-star-ratings';
import { MdAdd, MdRemove } from 'react-icons/md';

import SafeImage from '@/components/SafeImage/SafeImage';
import { useStateValue } from '@/hooks/useStateValue';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './CheckoutProduct.module.css';

type CheckoutProductProps = {
  lineId: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  hideButton?: boolean;
};

export default function CheckoutProduct({
  lineId,
  quantity,
  image,
  title,
  price,
  rating,
  hideButton,
}: CheckoutProductProps) {
  const [, dispatch] = useStateValue();

  const lineTotal = price * quantity;

  const removeLine = () => {
    dispatch({ type: 'REMOVE_FROM_BASKET', lineId });
  };

  const increment = () => {
    dispatch({ type: 'ADJUST_BASKET_QTY', lineId, delta: 1 });
  };

  const decrement = () => {
    dispatch({ type: 'ADJUST_BASKET_QTY', lineId, delta: -1 });
  };

  const subline =
    hideButton && quantity > 1
      ? `Qty ${quantity}`
      : !hideButton && quantity > 1
        ? `${quantity} × ${formatCurrency(price)}`
        : !hideButton
          ? 'each'
          : null;

  return (
    <article className={styles.checkoutProduct}>
      <div className={styles.checkoutProduct__thumb}>
        <SafeImage
          key={image}
          src={image}
          alt=''
          className={styles.checkoutProduct__thumbSlot}
          fallbackClassName={styles.checkoutProduct__thumbSlotFallback}
        />
      </div>

      <div className={styles.checkoutProduct__main}>
        <h3 className={styles.checkoutProduct__title}>{title}</h3>
        <div
          className={styles.checkoutProduct__rating}
          aria-label={`Rating ${rating} out of 5`}
        >
          <StarRatings
            rating={rating}
            starRatedColor='#e6a200'
            starEmptyColor='#939399'
            numberOfStars={5}
            name={`checkout-rating-${lineId}`}
            starDimension='16px'
            starSpacing='2px'
          />
        </div>

        {!hideButton ? (
          <div className={styles.checkoutProduct__actions}>
            <button
              type='button'
              className={styles.checkoutProduct__remove}
              onClick={removeLine}
            >
              Remove
            </button>
            <div
              className={styles.checkoutProduct__qty}
              aria-label={`Quantity for ${title}`}
            >
              <button
                type='button'
                className={styles.checkoutProduct__qtyBtn}
                onClick={decrement}
                aria-label={`Decrease quantity of ${title}`}
              >
                <MdRemove aria-hidden />
              </button>
              <span className={styles.checkoutProduct__qtyVal} aria-live='polite'>
                {quantity}
              </span>
              <button
                type='button'
                className={styles.checkoutProduct__qtyBtn}
                onClick={increment}
                aria-label={`Increase quantity of ${title}`}
              >
                <MdAdd aria-hidden />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.checkoutProduct__rail}>
        <p className={styles.checkoutProduct__price}>
          {formatCurrency(lineTotal)}
        </p>
        {subline ? (
          <p className={styles.checkoutProduct__subline}>{subline}</p>
        ) : null}
      </div>
    </article>
  );
}
