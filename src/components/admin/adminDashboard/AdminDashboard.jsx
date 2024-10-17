import UpperNavigation from "../elements/upperNavigation/UpperNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { FaDollarSign, FaUserFriends, FaNewspaper } from "react-icons/fa";
import SmallBarChart from "../elements/upperNavigation/lineChart/SmallLineChart";
import PieChartInteraction from "../elements/pieChart/PieChartInteraction";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

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
      const res = await axiosCommon.get("users/get");
      return res.data;
    },
  });

  // Fetch subscription users
  const { data: subscription = [], error: subscriptionError } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosCommon.get("/newsletters");
      return res.data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //fetch all teams
  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await axiosCommon.get("/allTeams");
      return res.data;
    },
  });

  const { data: contactUs = [] } = useQuery({
    queryKey: ["contactUs"],
    queryFn: async () => {
      const res = await axiosCommon.get("/contacts/get");
      return res.data;
    },
  });
  //get all tasks created in our website
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosCommon.get("/createTask");
      return res.data;
    },
  });

  // Handle error states
  if (paidError || loggedInError || subscriptionError) {
    return (
      <div>
        Error:{" "}
        {paidError?.message ||
          loggedInError?.message ||
          subscriptionError?.message}
      </div>
    );
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
    teams: teams.length,
  };
  console.log(userInteractionData);

  return (
    <div className=" mx-auto lg:pb-5 ">
      <UpperNavigation />
      <div className="lg:my-8">
        <h1 className="text-3xl font-semibold text-center py-2">
          Admin Dashboard
        </h1>
        <p className="text-center text-lg text-gray-500">
          Hello {user.displayName}, Welcome to the admin dashboard
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-3 text-center mx-10 my-10">
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900">
            <CardHeader className="flex items-center">
              <FaDollarSign className="mr-2 text-3xl" />
              <CardTitle>Paid Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Count: {userGrowthData.paidUsers}
              </p>
            </CardContent>
          </Card>

          {/* Login User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900 shadow-xl">
            <CardHeader className="flex items-center">
              <FaUserFriends className="mr-2 text-3xl" />
              <CardTitle>Login Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Count: {userGrowthData.loggedInUsers}
              </p>
            </CardContent>
          </Card>

          {/* Subscription User Section */}
          <Card className="transition-transform transform hover:scale-105 bg-white text-slate-900">
            <CardHeader className="flex items-center">
              <FaNewspaper className="mr-2 text-3xl" />
              <CardTitle>Subscription Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Count: {userGrowthData.subscriptionUsers}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10 mx-10">
  {/* Card 1: Total Teams */}
  <div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Teams</h3>
    <span className="text-2xl font-bold text-gray-800 mb-2">Count: {teams.length}</span>
    <button className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-500">
      Manage Teams
    </button>
  </div>

  {/* Card 2: All Team Tasks */}
  <div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">All Team Tasks</h3>
    <span className="text-2xl font-bold text-gray-800 mb-2">Count: {tasks.length}</span>
    <button className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-500">
      Manage Tasks
    </button>
  </div>

  {/* Card 3: All Contact Mails */}
  <div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">All Contact Mails</h3>
    <span className="text-2xl font-bold text-gray-800 mb-2">Count: {contactUs.length}</span>
    <button className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-500">
      See Mails
    </button>
  </div>
</div>


        {/* Chart Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 my-10 mx-10">
          <SmallBarChart data={userGrowthData} /> {/* Use the Bar chart */}
          <PieChartInteraction data={userInteractionData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
