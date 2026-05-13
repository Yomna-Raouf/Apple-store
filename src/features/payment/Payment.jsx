import { useState, useEffect } from 'react';
import './Payment.css';
import CheckoutProduct from '@/features/cart/CheckoutProduct';
import { formatCurrency } from '@/utils/formatCurrency';
import { useStateValue } from '@/hooks/useStateValue';
import { getBasketTotal } from '@/store/reducer';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '@/lib/api';
import { db } from '@/lib/firebase';

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      const total = getBasketTotal(basket);
      if (total <= 0) {
        setClientSecret(null);
        return;
      }
      const response = await api({
        method: 'post',
        url: `/payments/create?total=${total * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    setProcessing(true);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    await db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent?.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

    setSucceeded(true);
    setError(false);
    setProcessing(false);

    dispatch({
      type: 'EMPTY_BASKET',
    });

    navigate('/orders', { replace: true });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and deliver</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <h3>Order Total: {formatCurrency(getBasketTotal(basket))}</h3>
                <button
                  type='submit'
                  disabled={
                    processing || disabled || succeeded || !clientSecret
                  }
                >
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
