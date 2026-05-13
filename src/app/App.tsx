import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Header from '@/components/Header/Header';
import Checkout from '@/features/cart/Checkout';
import Home from '@/features/home/Home';
import Login from '@/features/auth/Login';
import Orders from '@/features/orders/Orders';
import Payment from '@/features/payment/Payment';
import { useStateValue } from '@/hooks/useStateValue';
import { auth } from '@/lib/firebase';
import './App.css';

const stripePromise = loadStripe(
  'pk_test_51HQASMBHIi407WTNbeJ0FvuxFetHraVFgkRjSjwpfclywKDbc1h6Jxy1rpO8Kk5hcVhbALbJ5uO8Oeqi2MbjYxep00QYjIvlAY',
);

export default function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: {
            uid: authUser.uid,
            email: authUser.email ?? null,
          },
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route
            path='/payment'
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
