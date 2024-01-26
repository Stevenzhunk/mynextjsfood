'use client';
import { useContext, useEffect, useState } from 'react';
import { CartContext, cartProductPrice } from '@/app/components/AppContext';
import SectionHeaders from '@/app/components/layout/SectionHeaders';
import Image from 'next/image';
import Trash from '@/app/components/icons/Trash';
import AddressInputs from '@/app/components/layout/AddressInputs';
import { useProfile } from '@/app/components/UseProfile';

export default function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

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
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        address,
        cartProducts,
      }),
    });

    const link = await response.json();
    window.location = link;
  }

  return (
    <section className="mt-8">
      <div className="text-center mb-8">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length == 0 && (
            <div> No products in our shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-2 border-b py-4"
              >
                <div className="w-24">
                  <Image
                    width={240}
                    height={240}
                    src={product.image}
                    alt={''}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>

                  {product.size && (
                    <div className="text-sm text-gray-700">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra, index) => (
                        <div key={index}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  {cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProducts(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 pr-16 flex justify-end items-center ">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery <br />
              Total:
            </div>
            <div className="text-lg font-semibold pl-2 text-right">
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
