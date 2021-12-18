
const firebaseConfig = {
  apiKey: "AIzaSyCrDmbFhxTqVDVVqJtsRj8BVC3botqHlpM",
  authDomain: "adoptoy.firebaseapp.com",
  projectId: "adoptoy",
  storageBucket: "adoptoy.appspot.com",
  messagingSenderId: "154861146245",
  appId: "1:154861146245:web:15b65a77a0dc7837b059ec",
  measurementId: "G-BXHN41C05P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();