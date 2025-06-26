import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  logout: async () => {} 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // On first load, if there's a user, log them out to force fresh login
      if (user && !initialized) {
        console.log('Clearing existing session on app start');
        await signOut(auth);
        setUser(null);
        setInitialized(true);
        setLoading(false);
      } else {
        setUser(user);
        setInitialized(true);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [initialized]);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 