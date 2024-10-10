import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UseAdmin from "@/hooks/UseAdmin";
import "../upperNavigation/UpperNavivation.css"; 
import { MdDashboard } from "react-icons/md";
import Dropdown from "@/components/dropdown/Dropdown";

const UpperNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const [isAdmin] = UseAdmin();
  const loading = useSelector((state) => state.auth.loading);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format the current date and time
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white">
      {/* Sticky Nav */}
      <nav className="sticky-nav">
        {/* Dashboard Icon */}
        <div className="flex items-center">
        <span className="dashboard-icon text-2xl">
          <MdDashboard />
          

            </span> 
        
          <Link to="/" className="logo ">
         
            Dashboard
          </Link>
        </div>

        {/* Search Box */}
        <div className="search-container">
          <input type="text" placeholder="Search..." />
        </div>

        {/* Admin Name and Date-Time */}
        <div className="user-actions flex items-center space-x-6">
         <Dropdown/>
          <div className="date-time flex justify-between items-end gap-2">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile (if necessary) */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {/* Close button icon */}
        </button>
        <nav className="flex flex-col space-y-2">
          {isAdmin ? (
            <Link to="/dashboard/admin">

            </Link>
          ) : (
            <Link to="/dashboard">
                
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default UpperNavigation;
