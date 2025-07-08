import React from 'react';

function PaymentOptions({ selectedPaymentMethod, onPaymentSelect, onGenerateReceipt, cartIsEmpty }) {

  const paymentMethods = [
    { name: 'Cash', id: 'cash', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, style: 'border-blue-500 text-blue-600 hover:bg-blue-50' },
    { name: 'Card', id: 'card', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>, style: 'border-green-500 text-green-600 hover:bg-green-50' },
    { name: 'Mobile Money', id: 'mobile_money', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, style: 'border-yellow-500 text-yellow-600 hover:bg-yellow-50 col-span-2 md:col-span-1' }, // Adjusted span for 2-col layout
  ];

  // Special style for the third button if there are exactly three, to make it span full width on small screens
  // Or adjust the grid layout for small screens to be 1 column if preferred for 3 items.
  // For now, using col-span-2 on the last item in the paymentMethods array if it's the third one.
  if (paymentMethods.length === 3) {
      paymentMethods[2].style += ' sm:col-span-2'; // Span full on small if 3 items
  }


  return (
    <section id="payment-options-react" className="print:hidden">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Payment</h3>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedPaymentMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => onPaymentSelect(method.id)}
              className={`payment-btn font-medium py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center text-sm transition-colors duration-150
                ${isSelected
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-1'
                  : `bg-white border-2 ${method.style}`
                }
                ${method.name === 'Mobile Money' ? 'col-span-2 md:col-span-1' : ''}
              `} // Ensure Mobile Money spans if it's the 3rd item, or adjust grid for 3 items
            >
              {method.icon}
              {method.name}
            </button>
          );
        })}
      </div>
      <button
        id="generate-receipt-btn-react"
        onClick={onGenerateReceipt}
        disabled={cartIsEmpty}
        className={`w-full font-bold py-3 px-4 rounded-lg shadow-lg mt-4 text-lg transition-colors duration-150
          ${cartIsEmpty
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
          }
        `}
      >
        Generate Receipt
      </button>
    </section>
  );
}

export default PaymentOptions;
