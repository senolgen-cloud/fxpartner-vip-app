import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMDl08d3Ao-RFTKbL8-vqC_bLq5HXw1Q",
  authDomain: "fxpartner-vip.firebaseapp.com",
  projectId: "fxpartner-vip",
  storageBucket: "fxpartner-vip.firebasestorage.app",
  messagingSenderId: "949121409597",
  appId: "1:949121409597:web:95d2936600a1917dd88054"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
