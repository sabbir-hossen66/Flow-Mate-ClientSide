import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";


const TeamRequest = () => {
    // Fetch teams using react-query
    const user = useSelector((state) => state.auth.user);
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teams', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await UseAxiosCommon.get(`/create-team?email=${user?.email}`);
      return res.data;
    },
  });
    return (
        <div>
            
        </div>
    );
};

export default TeamRequest;