import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/login" }) => {
  const hasToken = !!localStorage.getItem("token");
  const authedFlag = localStorage.getItem("auth") === "true";
  const isAuthenticated = hasToken && authedFlag;
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
