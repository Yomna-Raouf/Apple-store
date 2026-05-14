import CheckoutProduct from '@/features/cart/CheckoutProduct';
import type { OrderListEntry } from '@/types/models';
import { formatCurrency } from '@/utils/formatCurrency';
import { normalizeBasketItem } from '@/utils/normalizeBasketItem';
import styles from './Order.module.css';

function formatOrderDate(unixSeconds: number): string {
  if (!Number.isFinite(unixSeconds) || unixSeconds <= 0) return '';
  return new Date(unixSeconds * 1000).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

type OrderProps = {
  order: OrderListEntry;
};

export default function Order({ order }: OrderProps) {
  const headingId = `order-${order.id}-heading`;

  return (
    <article className={styles.order} aria-labelledby={headingId}>
      <h2 id={headingId}>Order</h2>
      <p>
        <time dateTime={new Date(order.data.created * 1000).toISOString()}>
          {formatOrderDate(order.data.created)}
        </time>
      </p>
      <p className={styles.order__id}>
        <small>Order ID: {order.id}</small>
      </p>
      <ul className={styles.order__lines}>
        {order.data.basket?.map((item, index) => {
          const row = normalizeBasketItem(item, index);
          return (
            <li key={row.lineId}>
              <CheckoutProduct
                lineId={row.lineId}
                quantity={row.quantity}
                title={row.title}
                image={row.image}
                price={row.price}
                rating={row.rating}
                hideButton
              />
            </li>
          );
        })}
      </ul>
      <p className={styles.order__total}>
        <strong>
          Order total: {formatCurrency(order.data.amount / 100)}
        </strong>
      </p>
    </article>
  );
}
