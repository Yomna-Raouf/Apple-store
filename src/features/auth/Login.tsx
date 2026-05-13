import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '@/assets/images/apple.png';
import { auth } from '@/lib/firebase';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e: FormEvent) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err: unknown) => alert(String(err)));
  };

  const register = (e: FormEvent) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        if (cred) {
          navigate('/');
        }
      })
      .catch((err: unknown) => alert(String(err)));
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login__logo' src={logo} alt='apple logo' />
      </Link>
      <div className='login__container'>
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='something@example.com'
            type='email'
          />

          <h5>Password</h5>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            type='password'
          />
          <button type='button' onClick={signIn} className='login__signInButton'>
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to Apple's FAKE STORE Clone Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type='button'
          onClick={register}
          className='login__registerButton'
        >
          Create your Apple account
        </button>
      </div>
    </div>
  );
}
