import Project from "../models/project";
import defaultImage from '../assets/default.png';
import '../style/projectCard.css';
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ project }: { project: Project }) => {
  const techs = project.getTechsData();

  const troncedDescription = project.description.length > 200
    ? project.description.substring(0, 197) + "..."
    : project.description;

  return (
    <div className="project">
      <a href={project.image} target="_blank" rel="noreferrer" className="project_img_wrapper">
        <img src={project.image ?? defaultImage} alt={project.title} />
      </a>
      <div className="project_body">
        <h2>{project.title}</h2>
        <p>{troncedDescription}</p>
         {techs.length > 0 && (
          <div className="project_techs">
            {techs.map((tech) => (
              <div key={tech.name} className="project_tech_item" data-name={`${tech.name} | (${tech.type})`}>
                <img src={tech.icon} alt={tech.name} />
              </div>
            ))}
          </div>
        )}
        <div className="project-footer">
          <div className="project-links">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="Voir le projet">
                <ExternalLink size={15} strokeWidth={2} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="GitHub">
                <Github size={15} strokeWidth={2} />
              </a>
            )}
          </div>
          <span className="project-date">{project.date.toLocaleDateString('fr-FR', {month:'short', year:'numeric'})}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;