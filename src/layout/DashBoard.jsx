import DashBoardNav from "@/components/dashBoardShared/dashBoardNav/DashBoardNav";
import { Outlet } from "react-router-dom";


const DashBoard = () => {
  return (
    <div className="min-h-screen flex lg:flex-row flex-col bg-gray-100">
      <DashBoardNav />
      <Outlet />
    </div>
  );
};

export default DashBoard;