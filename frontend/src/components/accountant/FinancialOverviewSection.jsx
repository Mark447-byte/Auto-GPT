import React, { useState, useEffect } from 'react';
import OverviewCard from '../admin/OverviewCard'; // Reusing the Admin's OverviewCard

// Sample data, similar to what was in the vanilla JS for accountant_dashboard
const initialFinancialOverviewData = {
    last30Days: { revenue: 250450.75, expenses: 180320.50, profitChange: '+8%', expenseChange: '+5%', profitPercentChange: '+15%' },
    last90Days: { revenue: 780120.20, expenses: 550980.10, profitChange: '+12%', expenseChange: '+7%', profitPercentChange: '+18%' },
    thisQuarter: { revenue: 810500.00, expenses: 590200.70, profitChange: '+10%', expenseChange: '+6%', profitPercentChange: '+16%' },
    // Add more periods as needed to match select options
};

function FinancialOverviewSection() {
  const [currentPeriodKey, setCurrentPeriodKey] = useState('last30Days');
  const [displayData, setDisplayData] = useState(initialFinancialOverviewData.last30Days);

  // Accept onPeriodTextChange as a prop
  const { onPeriodTextChange } = props;


  useEffect(() => {
    const newDisplayData = initialFinancialOverviewData[currentPeriodKey] || { revenue: 0, expenses: 0, profitChange: 'N/A', expenseChange: 'N/A', profitPercentChange: 'N/A' };
    setDisplayData(newDisplayData);

    // Call the callback with the text of the selected option
    if (onPeriodTextChange) {
        const selectElement = document.getElementById('period-select-acc'); // Assuming this ID is on the select
        if (selectElement) {
            const selectedOptionText = selectElement.options[selectElement.selectedIndex]?.text;
            if (selectedOptionText) {
                onPeriodTextChange(selectedOptionText);
            }
        }
    }
  }, [currentPeriodKey, onPeriodTextChange]);

  const handlePeriodChange = (event) => {
    setCurrentPeriodKey(event.target.value);
    // The useEffect above will handle calling onPeriodTextChange
  };

  const netProfit = displayData.revenue - displayData.expenses;

  return (
    <section id="financial-summary-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4 print:hidden">
        <h2 className="text-2xl font-semibold text-gray-700">Financial Overview</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="period-select-acc" className="text-sm font-medium text-gray-700">Period:</label>
          <select
            id="period-select-acc"
            name="period"
            value={currentPeriodKey}
            onChange={handlePeriodChange}
            className="text-sm py-1.5 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="last30Days">Last 30 Days</option>
            <option value="last90Days">Last 90 Days</option>
            <option value="thisQuarter">This Quarter</option>
            {/* Add more options here if data exists for them */}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard
          title="Total Revenue"
          value={`GHS ${displayData.revenue.toFixed(2)}`}
          changeInfo={`${displayData.profitChange} vs previous period`} // Assuming profitChange refers to revenue trend here
          valueColor="text-green-600"
          subTextColor="text-green-500"
        />
        <OverviewCard
          title="Total Expenses"
          value={`GHS ${displayData.expenses.toFixed(2)}`}
          changeInfo={`${displayData.expenseChange} vs previous period`}
          valueColor="text-red-600"
          subTextColor="text-red-500"
        />
        <OverviewCard
          title="Net Profit"
          value={`GHS ${netProfit.toFixed(2)}`}
          changeInfo={`${displayData.profitPercentChange} vs previous period`}
          valueColor="text-blue-600"
          subTextColor="text-blue-500"
        />
      </div>
    </section>
  );
}

export default FinancialOverviewSection;
