import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import Transaction from "../components/Transaction";
import EditTransaction from "../components/EditTransaction";
const router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateTransaction/:id" element={<EditTransaction />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="*" element={"page not found."} />
      </Routes>
    </>
  );
};

export default router;
