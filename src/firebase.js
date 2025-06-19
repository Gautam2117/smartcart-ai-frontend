import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_K9YbPmPczpz-1VgVbPT5AnbA1_f1Plw",
  authDomain: "smartcart-ai-aab32.firebaseapp.com",
  projectId: "smartcart-ai-aab32",
  storageBucket: "smartcart-ai-aab32.firebasestorage.app",
  messagingSenderId: "542521004888",
  appId: "1:542521004888:web:b402798230e930a0b84b2d",
  measurementId: "G-B7G3ZJVPBH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
