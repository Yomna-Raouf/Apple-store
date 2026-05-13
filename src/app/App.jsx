import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Home from '@/features/home/Home';
import Orders from '@/features/orders/Orders';
import './App.css';
import Checkout from '@/features/cart/Checkout';
import Login from '@/features/auth/Login';
import { auth } from '@/lib/firebase';
import { useStateValue } from '@/hooks/useStateValue';
import Payment from '@/features/payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51HQASMBHIi407WTNbeJ0FvuxFetHraVFgkRjSjwpfclywKDbc1h6Jxy1rpO8Kk5hcVhbALbJ5uO8Oeqi2MbjYxep00QYjIvlAY',
);

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
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
              <Elements stripe={promise}>
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

export default App;
