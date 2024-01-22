'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    try {
      const response = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      });
      setLoginInProgress(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form
        className="max-w-xs mx-auto"
        onSubmit={(ev) => handleFormSubmit(ev)}
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center"
        >
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </form>
      <div className="text-center my-4 text-gray-500 border-t pt-4">
        Not have Account ?{' '}
        <Link className="underline" href={'register'}>
          {' '}
          Click here &raquo;
        </Link>
      </div>
    </section>
  );
}
