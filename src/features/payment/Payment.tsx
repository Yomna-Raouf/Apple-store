import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';

import CheckoutProduct from '@/features/cart/CheckoutProduct';
import { useStateValue } from '@/hooks/useStateValue';
import api from '@/lib/api';
import { db } from '@/lib/firebase';
import { getBasketTotal } from '@/store/reducer';
import { formatCurrency } from '@/utils/formatCurrency';
import './Payment.css';

type PaymentCreateResponse = {
  clientSecret: string;
};

export default function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const [succeeded, setSucceeded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardEmpty, setCardEmpty] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      const total = getBasketTotal(basket);
      if (total <= 0) {
        setClientSecret(null);
        return;
      }
      const response = await api.post<PaymentCreateResponse>(
        `/payments/create?total=${total * 100}`,
      );
      setClientSecret(response.data.clientSecret);
    };

    void getClientSecret();
  }, [basket]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setIsProcessing(true);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed');
      setIsProcessing(false);
      return;
    }

    if (!paymentIntent || !user) {
      setError('Missing payment or user');
      setIsProcessing(false);
      return;
    }

    await db
      .collection('users')
      .doc(user.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

    setSucceeded(true);
    setError(null);
    setIsProcessing(false);

    dispatch({
      type: 'EMPTY_BASKET',
    });

    navigate('/orders', { replace: true });
  };

  const handleChange = (e: StripeCardElementChangeEvent) => {
    setCardEmpty(e.empty);
    setError(e.error?.message ?? null);
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
                    isProcessing || cardEmpty || succeeded || !clientSecret
                  }
                >
                  <span>{isProcessing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error ? <div>{error}</div> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
