import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Orders from './Orders';
import './App.css';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
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
