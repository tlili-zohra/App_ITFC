// PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("user"); // ou un contexte Auth
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
