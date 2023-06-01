import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkuiaDfq2X2RLwuBK6xDFRxhDrfGWdQx8",
  authDomain: "keeperapp-d0077.firebaseapp.com",
  projectId: "keeperapp-d0077",
  storageBucket: "keeperapp-d0077.appspot.com",
  messagingSenderId: "409831330910",
  appId: "1:409831330910:web:005ccaebaea15ac36e10cf"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);