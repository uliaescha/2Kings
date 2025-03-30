import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestOnlyRoutes = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" replace />;
};

export default GuestOnlyRoutes;
