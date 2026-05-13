import './Order.css';
import CheckoutProduct from '@/features/cart/CheckoutProduct';
import { formatCurrency } from '@/utils/formatCurrency';

function formatOrderDate(unixSeconds) {
  if (!unixSeconds) return '';
  return new Date(unixSeconds * 1000).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function Order({ order }) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{formatOrderDate(order.data.created)}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={index}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <h3 className='order__total'>
        Order Total: {formatCurrency(order.data.amount / 100)}
      </h3>
    </div>
  );
}

export default Order;
