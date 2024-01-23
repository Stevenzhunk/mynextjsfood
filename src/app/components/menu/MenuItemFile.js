export default function MenuItemFile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice } = item;
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
      // key={index}
    >
      <div className="text-center">
        <img
          src={image}
          alt="pizza"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>

      <h4 className="font-semibold my-3 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <button
        type="button"
        onClick={onAddToCart}
        className="bg-primary mt-4 text-white rounded-full px-8 py-2"
      >
        Add to cart ${basePrice}
      </button>
    </div>
  );
}
