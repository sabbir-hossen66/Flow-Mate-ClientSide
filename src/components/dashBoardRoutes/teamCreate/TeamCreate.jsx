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
  const displayName = user?.displayName;
  const email = user?.email;
  const uid = user?.uid;
  const role = "team-admin";
  const { data = [] } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const res = await UseAxiosCommon.get(`/users?email=${email}`)
      return res.data 
    }
  })
  console.log(data)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      teamName,
      teamDescription,
      email,
      role,
      displayName,
      uid,
    };

    // API call to create the team
    fetch(`${import.meta.env.VITE_API_URL}/create-team`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Team Created Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Reset form fields
          setTeamName("");
          setTeamDescription("");
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to create team",
          text: error.message,
          showConfirmButton: true,
        });
      });
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
