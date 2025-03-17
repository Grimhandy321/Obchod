import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";


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

