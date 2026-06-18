import { useAuth, useUser } from "@clerk/react";
import User from "../../models/user";



const useAuthHook = () => {
  const { isSignedIn, signOut, isLoaded } = useAuth();
  const { user } = useUser();

  return {
    // Remplace authHook.isLoggedIn()
    isLoggedIn: () => !!isSignedIn,

    // Remplace authService.logout()
    logout: () => signOut(),

    // Infos user si besoin
    user: user != null ? User.fromJson({
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? '',
      name: user.fullName ?? '',
      avatar: user.imageUrl ?? '',
    }) : null,
    // Utile pour afficher un loader le temps que Clerk charge
    isLoaded,
    
  };
};

export default useAuthHook;