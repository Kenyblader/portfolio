import Project from "../models/project";
import defaultImage from '../assets/default.png';
import '../style/projectCard.css';
import StyledIcon from "./styleIcon";
import { Github, Link } from "lucide-react";

const ProjectCard = ({ project }: { project: Project }) => {

  const troncedDescription = project.description.length > 300
    ? project.description.substring(0, 297) + "..."
    : project.description;

  return (
    <div className="project">
      <a href={project.image} target="_blank">
        <img src={project.image ?? defaultImage}  alt={project.title} />
      </a>
      <h2>{project.title}</h2>
      <p>{troncedDescription}</p>
      <div className="project-footer">
        <div className="project-links">
         {project.link && (
           <a href={project.link} target="_blank" rel="noopener noreferrer">
             <StyledIcon icon={Link}  light={true} size={30} />
           </a>
         )}
         {project.github && (
           <a href={project.github} target="_blank" rel="noopener noreferrer">
             <StyledIcon icon={Github} light={true} size={30} />
           </a>
         )}
       </div>
        <div className="project-date">{project.date.toDateString()}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
