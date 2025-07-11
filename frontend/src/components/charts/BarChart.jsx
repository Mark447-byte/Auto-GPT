import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data, options }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' } }
      },
      title: {
        display: true,
        text: 'Bar Chart Title (Update via options prop)',
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
                display: false,
            },
            ticks: { font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' } }
        },
        y: {
            grid: {
                color: 'rgba(200, 200, 200, 0.2)',
            },
            ticks: { font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' } },
            beginAtZero: true,
        }
    }
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return <Bar options={mergedOptions} data={data} />;
}

export default BarChart;
