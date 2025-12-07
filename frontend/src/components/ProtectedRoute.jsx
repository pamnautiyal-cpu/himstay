import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // backend se token save karoge
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
