import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBgQCTMXtsaW8_6od1-Hb_Gp9dxfv9hk80',
  authDomain: 'apple-store-16be0.firebaseapp.com',
  databaseURL: 'https://apple-store-16be0.firebaseio.com',
  projectId: 'apple-store-16be0',
  storageBucket: 'apple-store-16be0.appspot.com',
  messagingSenderId: '764116042969',
  appId: '1:764116042969:web:288b845cb42d2b9325eac8',
  measurementId: 'G-H4KT57M6ZJ',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
