import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormStatus } from 'react-dom';

import logo from '@/assets/images/apple.png';
import { auth } from '@/lib/firebase';
import styles from './Login.module.css';

function LoginPendingMessage() {
  const { pending } = useFormStatus();
  if (!pending) return null;
  return (
    <p role='status' className={styles.login__pending} aria-live='polite'>
      Please wait…
    </p>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <div className={styles.login}>
      <Link to='/'>
        <img className={styles.login__logo} src={logo} alt='Apple Store' />
      </Link>
      <section className={styles.login__container} aria-labelledby='login-heading'>
        <h1 id='login-heading'>Sign in</h1>
        <form
          action={async (formData) => {
            setFormError(null);
            const email = String(formData.get('email') ?? '').trim();
            const password = String(formData.get('password') ?? '');
            const intent = String(formData.get('intent') ?? 'signin');

            if (!email || !password) {
              setFormError('Enter email and password.');
              return;
            }

            try {
              if (intent === 'register') {
                await auth.createUserWithEmailAndPassword(email, password);
              } else {
                await auth.signInWithEmailAndPassword(email, password);
              }
              navigate('/');
            } catch (err: unknown) {
              setFormError(
                err instanceof Error ? err.message : String(err),
              );
            }
          }}
        >
          <LoginPendingMessage />
          <label htmlFor='login-email'>Email</label>
          <input
            id='login-email'
            name='email'
            type='email'
            autoComplete='email'
            required
            placeholder='something@example.com'
          />

          <label htmlFor='login-password'>Password</label>
          <input
            id='login-password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            placeholder='Password'
          />

          {formError ? (
            <p role='alert' className={styles.login__error}>
              {formError}
            </p>
          ) : null}

          <button
            type='submit'
            name='intent'
            value='signin'
            className={styles.login__signInButton}
          >
            Sign in
          </button>
          <button
            type='submit'
            name='intent'
            value='register'
            className={styles.login__registerButton}
          >
            Create your Apple account
          </button>
        </form>
        <p className={styles.login__legal}>
          By signing-in you agree to Apple's FAKE STORE Clone Conditions of Use
          &amp; Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </section>
    </div>
  );
}
