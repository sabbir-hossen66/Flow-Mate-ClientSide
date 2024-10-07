import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const TeamCreate = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;
  const axiosCommon = UseAxiosCommon();

  // Fetch user data
  const { data = {} } = useQuery({
    queryKey: ['data', email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${email}`);
      return res.data[0];
    },
    enabled: !!email,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      teamName,
      teamDescription,
      email,
      displayName: data.name,
      role: data.role,
      uid: user.uid,
      teamCreate: Date.now()
    };

    try {
      // Create the team
      const teamResponse = await fetch(`${import.meta.env.VITE_API_URL}/create-team`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const teamData = await teamResponse.json();

      // If the team is created successfully, update the user role
      if (teamData) {
        const roleUpdateResponse = await axiosCommon.patch(`/users?email=${email}`, {
          role: 'team-admin',
        });

        if (roleUpdateResponse.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Team Created Success!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Reset form fields
          setTeamName("");
          setTeamDescription("");
        } else {
          throw new Error("Failed to update user role");
        }
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to create team or update role",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br w-full">
      <div className="card w-full max-w-lg shadow-2xl bg-white rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Team
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Fill in the details to create a new team for your project.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-[16px] font-semibold text-gray-700">Team Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter team name"
              className="input w-full border-2 rounded-lg px-4 py-3 text-black placeholder-white focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-[16px] font-semibold text-gray-700">Team Description</span>
            </label>
            <textarea
              placeholder="Describe your team"
              className="textarea w-full border-2 rounded-lg px-4 py-3 text-black placeholder-white focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamCreate;
