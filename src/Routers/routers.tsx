import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthRoute from "../Components/AuthRoute/authRoute";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import {ErrorBoundary} from "react-error-boundary";
import Error500Page from "../Pages/Error500/error500Container";

export const routes=createBrowserRouter([
    {
      path: "",
      element: <ErrorBoundary
          fallback={<Error500Page />}><AuthRoute /></ErrorBoundary>,
      children:privateRoutes
    }, {
      path: "/",
      element:  <ErrorBoundary
          fallback={<Error500Page />}><Outlet /></ErrorBoundary>,
      children:publicRoutes
    },
  ])

 

const MainRouter: React.FC = () => {
    return <RouterProvider router={routes}/>;
};

export default MainRouter;