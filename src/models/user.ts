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

    static fromJson(json:any):User{
        console.log("user",json)
        return new User(
            json.id,
            json.username,
            json.email,
            json.github,
            json.linkedin
        )
    }
}
export default User;