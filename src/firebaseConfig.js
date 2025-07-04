import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyAiXwHwZvgCxWJqCdq3ZSo2CcLK2Mrw7KQ",
//   authDomain: "cinemania-1190f.firebaseapp.com",
//   databaseURL: "https://cinemania-1190f-default-rtdb.firebaseio.com/",
//   projectId: "cinemania-1190f",
//   storageBucket: "cinemania-1190f.appspot.com",
//   messagingSenderId: "435395424853",
//   appId: "1:435395424853:web:65db90fe8ed5f263b05adc",
//   measurementId: "G-V2D5THZQ3N",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBbodMPEqKGkQ38Gf99Tydg4mCA_9XAl6s",
  authDomain: "moonqueue.firebaseapp.com",
  databaseURL: "https://moonqueue-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moonqueue",
  storageBucket: "moonqueue.firebasestorage.app",
  messagingSenderId: "960585748465",
  appId: "1:960585748465:web:5d8042b165d5925172fe50",
  measurementId: "G-6K28J9M48P"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };