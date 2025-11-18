import { useState, useEffect } from "react";
import Project from "../models/project";
import { projectService } from "../services/project.service";
import AdminProjectCard from "../components/adminProjectCard";
import Card from "../components/card";
import "../style/dashboard.css";
import StyledIconText from "../components/StyledIconText";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { analiticsService } from "../services/analitics.service";
import ConfirmModal from "../components/confirmPopup";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [views, setviews] = useState(0);
  const [isConfirm, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const projects = await projectService.getProjects();
        setProjects(projects);
        setError(null);
      } catch (err: any) {
        setError(err.message || t("dashboard.errorLoading"));
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    }

    async function getView() {
      const view = await analiticsService.getViewer();
      setviews(view);
    }

    getProjects();
    getView();
  }, []); // [] = exécute une seule fois au montage

  if (loading) {
    return (
      <div className="dashboard_container">{t("dashboard.projectLoading")}</div>
    );
  }

  if (error) {
    return (
      <div className="dashboard_container">
        {t("error")}: {error}
      </div>
    );
  }

  function handleEdit(updatedProject: Project): void {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  async function handleDelete(): Promise<void> {
    const projectToDelete = projects[selectedIndex];

    console.log("Suppression du projet :", projectToDelete);
    try {
      setLoading(true);
      const isDelete = await projectService.deleteProject(projectToDelete.id);
      if (isDelete) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectToDelete.id)
        );
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || t("dashboard.errorDelete"));
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard_container" id="dashboard">
      <div className="stats">
        <Card
          text={projects.length.toString()}
          color="var(--secondary-color)"
          size="5rem"
        />
        <Card
          text={views.toString()}
          color="var(--tertiary-color)"
          size="5rem"
        />
        <StyledIconText
          icon={CirclePlus}
          light
          text={t("dashboard.newProject")}
          onclick={() => navigation("/projectForm#form")}
        />
      </div>
      <div className="projects_grid">
        {projects.length === 0 ? (
          <p>{t("dashboard.noProject")}</p>
        ) : (
          projects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              editAction={handleEdit}
              deleteAction={()=>{setConfirmOpen(true)}}
            />
          ))
        )}
      </div>
      <ConfirmModal
        isOpen={isConfirm}
        onConfirm={handleDelete}
        onClose={()=>{setConfirmOpen(false)}}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        type="warning"
      />
    </div>
  );
};

export default Dashboard;
