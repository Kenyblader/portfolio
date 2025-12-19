import '../style/home.css'
import ProjectCard from '../components/projectCard';
import { useTranslation } from 'react-i18next';
import { authHook } from '../utils/hooks/authHook';
import useProject from '../utils/hooks/projectHook';


const Home = () => {
  const {t}= useTranslation();
  const {projects} = useProject();


  return (
    <div className="home_container">
      <h1>{t('home.myProjects')}</h1>
      <div className="projects_grid">
        {projects.length === 0 ? (
          <p onClick={()=>{
            console.log("is logged?",authHook.isLoggedIn())
          }}>{t('home.noProject')}</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;