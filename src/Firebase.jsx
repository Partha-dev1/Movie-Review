import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFwThvgQb5xwRzDrec5C6uvTpP_2YUXIY",
  authDomain: "movie-review-clone.firebaseapp.com",
  projectId: "movie-review-clone",
  storageBucket: "movie-review-clone.firebasestorage.app",
  messagingSenderId: "620832702617",
  appId: "1:620832702617:web:580df9e72b23fb711af808"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
