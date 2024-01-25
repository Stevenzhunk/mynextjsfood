export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary mt-4 text-white rounded-full px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>Add (from${basePrice})</span>
      ) : (
        <span>Add ${basePrice}</span>
      )}
    </button>
  );
}
