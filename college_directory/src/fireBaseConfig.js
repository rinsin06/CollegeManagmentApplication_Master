import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKRtGY3z8YOl956kf6vjf6l1irDZserns",
  authDomain: "collegemanagementdirectory.firebaseapp.com",
  projectId: "collegemanagementdirectory",
  storageBucket: "collegemanagementdirectory.appspot.com",
  messagingSenderId: "1030238923441",
  appId: "1:1030238923441:web:807af628cba6e3db861090",
  measurementId: "G-8B2MCDTBC9"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
