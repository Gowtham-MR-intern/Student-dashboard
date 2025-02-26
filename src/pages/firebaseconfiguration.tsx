import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY2tsILfyfRUjpMU-QWTebb7Hu4Qpj8qo",
  authDomain: "student-dashboard-981ef.firebaseapp.com",
  projectId: "student-dashboard-981ef",
  storageBucket: "student-dashboard-981ef.firebasestorage.app",
  messagingSenderId: "313330586110",
  appId: "1:313330586110:web:4f50b90afb949ab2c7b0af",
  measurementId: "G-NGMNL03HGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };

