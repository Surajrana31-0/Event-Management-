import { Navigate, Outlet } from "react-router-dom";

// Optionally, you can add a function to check token expiry here in the future
// Example:
// function isTokenExpired(token) {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// }

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  // Optionally, check for token expiry here
  // if (!token || isTokenExpired(token)) return <Navigate to="/login" replace />;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute; 