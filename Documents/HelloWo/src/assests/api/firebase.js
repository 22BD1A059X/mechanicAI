import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyALX9--Z5bypXGJxvzwGfgylAwOp6c2kXo",
    authDomain: "mechai-51684.firebaseapp.com",
    projectId: "mechai-51684",
    messagingSenderId: "703723116557",
    storageBucket: "mechai-51684.appspot.com",  // Fixed the typo here from "appshot" to "appspot"
    appId: "1:703723116557:android:66d6b6e7224e6f18fddd44",
};

// Initialize Firebase (this is usually done automatically by React Native Firebase)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export Firebase services
export const authInstance = auth();  // Firebase authentication instance
export const firestoreInstance = firestore();  // Firestore database instance

export default firebase;
