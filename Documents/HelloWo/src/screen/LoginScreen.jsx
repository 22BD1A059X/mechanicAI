import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // To handle navigation
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { loginUser } from '../assests/api/user'; // Ensure loginUser checks for email verification
import SigninWithGoogle from '../screen/signinwithgoogle'; // Import the SigninWithGoogle component
import auth from '@react-native-firebase/auth'; // Import Firebase auth
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', email, password);
      let userCredential = await loginUser(email, password);
      console.log('Login response:', userCredential);
      // Check if userCredential returned an error
      if (!userCredential.status) {
        setError(userCredential.error);
        return;
      }

      // After successful login, get the user and check email verification
      const user = await auth().signInWithEmailAndPassword(email, password);
      if (!user.user.emailVerified) {
        setError('Please verify your email before logging in.');
        await auth().signOut(); // Sign out the user if email is not verified
      } else {
        setError('');
        navigation.navigate('First');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  // Function to handle password reset
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email address');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password reset email sent!', 'Check your inbox for instructions to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Could not send password reset email. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Email Input with Icon */}
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

      {/* Password Input with Icon */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={24} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {error.length > 0 && <Text style={styles.error}>{error}</Text>}

      {/* Login Button */}
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin} 
        disabled={email.length < 5 || password.length < 8}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Link to Signup Page */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {/* Forgot Password Button */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <SigninWithGoogle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Changed to flex-start to align items at the top
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 150, // Added padding to push the content down
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
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
    color:'black',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'maroon',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
  forgotPasswordLink: {
    marginTop: 10,
    fontSize: 20,
    color: 'maroon',
  },
  error: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 24,
  },
});

export default LoginScreen;
