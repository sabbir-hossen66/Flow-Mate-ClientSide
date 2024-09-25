
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import DashBoard from "../layout/DashBoard";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signup/SignUp";
import AboutPage from "@/pages/aboutPage/AboutPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/slices/authSlice";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import DashBoardHome from "@/components/dashBoardRoutes/dashBoardHome/DashBoardHome";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      }
      , {
        path: '/about',

        element: <PrivateRoutes>
          <AboutPage />
        </PrivateRoutes>
      }
    ]
  },



  // here set dashboard
  {
    path: 'dashboard',
    element: <DashBoard />,
    children: [
      {

        index: true,
        element: <DashBoardHome />,


      },

    ]
  }, {
    path: "/login",
    element: <Login />

  }, {
    path: "/signUp",
    element: <SignUp />
  }

]);