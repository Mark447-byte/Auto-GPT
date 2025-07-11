import React, { useState, useEffect, useMemo } from 'react';
import { sampleSalesData } from '../../data/sampleSalesData'; // Sample data
import {
  getSalesOverTime,
  getTopSellingProducts,
  getSalesByCategory,
  getDateRangeForLastNDays
} from '../../utils/salesAnalyticsUtils'; // Aggregation utilities

// Import chart components
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';

// Default Chart.js colors - can be customized
const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

const PERIOD_OPTIONS = [
  { label: 'Last 7 Days', value: 'last7Days' },
  { label: 'Last 30 Days', value: 'last30Days' },
  { label: 'Last 90 Days', value: 'last90Days' },
  // { label: 'This Month', value: 'thisMonth' }, // Requires more complex date logic for 'thisMonth'
  // { label: 'This Quarter', value: 'thisQuarter' },
  // { label: 'Year to Date', value: 'yearToDate' },
];

function SalesAnalyticsSection() {
  const [salesData, setSalesData] = useState(sampleSalesData); // Use the imported sample data
  const [selectedPeriod, setSelectedPeriod] = useState('last30Days'); // Default period

  // Date range derived from selectedPeriod
  const dateRange = useMemo(() => {
    switch (selectedPeriod) {
      case 'last7Days':
        return getDateRangeForLastNDays(7);
      case 'last30Days':
        return getDateRangeForLastNDays(30);
      case 'last90Days':
        return getDateRangeForLastNDays(90);
      default:
        return null; // Or handle other custom ranges if a date picker is added
    }
  }, [selectedPeriod]);

  // Memoized chart data to prevent re-computation on every render unless dependencies change
  const salesOverTimeData = useMemo(() => {
    const { labels, data } = getSalesOverTime(salesData, 'daily', dateRange);
    return {
      labels,
      datasets: [{
        label: 'Daily Sales (GHS)',
        data,
        fill: true,
        borderColor: CHART_COLORS.blue,
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
        tension: 0.1
      }]
    };
  }, [salesData, dateRange]);

  const topProductsData = useMemo(() => {
    const { labels, data } = getTopSellingProducts(salesData, 5, 'revenue', dateRange);
    return {
      labels,
      datasets: [{
        label: 'Revenue (GHS)',
        data,
        backgroundColor: [ // Array of colors for bars
          CHART_COLORS.green,
          CHART_COLORS.purple,
          CHART_COLORS.orange,
          CHART_COLORS.yellow,
          CHART_COLORS.red,
        ],
        borderColor: 'rgba(255,255,255,0.1)', // Optional: border color for bars
        borderWidth: 1
      }]
    };
  }, [salesData, dateRange]);

  const salesByCategoryData = useMemo(() => {
    const { labels, data } = getSalesByCategory(salesData, dateRange);
    return {
      labels,
      datasets: [{
        label: 'Sales by Category (GHS)',
        data,
        backgroundColor: [ // Cycle through colors for pie slices
          CHART_COLORS.blue,
          CHART_COLORS.green,
          CHART_COLORS.yellow,
          CHART_COLORS.purple,
          CHART_COLORS.orange,
          CHART_COLORS.red,
          CHART_COLORS.grey,
        ],
        hoverOffset: 4
      }]
    };
  }, [salesData, dateRange]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <section id="sales-analytics" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4 print:hidden">
        <h2 className="text-2xl font-semibold text-gray-700">Sales Analytics</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="analytics-period-select" className="text-sm font-medium text-gray-700">Period:</label>
          <select
            id="analytics-period-select"
            name="period"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="text-sm py-1.5 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {PERIOD_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales Over Time Line Chart */}
      <div className="mb-8 p-4 border rounded-lg shadow-sm bg-gray-50 print:border-none print:shadow-none">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Sales Trend</h3>
        <div className="relative h-72 md:h-96"> {/* Container with defined height */}
          <LineChart data={salesOverTimeData} options={{ plugins: { title: { text: `Daily Sales - ${PERIOD_OPTIONS.find(p=>p.value === selectedPeriod)?.label}` }} }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products Bar Chart */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50 print:border-none print:shadow-none">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Top 5 Selling Products (by Revenue)</h3>
          <div className="relative h-72 md:h-96">
            <BarChart data={topProductsData} options={{ plugins: { title: { text: `Top Products - ${PERIOD_OPTIONS.find(p=>p.value === selectedPeriod)?.label}` }, legend: { display: false } }, indexAxis: 'y' }} />
          </div>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50 print:border-none print:shadow-none">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Sales by Category</h3>
          <div className="relative h-72 md:h-96 flex justify-center items-center"> {/* Centering pie chart */}
             <div className="max-w-xs w-full h-full sm:max-w-sm md:max-w-md"> {/* Control pie chart size */}
                <PieChart data={salesByCategoryData} options={{ plugins: { title: { text: `Category Breakdown - ${PERIOD_OPTIONS.find(p=>p.value === selectedPeriod)?.label}` }} }} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SalesAnalyticsSection;
