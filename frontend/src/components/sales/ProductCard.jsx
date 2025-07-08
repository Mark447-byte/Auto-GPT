import React from 'react';

function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  return (
    <div
      className="product-card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col justify-between print:shadow-none print:border-gray-300"
      onClick={() => onAddToCart(product)} // Make the whole card clickable to add to cart
    >
      <div className="p-3">
        <img
          src={product.image || `https://via.placeholder.com/150/CCCCCC/FFFFFF?text=${product.name.substring(0,3)}`}
          alt={product.name}
          className="w-full h-24 object-contain rounded-md mb-2 pointer-events-none" // pointer-events-none so click goes to parent
        />
        <h4 className="text-sm font-semibold text-gray-800 truncate pointer-events-none" title={product.name}>
          {product.name}
        </h4>
        <p className="text-xs text-gray-500 pointer-events-none">SKU: {product.id}</p>
      </div>
      <div className="p-3 bg-gray-50 border-t border-gray-200 print:bg-transparent">
        <p className="text-md font-bold text-indigo-600 text-center pointer-events-none">
          GHS {product.price.toFixed(2)}
        </p>
        {/* The button is still here for visual cue / accessibility, but click is on card */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} // Prevent double event if card also has click
          className="add-to-cart-btn w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md mt-2 font-medium print:hidden"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
