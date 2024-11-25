import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import SigninWithGoogle from './signinwithgoogle'; // Adjust import path if needed
import Toast from 'react-native-toast-message'; // Import toast message

// Firebase Web Client ID setup for Google Sign-In
GoogleSignin.configure({
  webClientId: '703723116557-uvjkh2uj4eui1on6o4vpn585dvohk6f7.apps.googleusercontent.com', // Replace with your Web Client ID
});

// Function to create a new user with email and password in Firebase
const createUser = async (name, email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName: name });
    // Send email verification
    await userCredential.user.sendEmailVerification();
    return userCredential.user;
  } catch (error) {
    return { error: error.message };
  }
};

// Custom Toast Configuration
const toastConfig = {
  success: (internalState) => (
    <View style={[styles.toastContainer, styles.successToast]}>
      <Text style={styles.toastText}>{internalState.text1}</Text>
      <Text style={styles.toastText}>{internalState.text2}</Text>
      <TouchableOpacity onPress={() => Toast.hide()} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  ),
  error: (internalState) => (
    <View style={[styles.toastContainer, styles.errorToast]}>
      <Text style={styles.toastText}>{internalState.text1}</Text>
      <Text style={styles.toastText}>{internalState.text2}</Text>
      <TouchableOpacity onPress={() => Toast.hide()} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  ),
};

const SignupScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password strength validation
  const validatePassword = (password) => {
    return password.length >= 6; // Modify as per requirements (e.g., include special characters)
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Toast.show({
        text1: 'Error',
        text2: 'All fields are required!',
        type: 'error',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        text1: 'Error',
        text2: 'Invalid email format!',
        type: 'error',
      });
      return;
    }

    if (!validatePassword(password)) {
      Toast.show({
        text1: 'Error',
        text2: 'Password should be at least 6 characters long!',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const user = await createUser(name, email, password);
      if (user.error) {
        Toast.show({
          text1: 'Error',
          text2: user.error,
          type: 'error',
        });
      } else {
        Toast.show({
          text1: 'Success',
          text2: 'Verification email sent! Please check your inbox.',
          type: 'success',
        });
        setTimeout(() => navigation.navigate('Login'), 3000);
      }
    } catch (err) {
      Toast.show({
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={24} color="#333" style={styles.icon} />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={24} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3399FF" style={styles.loadingIndicator} />
      ) : (
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>

      <SigninWithGoogle />
      {/* Toast Component */}
      <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 150,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 10,
  },
  loginLink: {
    marginTop: 20,
    fontSize: 20,
    color: 'maroon',
  },
  toastContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successToast: {
    backgroundColor: '#28a745',
  },
  errorToast: {
    backgroundColor: '#dc3545',
  },
  toastText: {
    color: '#fff',
    fontSize: 16, // Increase font size
    textAlign: 'center',
  },
  okButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#3399FF',
    fontSize: 16, // Increase font size for OK button
  },
});

export default SignupScreen;
