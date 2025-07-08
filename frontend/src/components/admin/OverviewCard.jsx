import React from 'react';

function OverviewCard({ title, value, changeInfo, valueColor = 'text-gray-900', subTextColor = 'text-gray-500' }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold ${valueColor} mt-2`}>{value}</p>
      {changeInfo && <p className={`text-sm ${subTextColor} mt-1`}>{changeInfo}</p>}
    </div>
  );
}

export default OverviewCard;
