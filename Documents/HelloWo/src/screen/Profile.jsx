import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons
import auth from '@react-native-firebase/auth'; // Firebase auth for user details and password reset
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // Fetch user info on component mount
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser({
        email: currentUser.email,
        displayName: currentUser.displayName || 'N/A',
      });
    } else {
      Alert.alert('No user found', 'Please log in to view your profile.');
      navigation.navigate('Login');
    }
  }, []);

  // Handle password reset
  const handlePasswordReset = async () => {
    if (user && user.email) {
      try {
        await auth().sendPasswordResetEmail(user.email);
        Alert.alert('Success', 'Password reset email sent. Check your inbox.');
      } catch (error) {
        console.error('Password reset error:', error);
        Alert.alert('Error', 'Failed to send password reset email. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Display user info */}
      <Text style={styles.infoText}>Name: {user ? user.displayName : 'Loading...'}</Text>
      <Text style={styles.infoText}>Email: {user ? user.email : 'Loading...'}</Text>

      {/* Password reset button */}
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light gray background for better contrast
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 15,
    color: '#333', // Darker text color for better readability
    fontWeight: '500', // Medium weight for emphasis
    backgroundColor: '#e0e0e0', // Subtle background color for text
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    width: '90%', // Ensure text blocks are consistent in size
    textAlign: 'center',
    shadowColor: '#000', // Slight shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: 'maroon',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
