import User from "../models/user";
import api from "./api";

class AuthService {
  private isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = false;
  }

  async login(username: string, password: string): Promise<boolean> {
    const response = await api.post('/auth/login', { username, password });
    this.isAuthenticated = response.data.isloggedIn;
    return this.isAuthenticated;
  }

  async logout() {
    const response = await api.post('/auth/logout');
    this.isAuthenticated = response.data.isAuthenticated;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  async getProfileData(){
    const response = await api.get('/auth/profile');
    const data= response.data ;
    return {
      github: data.github,
      linkedin: data.linkedin,
      email: data.email
    };
  }


}

export const authService=new AuthService();
