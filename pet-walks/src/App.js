import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import Wrapper from "./components/auth/Wrapper";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Wrapper />} />
          <Route path="/LogIn" element={<SignIn />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
