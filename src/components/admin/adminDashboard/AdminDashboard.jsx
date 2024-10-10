import React, { useState } from 'react';
import UpperNavigation from '../elements/upperNavigation/UpperNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import { FaDollarSign, FaUserFriends, FaNewspaper } from 'react-icons/fa';
import SmallBarChart from '../elements/upperNavigation/lineChart/SmallLineChart';
import { Pie } from 'react-chartjs-2';
import PieChartInteraction from '../elements/pieChart/PieChartInteraction';

const AdminDashboard = () => {
  const [error, setError] = useState(null);
  const axiosCommon = UseAxiosCommon();

  // Fetch paid users
  const { data: paid = [], error: paidError } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosCommon.get("/payments/payment");
      return res.data;
    },
  });

  // Fetch logged-in users
  const { data: loggedInUsers = [], error: loggedInError } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosCommon.get('users/get');
      return res.data;
    }
  });

  // Fetch subscription users
  const { data: subscription = [], error: subscriptionError } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosCommon.get("/newsletters");
      return res.data;
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  //fetch all teams
  const { data: teams = [], error: teamError } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await axiosCommon.get("/allTeams");
      return res.data;
    },
  });
  //get All mails tried to contact us

  const { data: contactUs = [], error: contactUsError } = useQuery({
    queryKey: ["contactUs"],
    queryFn: async () => {
      const res = await axiosCommon.get("/contacts/get");
      return res.data;
    },
  });
  //get all tasks created in our website
  const { data: tasks = [], error: tasksError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosCommon.get("/createTask");
      return res.data;
    },
  });
console.log(tasks);
console.log(contactUs);
console.log(teams);




  // Handle error states
  if (paidError || loggedInError || subscriptionError) {
    return <div>Error: {paidError?.message || loggedInError?.message || subscriptionError?.message}</div>;
  }

  // Prepare data for the chart
  const userGrowthData = {
    paidUsers: paid.length, // Count of paid users
    loggedInUsers: loggedInUsers.length, // Count of logged-in users
    subscriptionUsers: subscription.length, // Count of subscription users
  };
  const userInteractionData = {
    contactUs: contactUs.length,
    tasks: tasks.length,
    teams: teams.length
  };
  console.log(userInteractionData);
  

  return (
    <div className=" mx-auto lg:pb-5">
      <UpperNavigation />
      <div className="lg:my-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-1 text-center">
          {/* Paid User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardHeader className="flex items-center">
              <FaDollarSign className="mr-2 text-3xl" />
              <CardTitle>Paid Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Count: {userGrowthData.paidUsers}</p>
            </CardContent>
          </Card>

          {/* Login User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
            <CardHeader className="flex items-center">
              <FaUserFriends className="mr-2 text-3xl" />
              <CardTitle>Login Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Count: {userGrowthData.loggedInUsers}</p>
            </CardContent>
          </Card>

          {/* Subscription User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-400 to-pink-500 text-white">
            <CardHeader className="flex items-center">
              <FaNewspaper className="mr-2 text-3xl" />
              <CardTitle>Subscription Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Count: {userGrowthData.subscriptionUsers}</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="flex flex-col lg:flex-row my-5">
          <SmallBarChart data={userGrowthData} /> {/* Use the Bar chart */}
          <PieChartInteraction  data={userInteractionData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
