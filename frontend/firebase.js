// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApO6vuHixlRFZ87qaf-ZBXOK0O-6k6rbE",
  authDomain: "audio-e1a96.firebaseapp.com",
  projectId: "audio-e1a96",
  storageBucket: "audio-e1a96.appspot.com",
  messagingSenderId: "570092642508",
  appId: "1:570092642508:web:7d510bfac1b84344aba269",
  measurementId: "G-FKECEPG5MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };