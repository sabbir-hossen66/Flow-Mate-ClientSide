import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";


const DashBoardPaidUser = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);

  const [error, setError] = useState(null);

  //newsletters,users/get,payments/payment
  const { data: paid = [] } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosCommon.get('/payments/payment')
      console.log(res);
      return res.data;

    }
  })
  console.log(paid);


  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div className="p-6">
        {user ? (
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-300 w-64">
            <div className="p-6 flex flex-col items-center space-y-4">
              <img
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                src={user?.photoURL}
                alt={''}
              />
              <div className="text-center">

                <p className="text-sm text-gray-100">Paid user: {paid.length}</p>
              </div>
            </div>
          </div>


        ) : (
          <div>Loading user data...</div>
        )}
      </div>
    </div>
  );
};

export default DashBoardPaidUser;