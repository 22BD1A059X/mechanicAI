import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal, ImageBackground, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { authInstance, firestoreInstance } from '../assests/api/firebase';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker'; // Ensure this package is installed
import { uploadDocumentToFirebase, parseDocument } from '../utils/documentUtils'; 

const FirstScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef(null);

  // Fetch user data when screen is focused
  useFocusEffect(
    useCallback(() => {
      const user = authInstance.currentUser;
      if (user) {
        fetchUserData(user.uid);
      } else {
        navigation.replace('Login');
      }
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  const fetchUserData = async (userId) => {
    if (!userId) return;
    
    try {
      const userDoc = await firestoreInstance.collection('Users').doc(userId).get();
      if (userDoc.exists) {
        setUserData(userDoc.data());
        await Promise.all([
          fetchSessions(userId),
          fetchChatHistory(userId, currentSession)
        ]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchSessions = async (userId) => {
    if (!userId) return;

    try {
      const sessionsSnapshot = await firestoreInstance
        .collection('Chats')
        .doc(userId)
        .collection('Sessions')
        .orderBy('date', 'desc')
        .get();
      
      const sessionsData = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setSessions(sessionsData);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchChatHistory = async (userId, sessionDate) => {
    if (!userId || !sessionDate) return;

    try {
      const chatDoc = await firestoreInstance
        .collection('Chats')
        .doc(userId)
        .collection('Sessions')
        .doc(sessionDate)
        .get();

      if (chatDoc.exists) {
        const chatData = chatDoc.data().messages || [];
        setConversation(chatData);
      } else {
        setConversation([]);
      }
      setCurrentSession(sessionDate);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const saveChatMessage = async (userId, message) => {
    if (!userId || !message) return;

    try {
      const sessionRef = firestoreInstance
        .collection('Chats')
        .doc(userId)
        .collection('Sessions')
        .doc(currentSession);

      await sessionRef.set({
        date: currentSession,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      }, { merge: true });

      // Update sessions list
      await fetchSessions(userId);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !authInstance.currentUser) return;

    const userMessage = {
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setConversation(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Save user message first
      await saveChatMessage(authInstance.currentUser.uid, userMessage);

      const response = await axios.post('http://192.168.129.95:8100/api/chat', {
        message: userMessage.text,
      });

      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setConversation(prev => [...prev, botMessage]);
      await saveChatMessage(authInstance.currentUser.uid, botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: 'Error connecting to the server.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSelect = async (sessionDate) => {
    const user = authInstance.currentUser;
    if (user) {
      await fetchChatHistory(user.uid, sessionDate);
      setShowSessions(false);
    }
  };

  const logOut = async () => {
    try {
      await authInstance.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const Profile = () => {
    try {
      navigation.navigate('Profile'); // Prefer 'navigate' for screen transitions to avoid replacing the entire stack.
    } catch (error) {
      console.error('Error navigating to profile:', error);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={item.sender === 'user' ? styles.messageText : styles.messageText1}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>
        {moment(item.timestamp).format('HH:mm')}
      </Text>
    </View>
  );

  const SessionsModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showSessions}
      onRequestClose={() => setShowSessions(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chat Sessions</Text>
          <ScrollView style={styles.sessionsList}>
            {sessions.map((session) => (
              <TouchableOpacity
                key={session.date}
                style={[
                  styles.sessionItem,
                  currentSession === session.date && styles.activeSession
                ]}
                onPress={() => handleSessionSelect(session.date)}
              >
                <Text style={styles.sessionDate}>
                  {moment(session.date).format('MMMM DD, YYYY')}
                </Text>
                <Text style={styles.messageCount}>
                  {session.messages?.length || 0} messages
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => setShowSessions(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    // <ImageBackground 
    //   source={{ uri: 'https://c8.alamy.com/comp/2FN0CP6/cute-cars-seamless-pattern-cartoon-transportation-doodles-background-vector-illustration-2FN0CP6.jpg' }} 
    //   style={styles.background}
    // >
      <View style={styles.container}>
        <Image source={require("../assests/LogoT.png")} style={styles.banner} />
        <Text style={styles.text1}>MechAI</Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setShowSessions(true)} style={styles.sessionButton}>
            <Ionicons name="time-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.sessionHeader}>
          <Text style={styles.sessionHeaderText}>
            {moment(currentSession).format('MMMM DD, YYYY')}
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={conversation}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message"
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={styles.sendButton} 
            disabled={loading}
          >
            <Ionicons 
              name={loading ? "hourglass-outline" : "send-outline"} 
              size={25} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={showSettings}
          onRequestClose={() => setShowSettings(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={Profile} style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logOut} style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setShowSettings(false)} 
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <SessionsModal />
      </View>
    //</ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerButtons: {
    position: 'absolute',
    top: 30,
    right: 15,
    flexDirection: 'row',
  },
  sessionButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  sessionHeader: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  sessionHeaderText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionsList: {
    maxHeight: 300,
  },
  sessionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  activeSession: {
    backgroundColor: '#444',
  },
  sessionDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageCount: {
    color: '#999',
    fontSize: 14,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#222',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  banner: {
    position: 'absolute',
    paddingTop: 10,
    height: 60,
    width: 80,
    marginTop: 20,
    resizeMode:'contain',
  },
  text1: {
    position: 'absolute',
    fontSize: 16,
    color: 'maroon',
    paddingTop: 69,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 49,
  },
  settingsButton: {
    backgroundColor: 'maroon',
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  userMessage: {
    backgroundColor: '#999',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 18,
    color: '#fff',
  },
  messageText1: {
    fontSize: 18,
    color: '#222',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: -50,
    backgroundColor: '#333',
  },
  textInput: {
    flex: 1,
    color: 'white',
    backgroundColor: '#444',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'maroon',
    padding: 10,
    borderRadius: 20,
  },
});

export default FirstScreen;