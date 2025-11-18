// src/contexts/LoadingContext.tsx
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { loadingService } from "../services/loading.service";

// Type
export interface LoadingContextType {
  loadingState: boolean;
  setLoading: (data: boolean) => void;
}

// Context
export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
    loadingService.init(setLoading);
  }, []); 

  return (
    <LoadingContext.Provider value={{ loadingState: isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook personnalisé
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading doit être utilisé dans LoadingProvider');
  }
  return context;
};