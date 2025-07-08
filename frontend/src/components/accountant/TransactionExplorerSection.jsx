import React, { useState, useEffect, useCallback } from 'react';

// Sample data - in a real app, this would come from props, context, or an API call.
const initialSampleTransactions = [
    { date: '2023-10-26', id: 'SALE00123', type: 'Sale', description: 'Sale of 10 Cement Bags to J. Doe', amount: 850.00, paymentMethod: 'Mobile Money' },
    { date: '2023-10-25', id: 'EXP00045', type: 'Expense', description: 'Fuel for delivery truck', amount: -150.00, paymentMethod: 'Cash' },
    { date: '2023-10-24', id: 'PUR00088', type: 'Purchase', description: 'Restock of Iron Rods from Supplier X', amount: -5500.00, paymentMethod: 'Bank Transfer' },
    { date: '2023-09-15', id: 'SALE00122', type: 'Sale', description: 'Sale of 5 PVC Pipes', amount: 225.00, paymentMethod: 'Card' },
    { date: '2023-09-10', id: 'EXP00040', type: 'Expense', description: 'Office stationery', amount: -75.00, paymentMethod: 'Cash' },
    { date: '2023-08-20', id: 'SALE00120', type: 'Sale', description: 'Bulk sale of tiles', amount: 1200.00, paymentMethod: 'Bank Transfer' },
    { date: '2023-08-15', id: 'PUR00087', type: 'Purchase', description: 'New batch of sand', amount: -3500.00, paymentMethod: 'Cash' },
    { date: '2023-08-01', id: 'EXP00035', type: 'Expense', description: 'Salaries for August', amount: -12500.00, paymentMethod: 'Bank Transfer' },
    { date: '2023-07-28', id: 'SALE00119', type: 'Sale', description: 'Paint supplies for small project', amount: 320.00, paymentMethod: 'Cash' },
    { date: '2023-07-15', id: 'PUR00086', type: 'Purchase', description: 'Safety equipment restock', amount: -1200.00, paymentMethod: 'Card' },
];

const TRANSACTIONS_INCREMENT = 5;

function TransactionExplorerSection() {
  const [allTransactions, setAllTransactions] = useState(initialSampleTransactions);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: '' });
  const [displayedCount, setDisplayedCount] = useState(TRANSACTIONS_INCREMENT);

  const getFilteredTransactions = useCallback(() => {
    return allTransactions.filter(tx => {
      let dateMatch = true;
      let typeMatch = true;
      if (filters.startDate && tx.date < filters.startDate) dateMatch = false;
      if (filters.endDate && tx.date > filters.endDate) dateMatch = false;
      if (filters.type && tx.type !== filters.type) typeMatch = false;
      return dateMatch && typeMatch;
    });
  }, [allTransactions, filters]);

  const [visibleTransactions, setVisibleTransactions] = useState([]);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);

  useEffect(() => {
    const filtered = getFilteredTransactions();
    setTotalFilteredCount(filtered.length);
    setVisibleTransactions(filtered.slice(0, displayedCount));
  }, [filters, allTransactions, displayedCount, getFilteredTransactions]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    setDisplayedCount(TRANSACTIONS_INCREMENT); // Reset pagination on filter change
  };

  const applyFilters = () => { // Explicit filter button action
    setDisplayedCount(TRANSACTIONS_INCREMENT); // Reset pagination
    // The useEffect will pick up the filter change and re-calculate visibleTransactions
    // To force re-evaluation if filters haven't changed but we want to reset:
    const filtered = getFilteredTransactions();
    setTotalFilteredCount(filtered.length);
    setVisibleTransactions(filtered.slice(0, TRANSACTIONS_INCREMENT));
  };


  const handleLoadMore = () => {
    setDisplayedCount(prevCount => prevCount + TRANSACTIONS_INCREMENT);
  };

  // Simulate viewing transaction details
  const handleViewTransactionDetails = (txId) => {
    const tx = allTransactions.find(t => t.id === txId);
    if (tx) {
      alert(`Transaction Details:\nID: ${tx.id}\nDate: ${tx.date}\nType: ${tx.type}\nDescription: ${tx.description}\nAmount: ${tx.amount.toFixed(2)}\nMethod: ${tx.paymentMethod}`);
    }
  };


  return (
    <section id="transaction-explorer-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4 print:hidden">
        <h2 className="text-2xl font-semibold text-gray-700">Transaction Explorer</h2>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="text-sm py-1.5 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="text-sm py-1.5 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="text-sm py-1.5 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Types</option>
            <option value="Sale">Sale</option>
            <option value="Purchase">Purchase</option>
            <option value="Expense">Expense</option>
          </select>
          {/* Filter button is optional if inputs trigger filter on change, but can be explicit */}
          {/* <button onClick={applyFilters} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-3 rounded-md">Filter</button> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (GHS)</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visibleTransactions.length > 0 ? (
              visibleTransactions.map(tx => {
                let typeClass = '';
                switch (tx.type.toLowerCase()) {
                  case 'sale': typeClass = 'bg-green-100 text-green-800'; break;
                  case 'purchase': typeClass = 'bg-yellow-100 text-yellow-800'; break;
                  case 'expense': typeClass = 'bg-red-100 text-red-800'; break;
                  default: typeClass = 'bg-gray-100 text-gray-800';
                }
                const amountClass = tx.amount >= 0 ? 'text-green-700' : 'text-red-700';
                return (
                  <tr key={tx.id}>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{tx.date}</td>
                    <td
                        className="py-3 px-4 whitespace-nowrap text-sm text-indigo-600 hover:underline cursor-pointer"
                        title={`View details for ${tx.id}`}
                        onClick={() => handleViewTransactionDetails(tx.id)}
                    >
                        {tx.id}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeClass}`}>{tx.type}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 max-w-xs truncate" title={tx.description}>{tx.description}</td>
                    <td className={`py-3 px-4 whitespace-nowrap text-sm ${amountClass} text-right font-medium`}>{tx.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{tx.paymentMethod}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  {allTransactions.length === 0 ? "No transactions recorded yet." : "No transactions found matching your criteria."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {visibleTransactions.length < totalFilteredCount && (
        <div className="mt-4 text-center print:hidden">
          <button
            onClick={handleLoadMore}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Load More Transactions... ({totalFilteredCount - visibleTransactions.length} remaining)
          </button>
        </div>
      )}
    </section>
  );
}

export default TransactionExplorerSection;
