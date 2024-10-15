import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";


const Board = () => {
  const axiosCommon = UseAxiosCommon();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  const { data: teammember = [], isLoading, isError } = useQuery({

    queryKey: ["teammember"],
    queryFn: async () => {
      const res = await axiosCommon.get('/createTask');
      return res.data;
    },
    onError: (err) => setError(err.message),
  });

  // Loading state while fetching user data
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  // Error state handling

  if (isError) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>hello board</h2>
      <p className="text-sm text-gray-500">
        {teammember.length}
      </p>
    </div>
  );
};

export default Board;