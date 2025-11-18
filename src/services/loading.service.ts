// src/services/LoadingService.ts
class LoadingService {
  private setLoadingFn: ((loading: boolean) => void) | null = null;

  // Méthode pour initialiser le service avec la fonction setLoading
  init(setLoading: (loading: boolean) => void) {
    this.setLoadingFn = setLoading;
  }

  // Méthodes publiques pour contrôler le loading
  show() {
    if (this.setLoadingFn) {
      this.setLoadingFn(true);
    }
  }

  hide() {
    if (this.setLoadingFn) {
      this.setLoadingFn(false);
    }
  }

  // Wrapper pour async operations
  async wrap<T>(promise: Promise<T>): Promise<T> {
    this.show();
    try {
      const result = await promise;
      return result;
    } finally {
      this.hide();
    }
  }
}

export const loadingService = new LoadingService();