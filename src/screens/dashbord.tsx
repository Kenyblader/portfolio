import { useState, useEffect } from "react";
import Project from "../models/project";
import { projectService } from "../services/project.service";
import ProjectCard from "../components/projectCard";
import AdminProjectCard from "../components/adminProjectCard";
import Card from "../components/card";
import '../style/dashboard.css'
import StyledIconText from "../components/StyledIconText";
import { CirclePlus } from "lucide-react";

const Dashboard = () => {

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
    return <div className="dashboard_container">Chargement des projets...</div>;
  }

  if (error) {
    return <div className="dashboard_container">Erreur: {error}</div>;
  }

    function handleEdit(updatedProject: Project): void {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === updatedProject.id ? updatedProject : project
            )
        );
    }

    async function handleDelete(projectToDelete: Project): Promise<void> {

        console.log("Suppression du projet :", projectToDelete);
        // try {
        //     setLoading(true);
        //     await projectService.deleteProject(projectToDelete.id);
        //     setProjects((prevProjects) =>
        //         prevProjects.filter((project) => project.id !== projectToDelete.id)
        //     );
        //     setError(null);
        // } catch (err: any) {
        //     setError(err.message || "Erreur lors de la suppression");
        //     console.error("Erreur:", err);
        // } finally {
        //     setLoading(false);
        // }
    }

  return (
    <div className="dashboard_container" id="dashboard">
      <div className="stats">
        <Card text={projects.length.toString()  }  color="var(--secondary-color)" size="5rem" />
        <Card text={'1'} color="var(--tertiary-color)" size="5rem" />
        <span className="add_project_button">
          <StyledIconText icon={CirclePlus} light text="Ajouter un projet" />
        </span>
      </div>
      <div className="projects_grid">
        {projects.length === 0 ? (
          <p>Aucun projet trouvé</p>
        ) : (
          projects.map((project) => (
            <AdminProjectCard key={project.id} project={project} editAction={handleEdit} deleteAction={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
