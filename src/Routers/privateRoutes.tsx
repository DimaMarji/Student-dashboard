import { RouteObject } from "react-router-dom";
import Home from "../Pages/Home/homeContainer";

export const privateRoutes: RouteObject[]=[
    {
      path: "/",
      element: <Home />,
    },

  ]