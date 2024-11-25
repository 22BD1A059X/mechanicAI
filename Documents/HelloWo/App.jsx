import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import FirstScreen from './src/screen/FirstScreen';
import ChatScreen from './src/screen/ChatScreen';
import AboutScreen from './src/screen/AboutScreen';
import FeatureScreen from './src/screen/FeatureScreen';
import Profile from './src/screen/Profile';
import Toast from 'react-native-toast-message';
import HowItWorks from './src/screen/HowItWorks';
import FAQScreen from './src/screen/FAQScreen';
// App.js or your root component
import { ThemeProvider,useTheme } from './src/screen/ThemeContext';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="Features" component={FeatureScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="works" component={HowItWorks} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
