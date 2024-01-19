'use client';
import Link from 'next/link';
import UserTabs from '@/app/components/layout/UserTabs';
import { useProfile } from './../components/UseProfile';
import Right from '../components/icons/Right';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState();
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then((res) =>
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      })
    );
  }, []);

  if (loading) {
    return 'loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex " href={'/menu-items/new'}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>

      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item: </h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={'/menu-items/edit/' + item._id}
                key={item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={''}
                    width={150}
                    height={250}
                    className="rounded-md w-full h-full"
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
