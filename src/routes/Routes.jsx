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
import TeamCreate from "@/components/dashBoardRoutes/teamCreate/teamCreate";
import MyTeam from "@/components/dashBoardRoutes/myTeam/MyTeam";

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

  // Dashboard routes
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        index: true,
        element: <DashBoardHome />,
      },
      {
        path: "team/:teamName",
        element: <Team />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/team/${params.teamName}`),
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
      {
        path: "create-team",
        element: <TeamCreate />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
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
