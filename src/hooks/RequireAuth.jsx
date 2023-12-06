import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isValidUser = localStorage.getItem("isLogged");

  if (isValidUser === "false") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
