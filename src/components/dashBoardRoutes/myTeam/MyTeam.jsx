import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Loader from "@/utlities/Loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyTeam = () => {
  const user = useSelector((state) => state.auth.user);
  const axiosCommon = UseAxiosCommon();
  const [role, setRole] = useState(null);

  // Fetch user teams using react-query
  const { data: teams = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teams', user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/teams`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosCommon.get(`/create-team/role/team-admin?email=${user?.email}`);
        const data = response.data;
        if (data && data[0]) {
          setRole(data[0].role);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if (user?.email) fetchRole();
  }, [user?.email, axiosCommon]);

  // Handle team deletion
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosCommon.delete(`/create-team/${id}`);
        Swal.fire("Deleted!", "Your team has been deleted.", "success");
        // Refetch teams after deletion
        refetch();
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      Swal.fire("Error!", "There was an error deleting the team.", "error");
    }
  };
  const handleEdit = id => {
    console.log(id)
  }
  // Show loader or error message
  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  // Only show edit/delete buttons if user role is "team-admin"
  const isAdmin = role === 'team-admin';

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-start">My Teams ({teams.length})</h2>
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <div key={team._id} className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link to={`/dashboard/team/${team?.teamName}`} className="text-blue-600 hover:underline">
                  Team Name: {team?.teamName}
                </Link>
              </h3>
              <p className="text-gray-700">Created by: {team.displayName}</p>
              <p className="text-gray-600 text-sm mb-4">Members: {team.teamMembers.length}</p>
              {isAdmin && (
                <div className="flex justify-start mt-4 space-x-4">
                  <button  onClick={() => handleEdit(team._id)} className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                    onClick={() => handleDelete(team._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No teams found for {user?.email}</p>
      )}
    </div>
  );
};

export default MyTeam;
