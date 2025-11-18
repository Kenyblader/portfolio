import Project from "../models/project";
import defaultImage from '../assets/default.png';
import '../style/projectCard.css';
import StyledIcon from "./styleIcon";
import { Edit,  Trash } from "lucide-react";

const AdminProjectCard = ({project, editAction, deleteAction}: {project: Project, editAction: (...data:any[]) => void, deleteAction: (...data:any[]) => void}) => {

  const troncedDescription = project.description.length > 300
    ? project.description.substring(0, 297) + "..."
    : project.description;

   

  return (
    <div className="project">
      <a href={project.image} target="_blank" >
        <img src={project.image ?? defaultImage} alt={project.title} />
      </a>
      <h2>{project.title}</h2>
      <p>{troncedDescription}</p>
      <div className="project-footer">
        <div className="project-links">
         <span   onClick={() => editAction(project)}><StyledIcon icon={Edit}  light={true} size={30}   /></span>
         <span onClick={() => deleteAction(project)}><StyledIcon icon={Trash} light={true} size={30} /></span>
       </div>
        <div className="project-date">{project.date.toDateString()}</div>
      </div>
    </div>
  );
};

export default AdminProjectCard;
