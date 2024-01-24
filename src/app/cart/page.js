'use client';
import { useContext } from 'react';
import { CartContext } from '../components/AppContext';
import SectionHeaders from '../components/layout/SectionHeaders';
import Image from 'next/image';

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  //console.log(cartProducts);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="grid gap-4 grid-cols-2">
        <div>
          {cartProducts?.length == 0 && (
            <div> No products in our shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-2 border-b py-2"
              >
                <div className="w-24">
                  <Image
                    width={240}
                    height={240}
                    src={product.image}
                    alt={''}
                  />
                </div>
                <div>
                  <h3>{product.name}</h3>

                  {product.size && (
                    <div>
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div>
                      {' '}
                      Extras :{' '}
                      {product.extras.map((extra, index) => (
                        <div key={index}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}{' '}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div>right</div>
      </div>
    </section>
  );
}
