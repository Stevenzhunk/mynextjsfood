'use client';
import { useContext, useEffect, useState } from 'react';
import { CartContext, cartProductPrice } from '@/app/components/AppContext';
import SectionHeaders from '@/app/components/layout/SectionHeaders';
import Image from 'next/image';
import Trash from '@/app/components/icons/Trash';
import AddressInputs from '@/app/components/layout/AddressInputs';
import { useProfile } from '@/app/components/UseProfile';
import toast from 'react-hot-toast';
import CartProduct from '../components/menu/CartProduct';

export default function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later',
    });
  }
  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😉</p>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="text-center mb-8">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          {cartProducts?.length == 0 && (
            <div> No products in our shopping cart</div>
          )}

          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                product={product}
                onRemove={removeCartProducts}
                index={index}
                key={index}
              />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center ">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery <br />
              Total:
            </div>
            <div className=" font-semibold pl-2 text-right">
              ${subtotal}
              <br />
              $5 <br />${subtotal + 5}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProp={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
