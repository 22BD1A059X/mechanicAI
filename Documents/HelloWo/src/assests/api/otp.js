// const admin = require('firebase-admin'); // Assuming you're using Firebase Admin SDK
// const jwt = require('jsonwebtoken'); // Assuming you're using JWT for tokens

// // Initialize Firebase Admin SDK
// admin.initializeApp();

// const verifyOtpAndLogin = async (email, otp) => {
//   // 1. Check OTP and verify if it's correct and not expired.
//   const isValidOtp = await checkOtp(email, otp);
//   if (!isValidOtp) {
//     return { error: "Invalid or expired OTP" };
//   }

//   // 2. If valid, mark the user as verified in the database.
//   await markUserAsVerified(email); // Update user status in DB

//   // 3. Create a session token (like JWT or Firebase auth token).
//   const token = createLoginToken(email);

//   return { token }; // Send token to the client
// };

// // Function to check OTP (replace with your own logic)
// const checkOtp = async (email, otp) => {
//   // Query your database or OTP storage
//   const otpRecord = await admin.firestore().collection('otps').doc(email).get();
//   if (!otpRecord.exists) {
//     return false;
//   }

//   const { otp: storedOtp, expiresAt } = otpRecord.data();
//   // Check if OTP is correct and not expired
//   const isExpired = Date.now() > expiresAt.toMillis(); // Assuming expiresAt is a Firestore Timestamp
//   return storedOtp === otp && !isExpired;
// };

// // Function to mark the user as verified
// const markUserAsVerified = async (email) => {
//   await admin.firestore().collection('users').doc(email).update({
//     verified: true,
//     // You can add other user info if needed
//   });
// };

// // Function to create a JWT token
// const createLoginToken = (email) => {
//   const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   return token;
// };

// module.exports = { verifyOtpAndLogin };
