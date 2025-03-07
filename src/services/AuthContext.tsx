import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../pages/FirebaseConfiguration';

interface AuthContextType {
  user: User | null;
  loading : boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log(auth);
    });
    return () => unsubscribe(); 
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

//for access in any component 
export const useAuth = () => {
  const context = useContext(AuthContext);
  // we can only use the inside the authprovider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
