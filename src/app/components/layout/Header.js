'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CartContext } from '../AppContext';
import { useContext } from 'react';

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className="flex item-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link
          className="text-primary font-semibold text-2xl flex gap-2"
          href="/"
        >
          {/* STPIZZA{''} */}
          <Image
            src="/planet.jpg"
            alt="icon"
            width={120}
            height={120}
            className="w-20 items-center justify-center"
          />
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>

      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => {
                signOut();
                redireczt(`/`);
              }}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Logout
            </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'}>Login</Link>
            <Link
              href={'/register'}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Register
            </Link>
          </>
        )}

        <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
      </nav>
    </header>
  );
}
