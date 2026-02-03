'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
  Auth,
  User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface AuthError extends Error {
  code: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => {},
  sendPasswordReset: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    // Sangat penting untuk menangani hasil redirect setelah user kembali dari Google
    getRedirectResult(auth as Auth).catch((error) => {
      console.error("Redirect Result Error:", error);
    });

    const unsubscribe = onAuthStateChanged(auth as Auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseConfigured]);

  const signUp = (email: string, password: string) => {
     if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
    return createUserWithEmailAndPassword(auth as Auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
    return signInWithEmailAndPassword(auth as Auth, email, password);
  };

  const signOut = () => {
    if (!isFirebaseConfigured) return Promise.resolve();
    return signOut(auth as Auth);
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
    const provider = new GoogleAuthProvider();
    
    try {
      // Coba popup dulu (untuk Desktop)
      return await signInWithPopup(auth as Auth, provider);
    } catch (error: any) {
      // Jika popup diblokir (biasa di HP) atau gagal, gunakan redirect
      console.warn("Popup blocked or failed, switching to redirect method...");
      if (
        error.code === 'auth/popup-blocked' || 
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user'
      ) {
        return await signInWithRedirect(auth as Auth, provider);
      }
      throw error;
    }
  };

  const sendPasswordReset = (email: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
    return sendPasswordResetEmail(auth as Auth, email);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    sendPasswordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
