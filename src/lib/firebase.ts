import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDlXR7Fzdd3kgurOl_d3G2Ncf8RzaLmBnM",
  authDomain: "aisance-133a4.firebaseapp.com",
  projectId: "aisance-133a4",
  storageBucket: "aisance-133a4.firebasestorage.app",
  messagingSenderId: "918279855133",
  appId: "1:918279855133:web:dd4a10d3ea97fb7280baf4",
  measurementId: "G-HQ4J2R6426",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics is only available in the browser
export const analyticsPromise =
  typeof window !== 'undefined'
    ? isSupported().then((yes) => (yes ? getAnalytics(app) : null))
    : Promise.resolve(null);
