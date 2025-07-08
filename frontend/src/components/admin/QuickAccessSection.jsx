import React from 'react';

function QuickAccessSection() {
  const handleQuickAccessAction = (action) => {
    let message = "";
    switch (action) {
      case "addBranch":
        message = "Simulating: Add New Branch process initiated...";
        // TODO: Potentially add a system log entry here in a more integrated app
        break;
      case "syncData":
        message = "Simulating: Data synchronization started...";
        break;
      case "exportReport":
        message = "Simulating: Full report export is being generated...";
        break;
      default:
        message = "Unknown quick access action.";
    }
    console.log(message);
    alert(message); // Simple feedback for now
  };

  return (
    <section id="quick-access" className="mb-8 print:hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          id="add-new-branch-btn"
          onClick={() => handleQuickAccessAction('addBranch')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-150 ease-in-out"
        >
          Add New Branch
        </button>
        <button
          id="sync-data-btn"
          onClick={() => handleQuickAccessAction('syncData')}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-150 ease-in-out"
        >
          Sync Data
        </button>
        <button
          id="export-report-btn"
          onClick={() => handleQuickAccessAction('exportReport')}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-150 ease-in-out"
        >
          Export Full Report
        </button>
      </div>
    </section>
  );
}

export default QuickAccessSection;
