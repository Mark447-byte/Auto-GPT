import React, { useState, useEffect } from 'react';
import ReportAccessCard from './ReportAccessCard';

// Sample data - in a real app, this would come from props, context, or an API call.
// currentPeriod would ideally be passed as a prop or read from context if needed for the alert.
const initialAvailableReports = [
    { id: 'sales_summary', name: 'Sales Report', description: 'Detailed breakdown of sales transactions.', buttonText: 'View Report', buttonClass: 'bg-indigo-500 hover:bg-indigo-600' },
    { id: 'pnl_statement', name: 'Profit & Loss Statement', description: 'Summary of revenues, costs, and expenses.', buttonText: 'Generate P&L', buttonClass: 'bg-green-500 hover:bg-green-600' },
    { id: 'expense_report', name: 'Expense Report', description: 'Detailed list of all business expenses.', buttonText: 'View Expenses', buttonClass: 'bg-red-500 hover:bg-red-600' },
    { id: 'inventory_valuation', name: 'Inventory Valuation', description: 'Current value of all stock items.', buttonText: 'Calculate Value', buttonClass: 'bg-yellow-500 hover:bg-yellow-600 text-gray-800' }
];

function ReportsHubSection({ currentPeriodText = "the current period" }) { // Accept currentPeriodText as a prop
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulate fetching available reports
    setReports(initialAvailableReports);
  }, []);

  const handleReportAccess = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`Simulating: Accessing '${report.name}' for period '${currentPeriodText}'...`);
      // In a real app, this would trigger report generation or navigation.
      console.log(`Accessing report: ${report.name} for period: ${currentPeriodText}`);
    } else {
      alert("Report not found.");
    }
  };

  return (
    <section id="reports-hub-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Reports Hub</h2>
      {reports.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 py-8">No reports available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map(report => (
            <ReportAccessCard
              key={report.id}
              report={report}
              onReportAccess={handleReportAccess}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ReportsHubSection;
