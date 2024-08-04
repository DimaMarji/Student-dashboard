import {RouteObject} from "react-router-dom";
import {Login} from "../Pages/Login";
import Error404Page from "../Pages/Error404/error404Container";
import Error500Page from "../Pages/Error500/error500Container";
import Home from "../Pages/Home/homeContainer";

export const publicRoutes: RouteObject[] = [

    {
        path: "login",
        element: <Login/>,
    },
    {path: "*", element: <Error404Page/>},
    {path: "500", element: <Error500Page/>},
]