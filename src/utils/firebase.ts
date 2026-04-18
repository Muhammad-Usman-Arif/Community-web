import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAZ1v-Mfntz54mB1ppA7qK4wqp6oeceuj4",
  authDomain: "community-c16a3.firebaseapp.com",
  projectId: "community-c16a3",
  storageBucket: "community-c16a3.firebasestorage.app",
  messagingSenderId: "99670742380",
  appId: "1:99670742380:web:5606d355c9571e31d54f49",
  measurementId: "G-DS4MZYNKCT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
