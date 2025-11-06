class User {
    id: string;
    username: string;
    email: string;
    gitHub: string;
    linkedin?: string;
    

    constructor(id: string, username: string, email: string, gitHub: string, linkedin?: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.gitHub = gitHub;
        this.linkedin = linkedin;
    }
}
export default User;