import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/layout";
import "./App.css";
import Balance from "./pages/balance/balance";
import Goals from "./pages/goals/goals";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import AuthRoute from "./components/authRoute/authRoute";

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: "/balance",
            element: <Balance />,
          },
          {
            path: "/goals",
            element: <Goals />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
