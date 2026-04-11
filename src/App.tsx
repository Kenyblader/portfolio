import {  useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import './style/theme.css';
import './style/app.css';
import Login from './screens/login';
import { authService } from './services/auth.service';
import Dashboard from './screens/dashbord';
import ProjectForm from './screens/projectForm';
import { useTranslation } from 'react-i18next';
import ProtectedRoute from './components/protectedRoute';
import { authHook } from './utils/hooks/authHook';
import { analiticsService } from './services/analitics.service';
import GlobalLoading from './components/GlobaloLoading';
import EditProject from './screens/editPorject';

function App() {

  const [profileData, setProfileData] = useState({email:'',github:'',linkedin:''});
  const [isLog,setLog] = useState(authHook.isLoggedIn());
  const {t}=useTranslation();
  analiticsService.trackVisit();
  
  


  useEffect(() => {

    async function fetchData() {
      try {
        const profileData = await authService.getProfileData();
        console.log('Profile data:', profileData);
        setProfileData(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    function suscreibe(){
        authHook.suscribeState((islog)=>{
            console.log("est authetihie?:",islog);
            setLog(islog);
        })
    }
    suscreibe();
    fetchData();
  }, []);



  const delt = () => {
    if (isLog) {
      authService.logout();
    }
  };

  

  return (
   <>
 
      <div>
        <GlobalLoading/>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN */}
          <Route path="/dashboard" element={
            <ProtectedRoute islog={isLog}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/projects/new" element={
            <ProtectedRoute islog={isLog}>
              <ProjectForm />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/projects/edit/:id" element={
            <ProtectedRoute islog={isLog}>
              <EditProject />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>

      </div>
   
   </>
  );
}



export default App;
