import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqDuPQdaRtgn7rMlnpFYjsxVdVb9ivl9g",
  authDomain: "snabbe-9f0f7.firebaseapp.com",
  databaseURL: "https://snabbe-9f0f7.firebaseio.com",
  projectId: "snabbe-9f0f7",
  storageBucket: "snabbe-9f0f7.appspot.com",
  messagingSenderId: "227212044657",
  appId: "1:227212044657:web:740c60a320f666ce65eed0",
  measurementId: "G-33GPRQLLTN",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
