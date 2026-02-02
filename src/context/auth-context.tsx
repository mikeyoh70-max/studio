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

  // Check if Firebase is configured
  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.warn('Firebase is not configured. Auth features are disabled.');
      setLoading(false);
      return;
    }
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

  const signInWithGoogle = () => {
    if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth as Auth, provider);
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
