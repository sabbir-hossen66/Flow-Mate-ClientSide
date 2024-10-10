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

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SmallBarChart = ({ data }) => {
  // Prepare data for the bar chart
  const chartData = {
    labels: ['Paid Users', 'Logged In Users', 'Subscription Users'], // Updated labels
    datasets: [
      {
        label: 'User Count',
        data: [data.paidUsers, data.loggedInUsers, data.subscriptionUsers],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
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
    <div className='lg:w-auto h-[450px] px-3'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SmallBarChart;
