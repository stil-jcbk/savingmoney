import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/layout";
import "./App.css";
import Balance from "./pages/balance/balance";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index></Route>
            <Route path="balance" element={<Balance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
