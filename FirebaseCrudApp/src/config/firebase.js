import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDDZK_ZQ8IfiI_U-Tm3xLAAe5IG8gxnTp4",
  authDomain: "fir-crudapp-56a62.firebaseapp.com",
  projectId: "fir-crudapp-56a62",
  storageBucket: "fir-crudapp-56a62.appspot.com",
  messagingSenderId: "562779842262",
  appId: "1:562779842262:web:459ea64dce1ef26f074b77",
  measurementId: "G-DRDSBDPVDS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
