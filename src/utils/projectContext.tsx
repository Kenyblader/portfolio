import React, { createContext, useEffect, useState } from "react";
import Project, { CreateProjectDTO, EditProjectDTO, IProject } from "../models/project";
import { projectService } from "../services/project.service";

export interface ProjetContextType {
    projects: Project[];
    addProject: (formData: Omit<IProject, "id" | "image"> & { img: File | null; }) => void
    getProject: (id: string) => Project;
    deleteProject:  (id: string) => void;
    editProject: ( formData: EditProjectDTO ) => void;
    loading: boolean
}

export const projectContext = createContext<ProjetContextType | null>(null);

export const ProjectProvider = ({children}: {children: React.ReactNode }) =>{
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);


    async function load(){
        setLoading(true);
        const tmp= await projectService.getProjects();
        setProjects([...tmp]);
        setLoading(false);
    }

    useEffect(()=>{
        load();
    },[]);

    function  addProject(formData: CreateProjectDTO){
        
        projectService.createProject(formData).then(project=>{
        if(project)
            setProjects(prev=> [...prev, project]);
        })
        
    }

    function getProject(id: string) {
        return projects.find(proj=> proj.id===id) as Project ;
    }

    function deleteProject( id: string ) {
        const tmp= [...projects];
        setProjects(prev=> prev.filter(proj=> proj.id !== id));
        projectService.deleteProject(id).then((isDelete)=>{
            if(isDelete)
                load();
            else
                setProjects([...tmp])
        });
    }

    function editProject( formData: EditProjectDTO) {
        projectService.updatePRoject(formData).then((row)=>{
            if(row>0)
                load()
        })
        
    }

    return (
        <projectContext.Provider value={
            {projects,
            getProject,
            addProject,
            deleteProject,
            editProject,
            loading
            }
        } >
            {children}
        </projectContext.Provider>
    )

}