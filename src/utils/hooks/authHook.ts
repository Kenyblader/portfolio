

class AuthHook {
  private token?: string;
  private cbsState: ((data: boolean) => void)[];
  private readonly TOKEN_KEY= process.env.REACT_APP_TOKEN_KEY as string;

  constructor() {
    this.cbsState = [];
    this.restoreToken(); // 🔥 Restaure l'utilisateur au démarrage
  }

  private setToken(newToken?: string) {
    this.token = newToken;

    if (newToken) {
      // 🔒 Sauvegarde dans le localStorage
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(newToken));
    } else {
      // 🚪 Supprime du localStorage lors du logout
      localStorage.removeItem(this.TOKEN_KEY);
    }

    // Notifie les abonnés
    for (let i = 0; i < this.cbsState.length; i++) {
      this.cbsState[i](this.isLoggedIn());
    }
  }

  private restoreToken() {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    if (storedToken) {
      try {
        this.token = JSON.parse(storedToken);
      } catch {
        this.token = undefined;
      }
    }
  }

  logInUser(token: string) {
    this.setToken(token);
  }

  logOut() {
    this.setToken();
  }

  suscribeState(cb: (data: boolean) => void) {
    this.cbsState.push(cb);
  }

  isLoggedIn() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }
}

export const authHook = new AuthHook();
