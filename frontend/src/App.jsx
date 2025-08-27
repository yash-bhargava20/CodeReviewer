import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import GoogleCallback from "./components/GoogleCallback";

const App = () => {
  const { authUser } = useSelector((state) => state.auth);

  return (
    <>
      {authUser && <NavBar />}
      <div className="bg-base-300 min-h-screen w-full ">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
