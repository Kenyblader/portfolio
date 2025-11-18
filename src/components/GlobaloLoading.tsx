// src/components/GlobalLoading.tsx

import { useLoading } from "../utils/globalStateContext";
import '../style/globalLoading.css'

const GlobalLoading = () => {
  const { loadingState } = useLoading();

  if (!loadingState) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default GlobalLoading;