import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBLhanckeH-5JnYWggt1mdCePCGU8Y-zXU",
  authDomain: "whatsapp-83258.firebaseapp.com",
  projectId: "whatsapp-83258",
  storageBucket: "whatsapp-83258.appspot.com",
  messagingSenderId: "842426267839",
  appId: "1:842426267839:web:b95b1eac151611974b6e0a",
  measurementId: "G-242BQDXCWR",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
