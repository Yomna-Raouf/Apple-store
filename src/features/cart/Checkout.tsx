import emptyState from '@/assets/emptystate.svg';
import { useStateValue } from '@/hooks/useStateValue';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import styles from './Checkout.module.css';

export default function Checkout() {
  const [{ basket, user }] = useStateValue();

  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__left}>
        <img
          className={styles.chechout__ad}
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.JPG'
          alt='Promotional banner'
        />
        <section aria-label='Shopping basket'>
          {basket.length ? (
            <>
              <h2 id='basket-heading' className={styles.checkout__title}>
                Your shopping basket{user?.email ? `, ${user.email}` : ''}
              </h2>

              <ul className={styles.checkout__list}>
                {basket.map((item) => (
                  <li key={item.lineId} className={styles.checkout__listItem}>
                    <CheckoutProduct
                      lineId={item.lineId}
                      quantity={item.quantity}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className={styles.checkout__emptyState}>
              <h2 id='empty-basket-heading' className={styles.checkout__title}>
                Your shopping basket is empty
                {user?.email ? `, ${user.email}` : ''}
              </h2>
              <img src={emptyState} alt='Empty basket illustration' />
            </div>
          )}
        </section>
      </div>
      <aside className={styles.checkout__aside} aria-label='Order summary'>
        <Subtotal />
      </aside>
    </div>
  );
}
