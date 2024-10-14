import React from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components for the line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SmallLineChart = ({ data }) => {
  // Prepare data for the line chart
  const chartData = {
    labels: ['Paid Users', 'Logged In Users', 'Subscription Users'], // Updated labels
    datasets: [
      {
        label: 'User Count',
        data: [data.paidUsers, data.loggedInUsers, data.subscriptionUsers],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true, // Fill under the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className='w-auto h-[600px] px-3'> {/* Reduced width here */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SmallLineChart;
