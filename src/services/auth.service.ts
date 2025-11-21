
import { authHook } from "../utils/hooks/authHook";
import api from "./api";

class AuthService {
 



  async login(username: string, password: string): Promise<boolean> {
    try {
       const response = await api.post('/auth/login', { username, password });
      const isAuthenticated = response.data.isloggedIn;
      if(isAuthenticated) authHook.logInUser(response.data.token);
      return isAuthenticated;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  logout() {
    // await api.post('/auth/logout');
    authHook.logOut();
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
