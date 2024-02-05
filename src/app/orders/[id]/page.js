'use client';
import SectionHeaders from '@/app/components/layout/SectionHeaders';
import { useContext, useEffect, useState } from 'react';
import { CartContext, cartProductPrice } from '@/app/components/AppContext';
import { useParams } from 'next/navigation';
import AddressInputs from '@/app/components/layout/AddressInputs';
import CartProduct from '@/app/components/menu/CartProduct';

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState('');
  const [loadingOrder, setLoadingOrder]= useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== 'underfined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true)
      fetch('/api/orders?id=' + id).then((res) => {
        res.json().then((orderDara) => {
          setOrder(orderDara);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  let subtotal = 0
  if(order?.cartProducts){
    for (const product of order?.cartProducts){
      subtotal +=cartProductPrice(product);
    }
  }


  return (
    <section className="max-w-2xl mx-auto mt-8 ">
      <div className="text-center">
        <SectionHeaders mainHeader={'Your Order'} />
        <div className="my-4 mb-8">
          <p>Thanks for your order</p>
          <p>We Will call you when your order woill be on the way</p>
        </div>
      </div>
      {loadingOrder && (
        <div>Loading order...</div>
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product,index) =>(
              <CartProduct product={product} key={index} />
            ))}
            <div className='text-right py-2 text-gray-500'>
              Subtotal : <span className='text-black font-bold inline-block w-8'>${subtotal}</span><br />
              Delivery : <span className='text-black font-bold inline-block w-8'>$5</span><br />
              Total : <span className='text-black font-bold inline-block w-8'>${subtotal +5}</span><br />
            </div>
          </div>
            
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProp={...order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
