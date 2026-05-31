import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthHook from "../utils/hooks/authHook";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute=({children}:ProtectedRouteProps)=>{

    const location= useLocation();
    const authHook= useAuthHook();

    if (!authHook.isLoaded) return (
      <div className="auth_loading">
        <span className="auth_spinner" />
      </div>
    );


    if (authHook.isLoggedIn())
        return children;
    else
        return <Navigate to="/login" replace />;

}

export default ProtectedRoute
