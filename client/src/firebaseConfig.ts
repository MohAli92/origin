import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfW9JBf4w6IY_-lwHhbIjAHB9MxgFEGBg",
  authDomain: "share-dish-58a5a.firebaseapp.com",
  projectId: "share-dish-58a5a",
  storageBucket: "share-dish-58a5a.firebasestorage.app",
  messagingSenderId: "545277635768",
  appId: "1:545277635768:web:3618315c6d433bd3d6d84d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable debug mode
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with config:', firebaseConfig);
}

export { auth };