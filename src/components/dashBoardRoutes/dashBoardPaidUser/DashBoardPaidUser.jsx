import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashBoardPaidUser = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  // Fetching paid user data
  const { data: paid = [] } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosCommon.get("/payments/payment");
      return res.data;
    },
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="p-6">
        {user ? (
          <Card className="shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full border-2 border-gray-200"
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                />
                <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                <strong>Paid Users:</strong> {paid.length}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div>Loading user data...</div>
        )}
      </div>
    </div>
  );
};

export default DashBoardPaidUser;
