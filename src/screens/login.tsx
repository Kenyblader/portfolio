
import '../style/login.css';
import { SignIn } from '@clerk/react';
import useAuthHook from '../utils/hooks/authHook';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const { isLoaded, isLoggedIn } = useAuthHook();

    if (!isLoaded) return <div>Loading...</div>;
    if (isLoggedIn()) return <Navigate to="/dashboard" replace />;


    return <div className="login_container">
      <SignIn
        routing="path"
        path="/login"
        fallbackRedirectUrl="/dashboard"
        withSignUp={true}
      />
    </div>;
}
export default Login;