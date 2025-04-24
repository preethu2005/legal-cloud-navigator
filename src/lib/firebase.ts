
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQG61akcw4ErV4fDgmnpJx9NdBFWKg9aM",
  authDomain: "legal-advisor-a8577.firebaseapp.com",
  projectId: "legal-advisor-a8577",
  storageBucket: "legal-advisor-a8577.firebasestorage.app",
  messagingSenderId: "780046510021",
  appId: "1:780046510021:web:3bcd4ecd8dc905340c0dac",
  measurementId: "G-9YERZ0DS4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
