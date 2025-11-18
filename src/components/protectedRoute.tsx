import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  islog:boolean
}

const ProtectedRoute=({children,islog}:ProtectedRouteProps)=>{

    const location= useLocation();

   

    if (islog)
        return children;
    else
        return <Navigate to="/login#form" state={{from:location}} replace />

}

export default ProtectedRoute
