import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function Guard({ children }) {
  return useAuth().auth ? children : <Navigate to="/login" replace />;
}
