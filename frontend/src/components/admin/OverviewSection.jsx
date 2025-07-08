import React from 'react';
import OverviewCard from './OverviewCard';

function OverviewSection({ overviewData }) {
  if (!overviewData) {
    return (
        <section id="overview" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview Panels</h2>
            <p>Loading overview data...</p>
        </section>
    );
  }

  return (
    <section id="overview" className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview Panels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Total Revenue"
          value={overviewData.totalRevenue || "GHS 0.00"}
          valueColor="text-green-500"
          changeInfo={overviewData.totalRevenueChange || "+0% from last month"}
        />
        <OverviewCard
          title="Active Projects"
          value={overviewData.activeProjects || "0"}
          valueColor="text-blue-500"
          changeInfo={overviewData.activeProjectsInfo || "0 needing attention"}
        />
        <OverviewCard
          title="Inventory Status"
          value={`${overviewData.lowStockItems || 0} Items Low`}
          valueColor="text-yellow-500"
          changeInfo={`Total Items: ${overviewData.totalStockItems || 0}`}
        />
        <OverviewCard
          title="Staff Activity"
          value={`${overviewData.activeUsers || 0} Active Users`}
          valueColor="text-purple-500"
          changeInfo={`Last login: ${overviewData.lastUserLogin || "N/A"}`}
        />
      </div>
    </section>
  );
}

export default OverviewSection;
