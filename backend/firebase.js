const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

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
const db = getFirestore(app);

module.exports = { db };