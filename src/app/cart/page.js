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

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
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
          <div className="text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProp={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">pay${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
