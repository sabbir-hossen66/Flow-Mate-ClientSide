import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TeamRequest = () => {
  const user = useSelector((state) => state.auth.user);
  const [role, setRole] = useState(null);

  // Fetch teams using react-query
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teams', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/create-team?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch the user role
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/create-team/role/team-admin?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0]) {
            setRole(data[0].role);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user role:", error);
        });
    }
  }, [user?.email]);

  // Accept Team Request Handler
  const handleAcceptRequest = async (teamId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/team-requests/accept`, {
        teamId,
        userEmail: user?.email,
      });

      if (res.status === 200) {
        refetch();
        alert("Team request accepted!");
      }
    } catch (error) {
      console.error("Failed to accept team request:", error);
      alert("Failed to accept team request. Please try again.");
    }
  };

  // Filter team requests based on role
  const teamRequest = role === 'team-admin' 
    ? data 
    : data.filter((team) =>
        team?.members && team.members.some((member) => member.email === user?.email && member.status === 'pending')
      );

  if (isLoading) return <p>Loading team requests...</p>;
  if (error) return <p>Error loading team requests: {error.message}</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-semibold mb-4">Team Requests</h2>
      {teamRequest.length === 0 ? (
        <p className="text-gray-600">No team requests at the moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-gray-700 font-medium">Team Name</th>
                <th className="py-2 px-4 text-left text-gray-700 font-medium">Status</th>
                <th className="py-2 px-4 text-left text-gray-700 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {teamRequest.map((request) => (
                <tr key={request._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4">{request.teamName}</td>
                  <td className="py-2 px-4">{request.status}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleAcceptRequest(request._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                      disabled={request.status === 'accepted'}
                    >
                      {request.status === 'accepted' ? "Accepted" : "Accept"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamRequest;
