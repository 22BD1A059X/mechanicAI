import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { authInstance, firestoreInstance } from './firebase';

export const createUser = async (name, email, password) => {
    try {
        const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
            await firestoreInstance.collection('Users').doc(user.uid).set({
                email: user.email,
                name: name,
            });
        }

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'auth/email-already-in-use') {
            return { error: 'The email you have entered is already in use.' };
        } else if (error.code === 'auth/invalid-email') {
            return { error: 'Please enter a valid email address.' };
        }
        return { error: 'Something went wrong with your request.' };
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        // Check if user exists in Firestore
        const userDoc = await firestoreInstance.collection('Users').doc(user.uid).get();
        if (!userDoc.exists) {
            await firestoreInstance.collection('Users').doc(user.uid).set({
                email: user.email,
                name: user.displayName || "New User",  // Use displayName if available
            });
        }

        return {
            status: true,
            data: {
                displayName: user.displayName,
                email: user.email,
                token: token,
            },
        };
    } catch (error) {
        console.error('Error logging in:', error);
        return { status: false, error: error.message };
    }
};
