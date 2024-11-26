import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDofgFV87cvUViFznn0VvjM-X4onArtncA",
  authDomain: "mini-project-d9c21.firebaseapp.com",
  projectId: "mini-project-d9c21",
  storageBucket: "mini-project-d9c21.firebasestorage.app",
  messagingSenderId: "724851665720",
  appId: "1:724851665720:web:30327cd864cd279f28efcd",
  measurementId: "G-814XJ3439Y",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
