// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, setPersistence, browserLocalPersistence, sendEmailVerification } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJUGQtuuA-RYtHpyC33Wk7yRElbiUP3as",
  authDomain: "loot-87791.firebaseapp.com",
  databaseURL: "https://loot-87791-default-rtdb.firebaseio.com",
  projectId: "loot-87791",
  storageBucket: "loot-87791.appspot.com",
  messagingSenderId: "77310440594",
  appId: "1:77310440594:web:81514f65c7b4b7f68ea24b",
  measurementId: "G-FHHHGKRFMY",
  databaseURL: 'https://loot-87791-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set the persistence to LOCAL
setPersistence(auth, browserLocalPersistence);

const database = getDatabase(app);
const db = getFirestore(app);

// Export AsyncStorage along with other Firebase modules
export { app, auth, database, AsyncStorage }