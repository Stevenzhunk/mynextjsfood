/* eslint-disable @next/next/no-img-element */
'use client';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { CartContext } from '../AppContext';
import { useContext } from 'react';
import Link from 'next/link';
import ShoppingCart from '../icons/ShoppingCart';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Menu', href: '/menu', current: false },
  { name: 'About', href: '#about', current: false },
  { name: 'Contact', href: '#contact', current: false },
];

//Show dont show if not the current path
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProbesHeader({ profileImage }) {
  //recover the session data user
  const session = useSession();
  const status = session?.status;
  const userData = session?.data?.user;
  const userDataImage = userData?.image;

  const { cartProducts } = useContext(CartContext);

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* nav icon */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-16 w-auto"
                    src="/planet.jpg"
                    alt="Your Company"
                  />
                </div>

                {/* titles nav */}
                <div className="hidden lg:flex sm:ml-6 sm:flex">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="rounded-full px-3 py-2 text-base font-bold flex items-center text-gray-500 hover:bg-primary hover:text-white hover:rounded-full"
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                style={{ gap: '1rem!important' }}
              >
                {/* Profile dropdown */}
                {/* checking login */}
                <nav className="flex items-center text-gray-500 font-semibold">
                  {status === 'authenticated' && (
                    <>
                      <Link
                        href={'/profile'}
                        className="whitespace-nowrap hidden lg:flex"
                      >
                        Hello, {userName}
                      </Link>

                      {/* Account image Profile */}
                      <div className="pr-0 sm:pr-2">
                        <Menu as="div" className="relative ml-3 w-10">
                          <div>
                            <Menu.Button
                              className="relative flex rounded-full bg-white text-sm p-1"
                              style={{ padding: '1px !important' }}
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              {userDataImage ? (
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={userDataImage}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src="/default.jpg"
                                  alt=""
                                />
                              )}
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {status !== 'unauthenticated' && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="/profile"
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Your Profile
                                    </a>
                                  )}
                                </Menu.Item>
                              )}
                              {status !== 'unauthenticated' && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      onClick={() => {
                                        signOut();
                                        redirect(`/`);
                                      }}
                                      href="#"
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Sign out
                                    </a>
                                  )}
                                </Menu.Item>
                              )}
                              {status === 'unauthenticated' && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="/login"
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Sign In
                                    </a>
                                  )}
                                </Menu.Item>
                              )}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>

                      <button
                        onClick={() => {
                          signOut();
                          redirect(`/`);
                        }}
                        className="bg-primary rounded-full text-white px-8 py-2 hidden lg:flex"
                      >
                        Logout
                      </button>
                    </>
                  )}
                  {status === 'unauthenticated' && (
                    <>
                      <Link className="pr-4" href={'/login'}>
                        Login
                      </Link>
                      <Link
                        href={'/register'}
                        className="bg-primary rounded-full text-white px-8 py-2"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </nav>

                {/* Cart  */}
                <Link href={'/cart'} className="relative">
                  <ShoppingCart />
                  <span className="absolute -top-3 -right-3 bg-primary text-white text-xs p-1 px-1 rounded-full leading-3">
                    {cartProducts.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium h-4'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
