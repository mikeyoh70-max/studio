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
  signOut as firebaseSignOut,
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

    // Menangani hasil dari signInWithRedirect saat halaman dimuat ulang (sangat penting untuk mobile)
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth as Auth);
        if (result) {
          console.log("Berhasil login via redirect:", result.user);
        }
      } catch (error: any) {
        console.error("Gagal memproses hasil redirect:", error);
        // Dispatch custom event untuk ditangkap di UI
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-error', { detail: error }));
        }
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth as Auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseConfigured]);

  const signUp = (email: string, password: string) => {
     if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi.");
    return createUserWithEmailAndPassword(auth as Auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi.");
    return signInWithEmailAndPassword(auth as Auth, email, password);
  };

  const signOut = async () => {
    if (!isFirebaseConfigured) return;
    try {
      await firebaseSignOut(auth as Auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi.");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    // Gunakan redirect secara default untuk mobile atau jika di dalam iframe (in-app browser)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      console.log("Mobile detected: Menggunakan Redirect...");
      return await signInWithRedirect(auth as Auth, provider);
    }

    try {
      return await signInWithPopup(auth as Auth, provider);
    } catch (error: any) {
      console.warn("Popup gagal, mencoba Redirect...", error);
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        return await signInWithRedirect(auth as Auth, provider);
      }
      throw error;
    }
  };

  const sendPasswordReset = (email: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi.");
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