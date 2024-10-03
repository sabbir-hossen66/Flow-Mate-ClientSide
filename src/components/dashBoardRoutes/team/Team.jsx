import CommonButton from "@/components/commonButton/CommonButton";
import { AddTeamMember } from "./AddTeamMember";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Loader from "@/utlities/Loader";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Team = () => {
  const [role, setRole] = useState(null);
  const axiosCommon = UseAxiosCommon();
  const team = useLoaderData();
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;
  const {
    data: teamMember = [],
    isLoading,
    isError,
    error,
    refetch,
    reset,
  } = useQuery({
    queryKey: ["teamMember"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `members?teamName=${team?.teamName}`
      );
      if (data && Array.isArray(data) && data.length > 0) {
        return data[0].members || [];
      }
      return [];
    },
  });
// Fetch the user role
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/create-team/role/team-admin?email=${email}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data[0]) {
        setRole(data[0].role); 
      }
    });
}, [email]);
const handleRemoveMember = id => {
    
}
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  
  const isAdmin = role === 'team-admin';
  return (
    <div className="w-full">
      <section className="container p-10 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-x-3">
          <div className="flex items-center">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Team {team?.teamName} members
            </h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {teamMember?.length} users
            </span>
          </div>
          <div className="py-5 lg:py-0">
            <AddTeamMember refetch={refetch} reset={reset} team={team} />
          </div>
        </div>

        {teamMember.length == 0 ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-4xl font-bold text-center ms-5 text-red-600">
              No Team Member You Have Added!
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className=" dark:bg-gray-800">
                        <tr>
                          <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-x-3">
                              <span>Name</span>
                            </div>
                          </th>

                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Role
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Email address
                          </th>

                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Active
                          </th>
                        {
                          isAdmin &&
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                        }
                          
                        </tr>
                      </thead>
                      <tbody className=" divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {teamMember?.map((member) => (
                          <tr key={member.id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <input
                                  type="checkbox"
                                  className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                />
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    src={
                                      member?.photo ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={member?.displayName}
                                  />
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      {member?.displayName}
                                    </h2>
                                    {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                  @{member.username}
                                </p> */}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {member?.role}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {member?.email}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                                  member.isActive
                                    ? "bg-emerald-100/60 dark:bg-gray-800"
                                    : "bg-red-100/60 dark:bg-gray-800"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    member.isActive
                                      ? "bg-emerald-500"
                                      : "bg-red-500"
                                  }`}
                                ></span>
                                <h2
                                  className={`text-sm font-normal ${
                                    member.isActive
                                      ? "text-emerald-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {member.isActive ? "Active" : "Inactive"}
                                </h2>
                              </div>
                            </td>
                            {
                              isAdmin &&
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                
                                <button onClick={() => handleRemoveMember(member?._id)} className="text-white p-2 rounded-md btn bg-red-500 hover:bg-red-600 duration-75">
                                  Remove
                                </button>
                                <select
                                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                  defaultValue="member"
                                >
                                  <option value="admin">Admin</option>
                                  <option value="member">Member</option>
                                </select>
                              </div>
                            </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {
              teamMember.length === 10 &&
              <div className="flex items-center justify-between mt-6">
              <CommonButton text="Previous" />
              <div className="items-center hidden lg:flex gap-x-3">
                {/* Pagination buttons */}
              </div>
              <CommonButton text="Next" />
            </div>
            }
          </>
        )}
      </section>
    </div>
  );
};

export default Team;
