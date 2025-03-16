import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DefaultLayout from "./DefaultLayout";
import NotFound from "./NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/Register',
                element: <Register/>,
            },
            {
                path: '/Login',
                element: <Login />,
            },
            {
                path: '/Admin',
                element: <Admin />,
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
],
    {
        basename: import.meta.env.VITE_BASE_PATH
    }
)

export function Router() {
    return <RouterProvider router={router} />;
}

