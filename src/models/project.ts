import { getTech } from "../assets/data/techs";
import { ITech } from "./tech";

export interface IProject {
  id: string;
  title: string;
  description: string;
  date: string;
  techs?: string[];
  image?: string;
  link?: string;
  github?: string;
}

export type CreateProjectDTO = Omit<IProject, "id" | "image"> & { img: File | null; };

export type EditProjectDTO = Partial<IProject> & { img: File | null, id: string} 

class Project{
  id: string;
  title: string;
  description: string;
  date: Date;
  techs: string[];
  image?: string;
  link?: string;
  github?: string;

  constructor(id: string, title: string, description: string, date: Date, image?: string, link?: string, github?: string, techs?: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.image = image;
    this.link = link;
    this.github = github;
    this.techs = techs ?? [];
  }

  toJSON(): IProject {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date.toISOString(),
      image: this.image,
      link: this.link,
      github: this.github,
      techs: this.techs
    };
  }
  
  static fromJSON(json: IProject): Project {
    return new Project(
      json.id,
      json.title,
      json.description,
      new Date(json.date),
      json.image ?? undefined,
      json.link,
      json.github,
      json.techs ?? []
    );
  }

  getTechsData(): ITech[] {
    return this.techs
      .map(key => getTech(key))
      .filter((t): t is ITech => t !== undefined);
  }
}

export default Project;
