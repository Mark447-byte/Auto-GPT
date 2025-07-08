import React from 'react';

function ReportAccessCard({ report, onReportAccess }) {
  if (!report) return null;

  // Determine icon based on report name or type (simplified)
  let iconSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; // Default icon
  if (report.name.toLowerCase().includes('sales')) {
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  } else if (report.name.toLowerCase().includes('profit') || report.name.toLowerCase().includes('p&l')) {
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
  } else if (report.name.toLowerCase().includes('expense')) {
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  } else if (report.name.toLowerCase().includes('inventory')) {
        iconSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7s0 0 0 0m16 0s0 0 0 0M12 15c-2.665 0-5.23-1.113-6.914-2.91A11.814 11.814 0 014 10.91V10c0-2.21 3.582-4 8-4s8 1.79 8 4v.91c0 .996-.607 1.902-1.532 2.478C17.23 13.887 14.665 15 12 15zm0 0v4" /></svg>;
  }

  return (
    <div className="report-card bg-gray-50 hover:bg-gray-100 p-5 rounded-lg shadow-sm border border-gray-200 cursor-pointer transition-colors print:shadow-none print:border-gray-300">
      <div className="flex items-center space-x-3">
        {iconSvg}
        <div>
          <h3 className="text-lg font-medium text-gray-800">{report.name}</h3>
          <p className="text-xs text-gray-500">{report.description}</p>
        </div>
      </div>
      <button
        onClick={() => onReportAccess(report.id)}
        className={`report-action-btn mt-3 text-xs text-white py-1 px-3 rounded-md w-full sm:w-auto ${report.buttonClass} print:hidden`}
      >
        {report.buttonText}
      </button>
    </div>
  );
}

export default ReportAccessCard;
