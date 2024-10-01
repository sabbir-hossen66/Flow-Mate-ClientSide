import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import DashBoard from "../layout/DashBoard";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signup/SignUp";
import AboutPage from "@/pages/aboutPage/AboutPage";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import DashBoardHome from "@/components/dashBoardRoutes/dashBoardHome/DashBoardHome";
import Team from "@/components/dashBoardRoutes/team/Team";
import Tasks from "@/components/dashBoardRoutes/tasks/Tasks";
import TaskDetails from "@/components/dashBoardRoutes/tasks/TaskDetails";
import PaymentHistory from "@/components/dashBoardRoutes/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <PrivateRoutes>
            <AboutPage />
          </PrivateRoutes>
        ),
      },
    ],
  },

  // here set dashboard
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        index: true,
        element: <DashBoardHome />,
      },
      {
        path: "team",
        element: <Team />,
      },

      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "tasks/taskDetails",
        element: <TaskDetails />,
      },
      {
        path: "payment_history",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);
