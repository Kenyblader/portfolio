import axios from "axios";
import Project, { EditProjectDTO, IProject } from "../models/project";
import api from "./api";

class ProjectService {
    async deleteProject(id: string) {
      try {
        const response= await api.delete(`/project/${id}`);
        return response.data>0;
      } catch (error) {
        if(axios.isAxiosError(error)) console.error("erreur Axios",error)
      }
    }
    async createProject(formData: Omit<IProject, "id" | "image"> & { img: File | null; }) {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date',formData.date)
        if (formData.link) {
            data.append('link', formData.link);
        }
        if (formData.github) {
            data.append('github', formData.github);
        }
        if (formData.img) {
            data.append('img', formData.img);
        }

        try {
            console.log("voici formData",formData)
            const response = await api.post('/project', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return Project.fromJSON(response.data);
        } catch (error) {
            if(axios.isAxiosError(error)) console.error("erreur backend", error.name)
            else console.error(error);
        }
    }

    async getProjects(): Promise<Project[]> {
        try {
            const response = await api.get<IProject[]>('/project');
            console.log("mes projets",response.data)
            return response.data.map(projectJson => Project.fromJSON(projectJson));
        } catch (error) {
            if(axios.isAxiosError(error)) console.error("erreur backend", error.name)
            else console.error(error);
            return [];
        }
    }

    async updatePRoject(formData: EditProjectDTO): Promise<number> {
        try {
            const data = new FormData();
            if(formData.title)
                data.append('title', formData.title);
            if(formData.description)
                data.append('description', formData.description);
            if(formData.date)
                data.append('date',formData.date);
            if (formData.link) {
                data.append('link', formData.link);
            }
            if (formData.github) {
                data.append('github', formData.github);
            }
            if (formData.img) {
                data.append('img', formData.img);
            }
            const response = await api.patch('/project/'+formData.id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            return response.data;

        } catch (error) {
            if(axios.isAxiosError(error)) console.error("erreur backend", error.name)
            else console.error(error);
            return -1;
        }
    }

}

export  const projectService = new ProjectService();
