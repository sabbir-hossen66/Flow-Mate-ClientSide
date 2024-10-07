import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DashBoardChart from "./dashBoardChart/DashBoardChart";
import CommonButton from "@/components/commonButton/CommonButton";
import ProjectCreate from "@/components/projectCreate/ProjectCreate";
import DashBoardCards from "../dashBoardCards/DashBoardCards";

const DashBoardHome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [toggleOpen, setToggleOpen] = useState(false);
  // for create task
  const toggleHandler = () => {
    setToggleOpen(!toggleOpen);
  };

  return (
    <div>

      <div className="">
        <nav className="absolute top-0 right-0 h-16">
          <div className="p-4">
            <div className="flex justify-between gap-5 items-center">

              <div className="flex items-center justify-between space-x-4 lg:space-x-9 ml-auto">

                <div className="relative" onClick={toggleHandler}>
                  <CommonButton text="Create"></CommonButton>
                </div>


                {toggleOpen && <ProjectCreate />}

                <FaBell className="h-6 w-6" />


                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      className="h-10 w-10 rounded-full border-2 border-white"
                      src={user?.photoURL}
                      alt="Avatar"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                      <a
                        href="#profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href="#logout"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Cards */}
      <div className="lg:ml-16 mt-20">
        <DashBoardCards />
      </div>

      {/* Chart */}
      {/* <DashBoardChart /> */}
    </div>
  );
};

export default DashBoardHome;
