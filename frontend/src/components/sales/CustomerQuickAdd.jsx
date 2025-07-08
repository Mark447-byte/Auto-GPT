import React from 'react';

function CustomerQuickAdd({ customerName, onCustomerNameChange, customerContact, onCustomerContactChange }) {
  return (
    <section id="customer-quick-add-react" className="mb-5 pb-5 border-b border-gray-300 print:hidden">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Customer (Optional)</h3>
      <div className="space-y-2">
        <input
          type="text"
          id="pos-customer-name" // Unique ID
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        />
        <input
          type="tel"
          id="pos-customer-contact" // Unique ID
          placeholder="Customer Contact (e.g., 024xxxxxxx)"
          value={customerContact}
          onChange={(e) => onCustomerContactChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </section>
  );
}

export default CustomerQuickAdd;
