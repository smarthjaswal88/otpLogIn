import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlZpqip-EhfBcVjOT-0PglRty64cCkojU",
    authDomain: "log-in-aad2f.firebaseapp.com",
    projectId: "log-in-aad2f",
    storageBucket: "log-in-aad2f.appspot.com",
    messagingSenderId: "772626685689",
    appId: "1:772626685689:web:23f7f40e5516aeb0958c28",
    measurementId: "G-X92F1J4NN9"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
