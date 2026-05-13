import { useNavigate } from 'react-router-dom';

import { useStateValue } from '@/hooks/useStateValue';
import { getBasketTotal } from '@/store/reducer';
import { formatCurrency } from '@/utils/formatCurrency';
import './Subtotal.css';

export default function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();

  return (
    <div className='subtotal'>
      <p>
        Subtotal ({basket.length} items):{' '}
        <strong>{formatCurrency(getBasketTotal(basket))}</strong>
      </p>
      <small className='subtotal__gift'>
        <input type='checkbox' /> This Order contains a gift
      </small>
      <button type='button' onClick={() => navigate('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  );
}
