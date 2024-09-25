
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
import UserProfile from "@/components/profile/UserProfile";



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
      },
      // {
      //   path:'/payment',
      //   element:<PrivateRoutes>
      //     <Payment/>
      //   </PrivateRoutes>
      // }
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



      },{
          path:'profilePage',
          element:<UserProfile/>

      }

    ]
  }, {
    path: "/login",
    element: <Login />

  }, {
    path: "/signUp",
    element: <SignUp />
  }

]);