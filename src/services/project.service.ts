import Project, { IProject } from "../models/project";
import api from "./api";

class ProjectService {
    async createProject(formData: Omit<IProject, "id" | "image"> & { img: File | null; }) {
        throw new Error("Method not implemented.");
    }
    async getProjects(): Promise<Project[]> {
        const response = await api.get<IProject[]>('/project');
        return response.data.map(projectJson => Project.fromJSON(projectJson));
    }
}

export const projectService = new ProjectService();
