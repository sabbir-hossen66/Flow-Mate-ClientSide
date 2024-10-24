import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';  // Ensures chart.js elements are loaded
import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import { useSelector } from 'react-redux';

const UserContributionSummary = () => {
  // Get user email from Redux state
  const userEmail = useSelector((state) => state.auth.user?.email);
  const [contributions, setContributions] = useState(null);
  const axiosCommon = UseAxiosCommon();

  useEffect(() => {
    const fetchContributions = async () => {
      if (!userEmail) return; // Prevent API call if userEmail is not available
      try {
        const response = await axiosCommon.get(`/users/file-count/${userEmail}`);
        setContributions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };

    fetchContributions();
  }, [userEmail, axiosCommon]);

  // Display a loading message while data is being fetched
  if (!contributions) {
    return <div>Loading...</div>;
  }

  // Prepare data for the charts
  const data = {
    labels: ['Tasks Completed', 'Files Uploaded', 'Comments Made'],
    datasets: [{
      data: [
        contributions.tasksCompleted || 0, // Default to 0 if undefined
        contributions.fileCount || 0,   // Default to 0 if undefined
        contributions.commentsMade || 0 // Default to 0 if undefined
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">User Contribution Summary</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
          <Pie data={data} options={options} />
        </div>

        {/* Bar Chart */}
        <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserContributionSummary;
