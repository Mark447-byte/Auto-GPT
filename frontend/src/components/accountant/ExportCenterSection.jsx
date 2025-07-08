import React, { useState } from 'react';

function ExportCenterSection() {
  const [exportOptions, setExportOptions] = useState({
    dataType: 'All Transactions',
    format: 'Excel (.xlsx)',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExportOptions(prevOptions => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleExportData = () => {
    let message = `Simulating export:\n--------------------\nData: ${exportOptions.dataType}\nFormat: ${exportOptions.format}`;
    if (exportOptions.startDate && exportOptions.endDate) {
      message += `\nPeriod: ${exportOptions.startDate} to ${exportOptions.endDate}`;
    } else if (exportOptions.startDate) {
      message += `\nFrom: ${exportOptions.startDate}`;
    } else if (exportOptions.endDate) {
      message += `\nUntil: ${exportOptions.endDate}`;
    }
    message += `\n--------------------\nExport process would start now.`;

    alert(message);
    console.log("Export Requested:", exportOptions);
    // Reset options after export if desired
    // setExportOptions({ dataType: 'All Transactions', format: 'Excel (.xlsx)', startDate: '', endDate: '' });
  };

  return (
    <section id="export-center-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Export Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="export-data-type-react" className="block text-sm font-medium text-gray-700 mb-1">Select Data to Export:</label>
          <select
            id="export-data-type-react"
            name="dataType"
            value={exportOptions.dataType}
            onChange={handleInputChange}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>All Transactions</option>
            <option>Sales Report (Summary)</option>
            <option>Sales Report (Detailed)</option>
            <option>Profit & Loss Statement</option>
            <option>Expense Report</option>
            <option>Current Inventory List</option>
          </select>
        </div>
        <div>
          <label htmlFor="export-format-react" className="block text-sm font-medium text-gray-700 mb-1">Select Format:</label>
          <select
            id="export-format-react"
            name="format"
            value={exportOptions.format}
            onChange={handleInputChange}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Excel (.xlsx)</option>
            <option>PDF (.pdf)</option>
            <option>CSV (.csv)</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="export-start-date-react" className="block text-sm font-medium text-gray-700 mb-1">Date Range (Optional):</label>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              id="export-start-date-react"
              name="startDate"
              value={exportOptions.startDate}
              onChange={handleInputChange}
              className="w-full text-sm py-1.5 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              id="export-end-date-react"
              name="endDate"
              value={exportOptions.endDate}
              onChange={handleInputChange}
              className="w-full text-sm py-1.5 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleExportData}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow flex items-center justify-center float-right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Data
        </button>
      </div>
    </section>
  );
}

export default ExportCenterSection;
