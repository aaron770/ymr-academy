import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIdS3XaXBPJvyNCHudRtG99BvW--bOJGQ",
  authDomain: "torah-academy.firebaseapp.com",
  databaseURL: "https://torah-academy.firebaseio.com",
  projectId: "torah-academy",
  storageBucket: "torah-academy.appspot.com",
  messagingSenderId: "283340384588",
  appId: "1:283340384588:web:a15b2a990b11db1ac547e9"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
