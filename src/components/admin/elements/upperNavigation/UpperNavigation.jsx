import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UseAdmin from "@/hooks/UseAdmin";
import { MdDashboard, MdMenu, MdClose } from "react-icons/md";
import Dropdown from "@/components/dropdown/Dropdown";

const UpperNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const [isAdmin] = UseAdmin();
  const loading = useSelector((state) => state.auth.loading);
  const [isNavOpen, setIsNavOpen] = useState(false); // For responsive navigation
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white">
      <nav className="flex flex-col lg:flex-row justify-between items-center px-6 py-4 bg-opacity-10 backdrop-filter backdrop-blur-lg sticky top-0 z-10">
        {/* Logo section */}
        <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0">
          <div className="flex items-center space-x-2">
            <MdDashboard className="text-3xl" />
            <Link to="/" className="text-2xl font-semibold">Dashboard</Link>
          </div>

          {/* Hamburger icon for mobile */}
          <button
            className="text-3xl lg:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {/* Links and actions (responsive) */}
        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full lg:w-auto lg:flex lg:flex-col lg:items-center lg:space-y-4`}
        >
          {/* Search field on its own line */}
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 bg-white bg-opacity-20 text-white placeholder-white rounded-md outline-none"
            />
          </div>

          {/* User actions and Date-Time (third line in mobile) */}
          <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            {user && <Dropdown />}
            <div className="text-center text-sm">
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UpperNavigation;
