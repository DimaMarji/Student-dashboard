import { RouteObject } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import Error404Page from "../Pages/Error404/error404Container";
import Error500Page from "../Pages/Error500/error500Container";

export const publicRoutes: RouteObject[]=[
    {
      path: "login",
      element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
      },
      {path: "*", element: <Error404Page/>},
      {path: "500", element: <Error500Page/>},
  ]