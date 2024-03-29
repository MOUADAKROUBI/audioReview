const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAiaN_Oh3ZkwSAxZSpg-kCNTn3vuhG4s-M",
  authDomain: "react-app-cb9cb.firebaseapp.com",
  projectId: "react-app-cb9cb",
  storageBucket: "react-app-cb9cb.appspot.com",
  messagingSenderId: "963042786044",
  appId: "1:963042786044:web:6deff729e8c98a25e77579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
