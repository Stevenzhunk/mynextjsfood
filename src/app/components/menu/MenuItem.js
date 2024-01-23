import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import toast from 'react-hot-toast';
import MenuItemFile from './MenuItemFile';
import Image from 'next/image';

export default function MenuItem(menuItem) {
  const {
    image,
    name,
    description,
    basePrice,
    sizes,
    extraIngredientPrices,
    index,
  } = menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  const NumberBasePrice = parseInt(basePrice);

  function handleAddToCartButtonClick() {
    if (sizes.length === 0 && extraIngredientPrices.length === 0) {
      addToCart(menuItem);
      toast.success('Added to cart!');
    } else {
      setShowPopup(true);
    }
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center ">
          <div className="bg-white p-4 rounded-gl max-w-md">
            <Image
              src={image}
              alt={name}
              width={200}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>
            {sizes?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Pick your size</h3>
                {sizes.map((size) => (
                  // eslint-disable-next-line react/jsx-key
                  <label className="flex items-center gap-2 p-3 border rounded-md mb-1">
                    <input type="radio" name="size" />
                    {size.name} ${size.price + NumberBasePrice}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientPrices?.length > 0 && (
              <div className="py-2">
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your extra</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    // eslint-disable-next-line react/jsx-key
                    <label className="flex items-center gap-2 p-3 border rounded-md mb-1">
                      <input type="checkbox" name={extraThing.name} />
                      {extraThing.name} ${extraThing.price}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <MenuItemFile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
