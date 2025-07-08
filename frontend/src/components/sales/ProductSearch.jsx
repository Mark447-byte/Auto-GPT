import React from 'react';

function ProductSearch({ searchTerm, onSearchTermChange }) {
  return (
    <div className="mb-4 print:hidden">
      <input
        type="search"
        placeholder="Search products by name or barcode..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
  );
}

export default ProductSearch;
