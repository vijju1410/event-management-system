import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // logged in but not admin
  if (role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
