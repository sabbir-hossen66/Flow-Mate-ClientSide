import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const MyTeam = () => {
  const user = useSelector((state) => state.auth.user);
  const [role, setRole] = useState(null);

  // Fetch teams using react-query
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teams', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/create-team?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch the user role
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/create-team/role/team-admin?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setRole(data[0].role); 
        }
      });
  }, [user?.email]);

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
        await axios.delete(`${import.meta.env.VITE_API_URL}/create-team/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your team has been deleted.",
          icon: "success",
        });

        refetch();
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the team.",
        icon: "error",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Only show edit/delete buttons if user role is "team-admin"
  const isAdmin = role === 'team-admin';

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Teams</h2>
      {data.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Display Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Team Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">UID</th>
              {isAdmin && <th className="border border-gray-300 px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((team) => (
              <tr key={team._id}>
                <td className="border border-gray-300 px-4 py-2">{team.displayName}</td>
                <td className="border border-gray-300 px-4 py-2">{team.email}</td>
                <td className="border border-gray-300 px-4 py-2">{team.teamName}</td>
                <td className="border border-gray-300 px-4 py-2">{team.teamDescription}</td>
                <td className="border border-gray-300 px-4 py-2">{team.uid}</td>
                {isAdmin && (
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <button className="btn bg-green-500 text-white p-2 rounded-lg" /*onClick={() => handleEdit(team._id)}*/>
                      Edit
                    </button>
                    <button className="btn bg-red-500 text-white p-2 rounded-lg" onClick={() => handleDelete(team._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teams found for {user?.email}</p>
      )}
    </div>
  );
};

export default MyTeam;
