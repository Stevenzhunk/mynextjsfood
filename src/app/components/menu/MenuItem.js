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
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtra, setSelectedExtra] = useState([]);

  const { addToCart } = useContext(CartContext);

  const NumberBasePrice = parseInt(basePrice);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtra);
    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtra((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtra((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = NumberBasePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtra?.length > 0) {
    for (const extra of selectedExtra) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center "
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-4 rounded-gl max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className="mx-auto"
                style={{ width: 'auto', height: 'auto' }}
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Select Sizes</h3>

                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-3 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />
                      {size.name} ${size.price + NumberBasePrice}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <div className="p-2">
                    <h3 className="text-center text-gray-700">Any Extra ?</h3>
                    {extraIngredientPrices.map((extraThing) => (
                      <label
                        key={extraThing._id}
                        className="flex items-center gap-2 p-3 border rounded-md mb-1"
                      >
                        <input
                          type="checkbox"
                          onClick={(ev) =>
                            handleExtraThingClick(ev, extraThing)
                          }
                          name={extraThing.name}
                        />
                        {extraThing.name} ${extraThing.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to cart ${selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemFile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
