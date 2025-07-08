import React, { useState } from 'react'; // Added useState for currentPeriodText
import FinancialOverviewSection from '../../components/accountant/FinancialOverviewSection';
import ReportsHubSection from '../../components/accountant/ReportsHubSection';
import TransactionExplorerSection from '../../components/accountant/TransactionExplorerSection';
import ExportCenterSection from '../../components/accountant/ExportCenterSection'; // Import new component

// Define Accountant Navigation Items
export const accountantNavItems = [
  { name: 'Financial Summary', path: '#financial-summary' }, // Using on-page anchors for now
  { name: 'Reports Hub', path: '#reports-hub' },
  { name: 'Transaction Explorer', path: '#transaction-explorer' },
  { name: 'Export Center', path: '#export-center' },
  { name: 'Logout', path: '/select-role' }, // Or /login
];

export const accountantSidebarSubtitle = "Accountant Portal";

function AccountantDashboardPage() {
  // State for data will be added here or in child components
  // Need to manage the text of the current period for the reports hub alert
  const [currentPeriodText, setCurrentPeriodText] = useState('Last 30 Days'); // Default

  // This function would be passed to FinancialOverviewSection to update the text
  // For simplicity in this step, FinancialOverviewSection will manage its own periodKey
  // but ReportsHubSection will receive the text for its alert.
  // A more robust solution would use Context or lift state up if FinancialOverviewSection
  // needs to inform its parent about the selected period text.
  // For now, we'll just use the state here and assume FinancialOverviewSection also updates it.

  // Callback for FinancialOverviewSection to update the period text
  // This is a conceptual placeholder of how they might interact.
  // The actual `FinancialOverviewSection` already has its own period select and logic.
  // We are just using `currentPeriodText` for the alert in `ReportsHubSection`.
  // For `FinancialOverviewSection` to truly drive this, its `handlePeriodChange` would need to call a prop function.
  // Let's get the selected text from periodSelect in FinancialOverviewSection for the alert.
  // This is becoming a bit complex without lifting state properly.
  // For now, ReportsHubSection will just use the `currentPeriodText` from this page.
  // We can refine this if shared state becomes more critical.

  // Let's simulate updating currentPeriodText based on the FinancialOverviewSection's internal state.
  // This would ideally be done via a callback prop passed to FinancialOverviewSection.
  // For now, we'll just keep it simple and assume the default or a fixed value for alerts.
  // To make the ReportsHub alert more dynamic based on FinancialOverview's select:
  // 1. `FinancialOverviewSection` would need an `onPeriodChange` prop (a function).
  // 2. `AccountantDashboardPage` would define `handlePeriodChangeForAlert(newPeriodKey, newPeriodText)`
  // 3. `FinancialOverviewSection` would call `props.onPeriodChange(selectedKey, selectedText)`
  // 4. `AccountantDashboardPage` would then `setCurrentPeriodText(newPeriodText)`.

  // Let's make FinancialOverviewSection take an onPeriodChangeText callback
  const handlePeriodTextChange = (newText) => {
    setCurrentPeriodText(newText);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-3xl font-bold text-gray-800">Accountant Dashboard</h1>
      </header>
      <p className="text-gray-600 mb-8 print:hidden">
        Welcome, Accountant! Access financial reports, transaction data, and export tools (React Version).
      </p>

      <div id="financial-summary"><FinancialOverviewSection onPeriodTextChange={handlePeriodTextChange} /></div>
      <div id="reports-hub"><ReportsHubSection currentPeriodText={currentPeriodText} /></div>
      <div id="transaction-explorer"><TransactionExplorerSection /></div>
      <div id="export-center"><ExportCenterSection /></div>

      <footer className="text-center text-sm text-gray-500 mt-10 print:hidden">
        <p>&copy; {new Date().getFullYear()} BatiStock. All rights reserved.</p>
      </footer>
    </>
  );
}

export default AccountantDashboardPage;
