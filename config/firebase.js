import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// https://stackoverflow.com/questions/55311228/how-to-remove-warning-async-storage-has-been-extracted-from-react-native-core
// Initialize Firebase with your config
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
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});