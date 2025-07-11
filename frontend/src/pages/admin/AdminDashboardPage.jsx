import React, { useState, useEffect } from 'react';
import OverviewSection from '../../components/admin/OverviewSection';
import QuickAccessSection from '../../components/admin/QuickAccessSection';
import StaffManagementSection from '../../components/admin/StaffManagementSection';
import AppSettingsSection from '../../components/admin/AppSettingsSection';
import SystemLogsSection from '../../components/admin/SystemLogsSection';
import SalesAnalyticsSection from '../../components/admin/SalesAnalyticsSection'; // Import the new section


function AdminDashboardPage() {
  const [overviewData, setOverviewData] = useState(null); // Initialize as null or default structure

  useEffect(() => {
    // Simulate fetching data
    const sampleOverview = {
        totalRevenue: "GHS 125,670.50",
        totalRevenueChange: "+5% from last month",
        activeProjects: "12",
        activeProjectsInfo: "2 needing attention",
        lowStockItems: "5", // Will be combined with " Items Low" in component
        totalStockItems: "340",
        activeUsers: "8", // Will be combined with " Active Users"
        lastUserLogin: "5 mins ago"
    };
    setOverviewData(sampleOverview);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </header>
      <p className="text-gray-600 mb-8 print:hidden">Welcome, Admin! This is your main control panel (React Version).</p>

      <OverviewSection overviewData={overviewData} />
      <QuickAccessSection />
      {/* Sales Analytics Section - Placed before Staff Management for prominence */}
      <div id="sales-analytics"><SalesAnalyticsSection /></div>
      <StaffManagementSection />
      <AppSettingsSection />
      <SystemLogsSection />

      <footer className="text-center text-sm text-gray-500 mt-10">
        <p>&copy; {new Date().getFullYear()} BatiStock. All rights reserved.</p>
      </footer>
    </>
  );
}

export default AdminDashboardPage;
