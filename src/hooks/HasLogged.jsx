/** @format */

import { Navigate } from "react-router-dom";

const HasLogged = ({ children }) => {
  const isUserLogged = localStorage.getItem("isLogged");
  if (isUserLogged === "true") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default HasLogged;
