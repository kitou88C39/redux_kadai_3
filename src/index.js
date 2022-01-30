import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { AuthProvider } from "./auth/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
