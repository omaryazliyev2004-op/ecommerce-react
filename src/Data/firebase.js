import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_WHbrAT1wCpQAwL_7lO7uDRuum0dGZ3I",
  authDomain: "ecommerse-app-200cf.firebaseapp.com",
  projectId: "ecommerse-app-200cf",
  storageBucket: "ecommerse-app-200cf.firebasestorage.app",
  messagingSenderId: "925620816444",
  appId: "1:925620816444:web:37bbad9b0feadf1839d139"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);