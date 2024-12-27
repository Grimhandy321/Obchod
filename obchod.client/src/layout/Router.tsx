import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import ProtectedRoutes from "../core/ProtectedRoutes";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route element={<ProtectedRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={
                <div>
                    <header>
                        <h1>Not Found</h1>
                    </header>
                    <p>
                        <a href="/">Back to Home</a>
                    </p>
                </div>
            } />
        </Route>
    )
);


export function Router() {
    return <RouterProvider router={router} />;
}