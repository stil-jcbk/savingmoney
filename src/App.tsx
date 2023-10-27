import React from "react";
import logo from "./logo.svg";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/layout";
import "./App.css";
import Balance from "./pages/balance/balance";
import Home from "./pages/home/home";

export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/balance" element={<Balance />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
