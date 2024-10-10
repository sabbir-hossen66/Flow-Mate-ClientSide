import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashBoardPaidUser = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);

  // Fetching paid user data
  const { data: paid = [], isLoading, isError } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosCommon.get("/payments/payment");
      return res.data;
    },
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading paid user data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching paid user data.</div>;
  }

  return (
    <div className="p-6">
      {user ? (
        <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-300 w-64">
          <div className="p-6 flex flex-col items-center space-y-4">
            <img
              className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              src={user?.photoURL}
              alt={user?.name || 'User Avatar'}
            />
            <div className="text-center">
              <p className="text-sm text-gray-100">Paid Users: {paid.length}</p>

              <Card className="shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-16 h-16 rounded-full border-2 border-gray-200"
                      src={user?.avatar || user?.photoURL} // Fallback for user avatar
                      alt={`${user?.name}'s avatar`}
                    />
                    <CardTitle className="text-lg font-semibold">{user?.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    <strong>Total Paid Users:</strong> {paid.length}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>No user logged in.</div>
      )}
    </div>
  );
};

export default DashBoardPaidUser;
