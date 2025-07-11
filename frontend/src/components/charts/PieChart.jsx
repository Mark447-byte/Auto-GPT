import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title, // If you want a title within the pie chart options
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function PieChart({ data, options }) {
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
        text: 'Pie Chart Title (Update via options prop)',
        font: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', size: 16 }
      },
      tooltip: {
        bodyFont: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' },
        titleFont: { family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' },
        callbacks: {
            label: function(context) {
                let label = context.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed !== null) {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => parseFloat(b) + parseFloat(a), 0);
                    const value = parseFloat(context.raw);
                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
                    label += `${context.dataset.label || ''}: ${value.toFixed(2)} (${percentage})`;
                }
                return label;
            }
        }
      }
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return <Pie data={data} options={mergedOptions} />;
}

export default PieChart;
