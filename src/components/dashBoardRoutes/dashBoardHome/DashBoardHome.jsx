import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardChart from './dashBoardChart/DashBoardChart';

const DashBoardHome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (

    <div>
      <nav className=" p-4 absolute top-0 right-0 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Logo or branding */}


          {/* Right side: Avatar and Notification */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Notification Icon */}

            <FaBell className="h-6 w-6" />




            {/* Avatar with Dropdown */}
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
      </nav>
      {/* these are cards */}
      <div className="p-4 mt-14">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Task */}
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Total Task</h2>
            <p className="text-lg">50 Tasks</p>
          </div>

          {/* Complete Task */}
          <div className="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Complete Task</h2>
            <p className="text-lg">30 Tasks</p>
          </div>

          {/* Task In Progress */}
          <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Task In Progress</h2>
            <p className="text-lg">15 Tasks</p>
          </div>

          {/* Todo's Task */}
          <div className="bg-red-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Todo's Task</h2>
            <p className="text-lg">5 Tasks</p>
          </div>
        </div>
      </div>

      {/* chart */}
      <DashBoardChart />
    </div>
  );
};

export default DashBoardHome;