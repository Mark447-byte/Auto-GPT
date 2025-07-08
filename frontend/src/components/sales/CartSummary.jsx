import React from 'react';
import CartItem from './CartItem';

function CartSummary({ cartItems, onUpdateQuantity, onRemoveItem, subtotal, taxAmount, totalAmount }) {
  return (
    <section id="current-sale-summary-react" className="flex-grow mb-5 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Current Sale</h2>

      <div id="cart-items-list-react" className="space-y-3 overflow-y-auto flex-grow max-h-60 md:max-h-72 lg:max-h-[calc(100vh-450px)] pr-1 print:max-h-full print:overflow-visible"> {/* Adjusted max-h for better flex grow */}
        {cartItems.length === 0 ? (
          <div id="empty-cart-message-react" className="text-center text-gray-500 py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>Your cart is empty.</p>
            <p className="text-xs">Add products from the left panel.</p>
          </div>
        ) : (
          cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))
        )}
      </div>

      {cartItems.length > 0 && ( // Only show totals if cart is not empty
        <div id="cart-totals-react" className="mt-auto pt-4 border-t-2 border-gray-300 space-y-1.5 print:mt-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal:</span>
            <span id="subtotal-display-react" className="font-medium">GHS {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Tax (NHIL 2.5%):</span>
            <span id="tax-display-react" className="font-medium">GHS {taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 print:hidden">
            <span>Discount:</span>
            <a href="#" id="add-discount-link-react" className="text-xs text-indigo-600 hover:underline">Add Discount</a>
            {/* For now, discount is 0. This could be a state later. */}
            <span id="discount-display-react" className="font-medium">GHS 0.00</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-800 pt-1.5 border-t border-dashed">
            <span>Total:</span>
            <span id="total-display-react" >GHS {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartSummary;
