class User {
    id: string;
    name: string;
    email: string;
    avatar?: string;

    constructor(id: string, name: string, email: string, avatar?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }

    static fromJson(json:any):User{
        console.log("user",json)
        return new User(
            json.id,
            json.name,
            json.email,
            json.avatar
        )
    }
}
export default User;