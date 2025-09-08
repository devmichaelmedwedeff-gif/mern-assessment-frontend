import { Outlet } from "react-router-dom";

// Always allow access to public routes (e.g., login), regardless of auth state
const PublicRoute = () => {
  return <Outlet />;
};

export default PublicRoute;
