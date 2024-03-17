import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthRoute from "../Components/AuthRoute/authRoute";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

export const routes=createBrowserRouter([
    {
      path: "",
      element: <AuthRoute />,
      children:privateRoutes
    }, {
      path: "/",
      element: <Outlet />,
      children:publicRoutes
    },
  ])

 

const MainRouter: React.FC = () => {
    return <RouterProvider router={routes}/>;
};

export default MainRouter;