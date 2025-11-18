import {  useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import {  GithubIcon, HomeIcon, LinkedinIcon, Mail, SunMoon, UserRound } from 'lucide-react';
import StyledIcon from './components/styleIcon';
import './style/theme.css';
import './style/app.css';
import home_image from './assets/home.jpg';
import Login from './screens/login';
import { authService } from './services/auth.service';
import Dashboard from './screens/dashbord';
import ProjectForm from './screens/projectForm';
import { LanguageSwitcher } from './components/lngSwitcher';
import { useTranslation } from 'react-i18next';
import ProtectedRoute from './components/protectedRoute';
import { authHook } from './utils/authHook';
import { analiticsService } from './services/analitics.service';
import SplitTextAnimation from './components/blenderAnimation';
import FadeUpAnimation from './components/faceUpAnimation';
import ThemeToggle from './components/toggleThemeButton';
import GlobalLoading from './components/GlobaloLoading';

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
   <BrowserRouter>
    <nav>
        <div className="header">
          <div className="header_left">
            <LanguageSwitcher></LanguageSwitcher>
            <Link to={isLog?"/dashboard#dashboard":"/"}><StyledIcon icon={HomeIcon} /></Link>
            <ThemeToggle></ThemeToggle>
            <Link to={profileData.github} target='_blank'><StyledIcon icon={GithubIcon}  /></Link>
            <Link to={profileData.linkedin} target='_blank'><StyledIcon icon={LinkedinIcon}  /></Link>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}`} target='_blank' rel='noopener noreferrer' ><StyledIcon icon={Mail}   /></a>

          </div>
          <div className="header_right">
            <Link to="/login#form" onClick={delt}><StyledIcon icon={UserRound} /></Link>
          </div>
        </div>
        <div className="nav_body">
          <div className="nav_text">
            <SplitTextAnimation text={t('nav.welcome')}/>
            <FadeUpAnimation text={t('nav.bio')}/>
          </div>
          <img src={home_image} alt={t('nav.altHomeImage')}  />
        </div>
    </nav>
    
      <div>
        <GlobalLoading/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute islog={isLog}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Home />} />
        <Route path="/projectForm" element={
          <ProtectedRoute islog={isLog}>
            <ProjectForm />
          </ProtectedRoute>
        } />
        </Routes>
      </div>
   </BrowserRouter>
   </>
  );
}



export default App;
