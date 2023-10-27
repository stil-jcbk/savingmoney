import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/layout";
import "./App.css";
import Balance from "./pages/balance/balance";
import Home from "./pages/home/home";

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
        path: "/balance",
        element: <Balance />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
