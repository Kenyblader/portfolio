import '../style/home.css'
import ProjectCard from '../components/projectCard';
import { projectService } from '../services/project.service';
import { useState, useEffect } from 'react';
import Project from '../models/project';

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const projects = await projectService.getProjects();
        console.log('Projets chargés:', projects);
        setProjects(projects);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }

    getProjects();
  }, []); // [] = exécute une seule fois au montage

  if (loading) {
    return <div className="home_container">Chargement des projets...</div>;
  }

  if (error) {
    return <div className="home_container">Erreur: {error}</div>;
  }

  return (
    <div className="home_container">
      <h1>Mes projets</h1>
      <div className="projects_grid">
        {projects.length === 0 ? (
          <p>Aucun projet trouvé</p>
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