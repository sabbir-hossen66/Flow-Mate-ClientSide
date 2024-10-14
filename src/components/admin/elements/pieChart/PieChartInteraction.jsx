// AnotherChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartInteraction = ({ data }) => {
  // Prepare data for the pie chart
  console.log(data);
  
  const chartData = {
    labels: ['Contact Requests', 'Tasks Created', 'Teams'],
    datasets: [
      {
        label: 'Counts',
        data: [data.contactUs, data.tasks, data.teams],
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)', // Contact Requests
          'rgba(75, 192, 192, 0.6)', // Tasks Created
          'rgba(153, 102, 255, 0.6)', // Teams
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="h-[450px] w-[450px] mx-auto">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChartInteraction;
