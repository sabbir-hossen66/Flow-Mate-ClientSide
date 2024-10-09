import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import { MdRoomPreferences } from "react-icons/md";

import { RiSecurePaymentLine } from "react-icons/ri";

import { useSelector } from "react-redux";
import { Feedback } from "@/components/feedback/Feedback";
import UseAdmin from "@/hooks/UseAdmin";

const DashBoardNav = () => {
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, isAdminLoading] = UseAdmin();
  console.log(isAdmin, isAdminLoading);
  console.log(isAdmin);

  const loading = useSelector((state) => state.auth.loading);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <p>Loading........</p>;
  return (
    <>
      {" "}
      <div
        className={`  bg-[#01204ed8] text-white w-[250px] h-screen fixed lg:static inset-y-0 left-0 transform lg:transform-none transition-transform duration-300 ease-in-out  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full "
        } p-4 shadow-lg z-50`}
      >
        {/* Sidebar content */}
        <div className="relative space-y-6">
          <button
            className="absolute right-0 top-0 text-xl lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IoMdClose />
          </button>
          <Link to={"/dashboard"} className="text-2xl font-semibold">
            Dashboard
          </Link>
          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/dashboard"
              className={
                "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              }
            >
              <FaHome />
              DashboardHome
            </NavLink>

            {user?.role === "user" ? (
              <NavLink
                to="/dashboard/booking"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                    : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
                }
              ></NavLink>
            ) : (
              ""
            )}

            {user?.role === "admin" || user?.role === "owner" ? (
              <NavLink
                to="/dashboard/add_room"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                    : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
                }
              >
                {/* add here in component */}
              </NavLink>
            ) : (
              ""
            )}

            <NavLink
              to="/dashboard/tasks"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                  : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              }
            >
              <RiSecurePaymentLine />
              Create tasks
            </NavLink>

            <NavLink
              to="/dashboard/my-team"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                  : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              }
            >
              <BsMicrosoftTeams />
              My Team
            </NavLink>
            <NavLink
              to="/dashboard/create-team"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                  : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              }
            >
              <RiSecurePaymentLine />
              Team Create
            </NavLink>


            



            {
              isAdmin ? (
                <NavLink

                  to="/dashboard/payment_history"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                        : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
                  }
                >
                  <RiSecurePaymentLine />
                  Payment History
                </NavLink>) : ""

            }



            <hr />

            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center gap-1 bg-blue-500 hover:bg-blue-500 rounded p-2"
                  : "flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              }
            >
              <FaHome />
              Home
            </NavLink>
          </nav>
        </div>
        <div className=" ">
          <Feedback className="" />
        </div>
      </div>
      {/* Mobile Menu Button */}
      <button
        className={`${
          isSidebarOpen ? "hidden" : ""
        } lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full focus:outline-none`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-5 h-5 fill-current dark:text-gray-800"
        >
          <rect width="352" height="32" x="80" y="96"></rect>
          <rect width="352" height="32" x="80" y="240"></rect>
          <rect width="352" height="32" x="80" y="384"></rect>
        </svg>
      </button>
    </>
  );
};

export default DashBoardNav;
