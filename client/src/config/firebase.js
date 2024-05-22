// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc1nHzmokZRayFUVpZGI7wqvVCeECfuvg",
  authDomain: "skillrise-d12b3.firebaseapp.com",
  projectId: "skillrise-d12b3",
  storageBucket: "skillrise-d12b3.appspot.com",
  messagingSenderId: "595881771823",
  appId: "1:595881771823:web:7e41e80420e9389e0817da",
  measurementId: "G-QX9CP139YN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default storage;
