import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("auth-token");
    return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
