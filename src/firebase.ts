import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZvamXeVKYKMfGX9Bxp0CnYehBNzmPbAI",
  authDomain: "gen-lang-client-0433885117.firebaseapp.com",
  projectId: "gen-lang-client-0433885117",
  storageBucket: "gen-lang-client-0433885117.firebasestorage.app",
  messagingSenderId: "292245452511",
  appId: "1:292245452511:web:6421484bc6c2c2071b1b6a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use the specific firestoreDatabaseId "ai-studio-b6bf2877-fe1e-41a4-8204-b1a733d75f4d"
const db = getFirestore(app, "ai-studio-b6bf2877-fe1e-41a4-8204-b1a733d75f4d");

const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithPopup, signOut };
