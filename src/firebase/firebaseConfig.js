import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxm-SENHZkeLjqVKqSv8PcVmDu-_OWSl4",
  authDomain: "store-aa.firebaseapp.com",
  projectId: "store-aa",
  storageBucket: "store-aa.appspot.com",
  messagingSenderId: "527100957369",
  appId: "1:527100957369:web:6241902008ec7d5a8cc168",
  measurementId: "G-CM6ZKCMD4M",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//auth
export const auth = getAuth(app);

// database
export const database = getFirestore(app);
