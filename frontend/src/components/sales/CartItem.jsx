import React from 'react';

function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  if (!item) return null;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="cart-item flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm print:border-b print:border-gray-300 print:shadow-none print:rounded-none">
      <div className="flex-grow w-2/5 pr-2">
        <p className="text-sm font-medium text-gray-800 truncate" title={item.name}>
          {item.name}
        </p>
        <p className="text-xs text-gray-500">
          GHS {item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center space-x-1.5 ml-2 print:hidden">
        <button
          onClick={decrementQuantity}
          className="text-indigo-500 hover:text-indigo-700 font-bold p-1 leading-none"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          min="0" // Allow 0 for removal through input, handled by onUpdateQuantity
          onChange={handleQuantityChange}
          className="quantity-input w-10 text-center border border-gray-300 rounded-md text-sm py-0.5"
          aria-label="Item quantity"
        />
        <button
          onClick={incrementQuantity}
          className="text-indigo-500 hover:text-indigo-700 font-bold p-1 leading-none"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <p className="text-sm font-semibold text-gray-800 w-20 text-right ml-2">
        GHS {(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => onRemoveItem(item.id)}
        className="text-red-500 hover:text-red-700 ml-2 p-1 print:hidden"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

export default CartItem;
