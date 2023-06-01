// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMbgE68CLbzJq4thgDSXyvETZSDEq-zRk",
  authDomain: "m-n-k-game-tic-tac-toe-hm-ei.firebaseapp.com",
  projectId: "m-n-k-game-tic-tac-toe-hm-ei",
  storageBucket: "m-n-k-game-tic-tac-toe-hm-ei.appspot.com",
  messagingSenderId: "649080408929",
  appId: "1:649080408929:web:ef8b6eaff52780e683d320",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
