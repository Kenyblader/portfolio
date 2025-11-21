import '../style/home.css'
import ProjectCard from '../components/projectCard';
import { projectService } from '../services/project.service';
import { useState, useEffect } from 'react';
import Project from '../models/project';
import { useTranslation } from 'react-i18next';
import { authHook } from '../utils/hooks/authHook';


const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t}= useTranslation();

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const projects = await projectService.getProjects();
        setProjects(projects);
        setError(null);
      } catch (err: any) {
        setError(err.message || t('home.errorLoading'));
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }

    getProjects();
  }, []); 
  if (loading) {
    return <div className="home_container">{t('home.projectLoading')}</div>;
  }

  if (error) {
    return <div className="home_container">{t('error')}: {error}</div>;
  }

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