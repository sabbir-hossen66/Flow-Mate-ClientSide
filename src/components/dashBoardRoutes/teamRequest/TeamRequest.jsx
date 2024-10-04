import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TeamRequest = () => {
  // Fetch teams using react-query
  const user = useSelector((state) => state.auth.user);
  const [role, setRole] = useState(null);
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teams", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await UseAxiosCommon.get(`/create-team?email=${user?.email}`);
      return res.data;
    },
  });
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/create-team/role/team-admin?email=${
        user?.email
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setRole(data[0].role);
        }
      });
  }, [user?.email]);
  const userTeams =
    role === "team-admin"
      ? data
      : data.filter(
          (team) =>
            team?.members &&
            team.members.some((member) => member.email === user?.email)
        );
  return <div></div>;
};

export default TeamRequest;
