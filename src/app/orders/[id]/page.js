'use client';
import SectionHeaders from '@/app/components/layout/SectionHeaders';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/app/components/AppContext';

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    if (typeof window.console !== 'underfined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
  }, []);

  return (
    <section className="max-w-2xl mx-auto text-center mt-8 ">
      <SectionHeaders mainHeader={'Your Order'} />
      <div className="my-4">
        <p>Thanks for your order</p>
        <p>We Will call you when your order woill be on the way</p>
      </div>
    </section>
  );
}
