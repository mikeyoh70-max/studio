import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function isFirebaseConfigured(config: FirebaseOptions): boolean {
  return Object.values(config).every(value => typeof value === 'string' && value.length > 0);
}

let app;
let auth: Auth | null = null;

if (isFirebaseConfigured(firebaseConfig)) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // auth remains null
  }
} else {
  console.warn(
    'Firebase configuration is incomplete. Authentication features will be disabled. Please check your .env.local file.'
  );
}

export { auth };
