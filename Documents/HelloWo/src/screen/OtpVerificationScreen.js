// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { verifyOtpAndLogin } from '../../api/otp'; // Function to verify OTP and login the user

// const OtpVerificationScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { email } = route.params; // Email passed from signup screen
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [timer, setTimer] = useState(300); // 5 minutes timer (300 seconds)

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(countdown);
//   }, []);

//   const handleVerifyOtp = async () => {
//     try {
//       const response = await verifyOtpAndLogin(email, otp); // Verify OTP and log the user in
//       if (response.error) {
//         setError(response.error);
//       } else {
//         setSuccess('OTP verified and logged in successfully!');
//         setTimeout(() => navigation.navigate('Home'), 2000); // Navigate to home after success
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   const formatTimer = () => {
//     const minutes = Math.floor(timer / 60);
//     const seconds = timer % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timer}>OTP expires in: {formatTimer()}</Text>

//       <View style={styles.inputWrapper}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter OTP"
//           keyboardType="numeric"
//           value={otp}
//           onChangeText={(text) => setOtp(text)}
//         />
//       </View>

//       <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
//         <Text style={styles.verifyButtonText}>Verify OTP</Text>
//       </TouchableOpacity>

//       {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
//       {success ? <Text style={styles.successMessage}>{success}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   timer: {
//     fontSize: 16,
//     color: 'red',
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     width: '100%',
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//   },
//   verifyButton: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#3399FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   verifyButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   errorMessage: {
//     color: 'red',
//     marginTop: 10,
//     fontSize: 16,
//   },
//   successMessage: {
//     color: 'green',
//     marginTop: 10,
//     fontSize: 16,
//   },
// });

// export default OtpVerificationScreen;
