// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC84oMus4WCRJzSdVe44KrF0rDNlFweAEY',
  authDomain: 'strong-lad.firebaseapp.com',
  projectId: 'strong-lad',
  storageBucket: 'strong-lad.appspot.com',
  messagingSenderId: '965470519736',
  appId: '1:965470519736:web:ac2a0dc1ea25f9879f8f4d',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore();

export {auth, database};
