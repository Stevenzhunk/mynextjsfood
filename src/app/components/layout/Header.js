'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const session = useSession();
  const status = session.status;
  //console.log(status);
  return (
    <header className="flex item-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
          STPIZZA{''}
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>

      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2"
          >
            Logout
          </button>
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
      </nav>
    </header>
  );
}
