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

    // Menangani hasil dari signInWithRedirect saat halaman dimuat ulang
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth as Auth);
        if (result) {
          console.log("Berhasil login via redirect:", result.user);
        }
      } catch (error: any) {
        console.error("Gagal memproses hasil redirect:", error);
        // Dispatch custom event untuk ditangkap di halaman Auth jika perlu
        window.dispatchEvent(new CustomEvent('auth-error', { detail: error }));
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
     if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi. Cek Environment Variables.");
    return createUserWithEmailAndPassword(auth as Auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi. Cek Environment Variables.");
    return signInWithEmailAndPassword(auth as Auth, email, password);
  };

  const signOut = () => {
    if (!isFirebaseConfigured) return Promise.resolve();
    return signOut(auth as Auth);
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum terkonfigurasi. Cek Environment Variables.");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      // Coba popup dulu
      return await signInWithPopup(auth as Auth, provider);
    } catch (error: any) {
      // Jika di HP atau popup diblokir, gunakan redirect
      if (
        error.code === 'auth/popup-blocked' || 
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user' ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ) {
        console.log("Beralih ke metode Redirect untuk kemudahan di mobile...");
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