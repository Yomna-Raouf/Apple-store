import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '@/lib/firebase';
import logo from '@/assets/images/apple.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => alert(err));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        if (cred) {
          navigate('/');
        }
      })
      .catch((err) => alert(err));
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
          <button onClick={signIn} className='login__signInButton'>
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to Apple's FAKE STORE Clone Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className='login__registerButton'>
          Create your Apple account
        </button>
      </div>
    </div>
  );
}

export default Login;
