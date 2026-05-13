import { useEffect, useState, useTransition, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";

import CheckoutProduct from "@/features/cart/CheckoutProduct";
import { useStateValue } from "@/hooks/useStateValue";
import api from "@/lib/api";
import { db } from "@/lib/firebase";
import { getBasketTotal } from "@/store/reducer";
import { formatCurrency } from "@/utils/formatCurrency";
import styles from "./Payment.module.css";

type PaymentCreateResponse = {
  clientSecret: string;
};

export default function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState<string | null>(null);
  const [cardEmpty, setCardEmpty] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    startTransition(async () => {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
          },
        });

      if (stripeError) {
        setError(stripeError.message ?? "Payment failed");
        return;
      }

      if (!paymentIntent || !user) {
        setError("Missing payment or user");
        return;
      }

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setError(null);

      dispatch({
        type: "EMPTY_BASKET",
      });

      navigate("/orders", { replace: true });
    });
  };

  const handleChange = (e: StripeCardElementChangeEvent) => {
    setCardEmpty(e.empty);
    setError(e.error?.message ?? null);
  };

  return (
    <div className={styles.payment__container}>
      <h1>
        Checkout (<Link to="/checkout">{basket?.length ?? 0} items</Link>)
      </h1>

      <section
        className={styles.payment__section}
        aria-labelledby="payment-delivery-heading"
      >
        <div className={styles.payment__title}>
          <h2 id="payment-delivery-heading">Delivery address</h2>
        </div>
        <address className={styles.payment__address}>
          <p>{user?.email}</p>
          <p>123 React Lane</p>
          <p>Los Angeles, CA</p>
        </address>
      </section>

      <section
        className={styles.payment__section}
        aria-labelledby="payment-items-heading"
      >
        <div className={styles.payment__title}>
          <h2 id="payment-items-heading">Review items and delivery</h2>
        </div>
        <ul className={styles.payment__items}>
          {basket.map((item, index) => (
            <li key={`${item.id}-${index}`} className={styles.payment__item}>
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        className={styles.payment__section}
        aria-labelledby="payment-method-heading"
      >
        <div className={styles.payment__title}>
          <h2 id="payment-method-heading">Payment method</h2>
        </div>
        <div className={styles.payment__details}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="visually-hidden">Card payment</legend>
              <CardElement onChange={handleChange} />
            </fieldset>
              <div>
                <p className={styles.payment__orderTotal}>
                <strong>
                  Order Total: {formatCurrency(getBasketTotal(basket))}
                </strong>
              </p>
              <button
                type="submit"
                disabled={isPending || cardEmpty || !clientSecret}
              >
                <span>{isPending ? "Processing…" : "Buy Now"}</span>
              </button>
            </div>
            {error ? (
              <p role="alert" className={styles.payment__formError}>
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
