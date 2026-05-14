import { useNavigate } from 'react-router-dom';

import { useStateValue } from '@/hooks/useStateValue';
import { getBasketItemCount, getBasketTotal } from '@/store/reducer';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './Subtotal.module.css';

export default function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();
  const giftId = 'subtotal-gift';

  return (
    <section className={styles.subtotal} aria-labelledby='subtotal-heading'>
      <h2 id='subtotal-heading' className='visually-hidden'>
        Subtotal
      </h2>
      <p className={styles.subtotal__row}>
        <span className={styles.subtotal__lead}>
          Subtotal (
          <span className={styles.subtotal__count}>{getBasketItemCount(basket)}</span>{' '}
          items):
        </span>{' '}
        <strong className={styles.subtotal__amount}>
          {formatCurrency(getBasketTotal(basket))}
        </strong>
      </p>
      <p className={styles.subtotal__gift}>
        <input id={giftId} type='checkbox' />
        <label htmlFor={giftId}>This order contains a gift</label>
      </p>
      <button type='button' onClick={() => navigate('/payment')}>
        Proceed to checkout
      </button>
    </section>
  );
}
