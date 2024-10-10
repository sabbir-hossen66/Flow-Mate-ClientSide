import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashBoardSubscriptionUser = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  // Fetching subscription user data
  const { data: subscription = [], isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosCommon.get("/newsletters");
      return res.data;
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
                <strong>Subscription Users:</strong> {subscription.length}
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

export default DashBoardSubscriptionUser;
