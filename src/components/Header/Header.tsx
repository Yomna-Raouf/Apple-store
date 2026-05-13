import { Link } from 'react-router-dom';
import { MdSearch, MdShoppingBasket } from 'react-icons/md';

import logo from '@/assets/images/apple.png';
import { useStateValue } from '@/hooks/useStateValue';
import { auth } from '@/lib/firebase';
import './Header.css';

export default function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <nav className='Header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Apple Store' />
      </Link>
      <div className='Header__search'>
        <input
          placeholder='🚫 not working yet 🚫'
          type='text'
          className='Header__searchInput'
        />
        <MdSearch className='Header__searchIcon' aria-hidden />
      </div>

      <div className='Header__nav'>
        <Link
          to='/login'
          className='Header__link'
          onClick={(e) => {
            if (user) {
              e.preventDefault();
              handleAuth();
            }
          }}
        >
          <div className='Header__option'>
            <span className='Header__optionLineOne'>
              Hello {user ? user.email : 'guest'}
            </span>
            <span className='Header__optionLineTwo'>
              {user ? 'sign out' : 'Sign in '}
            </span>
          </div>
        </Link>

        <Link to='/' className='Header__link'>
          <div className='Header__option'>
            <span className='Header__optionLineOne'>Return</span>
            <span className='Header__optionLineTwo'>& Orders</span>
          </div>
        </Link>

        <Link to='/' className='Header__link'>
          <div className='Header__option'>
            <span className='Header__optionLineOne'>Your</span>
            <span className='Header__optionLineTwo'>Prime</span>
          </div>
        </Link>

        <Link to='/checkout' className='Header__link'>
          <div className='Header__optionBasket'>
            <MdShoppingBasket aria-hidden />
            <span className='Header__optionLineTwo header__basketCount'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
