export interface IProject {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  link?: string;
  github?: string;
}



class Project{
  id: string;
  title: string;
  description: string;
  date: Date;
  image?: string;
  link?: string;
  github?: string;

  constructor(id: string, title: string, description: string, date: Date, image?: string, link?: string, github?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.image = image;
    this.link = link;
    this.github = github;
  }

  toJSON(): IProject {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date.toISOString(),
      image: this.image,
      link: this.link,
      github: this.github
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
      json.github
    );
  }
}

export default Project;
