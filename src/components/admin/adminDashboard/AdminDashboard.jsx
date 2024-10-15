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
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-3 text-center">
          <Card className="transition-transform transform hover:scale-105 bg-gradient-to-r from-white to-gray-200 text-slate-900">
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
          <Card className="transition-transform transform hover:scale-105 bg-gradient-to-l from-white to-gray-200 text-slate-900 shadow-xl">
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
          <Card className="transition-transform transform hover:scale-105 bg-gradient-to-r from-white to-gray-200 text-slate-900">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-3 text-center my-7">
          <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            {/* Background Image */}
            <div
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
              style={{
                backgroundImage:
                  "url(https://sloanreview.mit.edu/wp-content/uploads/2022/06/2022_0623_Mashek_Collaboration-1290x860-1.jpg)",
              }}
            ></div>

            {/* Card displaying total teams */}
            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                Total Teams
              </h3>

              <div className="flex items-center justify-between px-3 py-2 bg-gray-400">
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  Count: {teams.length}
                </span>
                <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                  Manage Teams
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            {/* Background Image */}
            <div
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
              style={{
                backgroundImage:
                  "url(https://as2.ftcdn.net/v2/jpg/02/52/84/63/1000_F_252846381_D9YUbBxzLQ3hKvuNlfEQCgI8ddf0ArrD.jpg)",
              }}
            ></div>

            {/* Card displaying total teams */}
            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                All Team Tasks
              </h3>

              <div className="flex items-center justify-between px-3 py-2 bg-gray-400">
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  Count: {tasks.length}
                </span>
                <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                  Manage Tasks
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            {/* Background Image */}
            <div
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
              style={{
                backgroundImage:
                  "url(https://thumbs.dreamstime.com/b/contact-us-call-mail-icons-contact-us-call-mail-icons-white-background-vector-illustration-117513360.jpg)",
              }}
            ></div>

            {/* Card displaying total teams */}
            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                All Contact Mails
              </h3>

              <div className="flex items-center justify-between px-3 py-2 bg-gray-400">
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  Count: {contactUs.length}
                </span>
                <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                  See Mails
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 my-4">
          <SmallBarChart data={userGrowthData} /> {/* Use the Bar chart */}
          <PieChartInteraction data={userInteractionData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
