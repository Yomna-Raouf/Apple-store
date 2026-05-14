import { Link } from 'react-router-dom';
import { MdSearch, MdShoppingBasket } from 'react-icons/md';

import logo from '@/assets/images/apple.png';
import { useStateValue } from '@/hooks/useStateValue';
import { auth } from '@/lib/firebase';
import { getBasketItemCount } from '@/store/reducer';
import styles from './Header.module.css';

export default function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <header className={styles.Header}>
      <nav className={styles.Header__navBar} aria-label='Primary'>
        <Link className={styles.Header__brand} to='/'>
          <img className={styles.header__logo} src={logo} alt='Apple Store home' />
        </Link>
        <form
          className={styles.Header__search}
          role='search'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor='header-search' className='visually-hidden'>
            Search products
          </label>
          <div className={styles.Header__searchShell}>
            <MdSearch className={styles.Header__searchIcon} aria-hidden />
            <input
              id='header-search'
              placeholder='Search the store'
              type='search'
              className={styles.Header__searchInput}
              autoComplete='off'
            />
          </div>
        </form>

        <ul className={styles.Header__nav}>
          <li>
            <Link
              to='/login'
              className={styles.Header__link}
              onClick={(e) => {
                if (user) {
                  e.preventDefault();
                  handleAuth();
                }
              }}
            >
              <span className={styles.Header__option}>
                <span className={styles.Header__optionLineOne}>
                  Hello {user ? user.email : 'guest'}
                </span>
                <span className={styles.Header__optionLineTwo}>
                  {user ? 'sign out' : 'Sign in '}
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.Header__link}>
              <span className={styles.Header__option}>
                <span className={styles.Header__optionLineOne}>Return</span>
                <span className={styles.Header__optionLineTwo}>& Orders</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.Header__link}>
              <span className={styles.Header__option}>
                <span className={styles.Header__optionLineOne}>Your</span>
                <span className={styles.Header__optionLineTwo}>Store</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to='/checkout' className={styles.Header__link}>
              <span className={styles.Header__optionBasket}>
                <MdShoppingBasket aria-hidden />
                <span
                  className={`${styles.Header__optionLineTwo} ${styles.header__basketCount}`}
                >
                  {basket ? getBasketItemCount(basket) : 0}
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
