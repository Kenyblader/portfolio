import {  useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import {  GithubIcon, Globe, LinkedinIcon, Mail, SunMoon, UserRound } from 'lucide-react';
import StyledIcon from './components/styleIcon';
import './style/theme.css';
import './style/app.css';
import home_image from './assets/home.jpg';
import StyledIconText from './components/StyledIconText';
import Login from './screens/login';
import { authService } from './services/auth.service';
import Dashboard from './screens/dashbord';

function App() {

  const [profileData, setProfileData] = useState({email:'',github:'',linkedin:''});

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

    fetchData();

  }, []);

  const text=`Je suis Sineu Nouleughe Reins Keny, étudiant en Bachelor 3 Génie Logiciel à Keyce Informatique. Passionné par le développement web et mobile, je conçois des applications modernes et performantes avec Angular, TypeScript, Symfony et Firebase. Curieux et rigoureux, j’aime allier technologie, design et architecture logicielle pour créer des solutions utiles et durables. Mon ambition : devenir architecte logiciel et contribuer à des projets innovants à fort impact.`
  return (
   <>
   <BrowserRouter>
    <nav>
        <div className="header">
          <div className="header_left">
            <Link to="/"><StyledIconText icon={Globe} text="fr" /></Link>
            <StyledIcon icon={SunMoon}  />
            <Link to={profileData.github} target='_blank'><StyledIcon icon={GithubIcon}  /></Link>
            <Link to={profileData.linkedin} target='_blank'><StyledIcon icon={LinkedinIcon}  /></Link>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}`} target='_blank' rel='noopener noreferrer' ><StyledIcon icon={Mail}   /></a>

          </div>
          <div className="header_right">
            <Link to="login#form"><StyledIcon icon={UserRound} /></Link>
          </div>
        </div>
        <div className="nav_body">
          <div className="nav_text">
            <h1>Bienvenue sur mon portfolio!</h1>
            <p>{text}</p>
          </div>
          <img src={home_image} alt='home_image'  />
        </div>
    </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
   </BrowserRouter>
   </>
  );
}



export default App;
