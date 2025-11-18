import api from "./api";

class AnaliticsService{
    private readonly VISIT_KEY = process.env.REACT_APP_VISIT_KEY as string;
    private async addviewer(){
       try {
         api.post('analitics/viewer');
       } catch (error) {
            console.error(error);
       }
    }

    async getViewer():Promise<number>{
        try {
            const response= await api.get('analitics');
            return response.data.viewer;
        }
        catch(error){
            console.error(error)
            return 0
        }
        
    }

    trackVisit = async () => {
      const today = new Date().toDateString();
      const lastVisit = sessionStorage.getItem(this.VISIT_KEY);
      
      // Compter seulement si c'est un jour différent
      if (lastVisit !== today) {
        try {
          this.addviewer()
          sessionStorage.setItem(this.VISIT_KEY, today);
          console.log('✅ Nouvelle visite du jour enregistrée');
        } catch (error) {
          console.error('❌ Erreur compteur:', error);
        }
      } else {
        console.log('ℹ️ Déjà visité aujourd\'hui');
      }
    };
}

export const analiticsService= new AnaliticsService();