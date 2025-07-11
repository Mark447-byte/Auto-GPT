import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // For area fills if needed
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({ data, options }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height/width via container
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' } }
      },
      title: {
        display: true,
        text: 'Chart Title (Update via options prop)',
        font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', size: 16 }
      },
      tooltip: {
        bodyFont: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' },
        titleFont: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }
      }
    },
    scales: {
        x: {
            grid: {
                display: false, // Hides x-axis grid lines
            },
            ticks: { font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' } }
        },
        y: {
            grid: {
                color: 'rgba(200, 200, 200, 0.2)', // Lighter grid lines
            },
            ticks: { font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' } },
            beginAtZero: true,
        }
    }
  };

  const mergedOptions = { ...defaultOptions, ...options }; // User options override defaults

  return <Line options={mergedOptions} data={data} />;
}

export default LineChart;
