'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '@/app/components/layout/SectionHeaders';
import UserTabs from '@/app/components/layout/UserTabs';
import { useProfile } from '@/app/components/UseProfile';
import { dbTimeforHuman } from '@/app/libs/datetime';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetch('/api/orders').then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
      });
    });
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <div
              className="bg-gray-100 mb-2 p-4 rounded-lg grid items-center grid-cols-3"
              key={index}
            >
              <div className="text-gray-500">{order.userEmail}</div>
              <div>{order.cartProducts.map((p) => p.name).join(', ')}</div>
              <div className="text-right flex gap-2 items-center">
                <span
                  className={
                    (order.paid ? 'bg-green-500' : 'bg-red-400') +
                    ' p-2 rounded-md text-white'
                  }
                >
                  {order.paid ? 'Paid' : 'Not Paid'}
                </span>
                {dbTimeforHuman(order.createdAt)}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
