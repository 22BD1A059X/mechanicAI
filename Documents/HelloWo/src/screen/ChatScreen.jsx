import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ChatScreen = () => {
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();
  const navigation = useNavigation(); // Initialize navigation

  const sendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = {
        text: inputText,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      setConversation((prev) => [...prev, userMessage]);
      setInputText('');
      setLoading(true);

      try {
        const response = await axios.post('http://192.168.129.95:8100/api/chat', {
          message: inputText,
        });

        const botMessage = {
          text: response.data.response,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };

        setConversation((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = {
          text: 'Error connecting to the server.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        setConversation((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={conversation}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      {loading && <ActivityIndicator size="large" color="#0078D4" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
  },
  loginButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    padding: 10,
    backgroundColor: '#bbb',
    borderRadius:10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  userMessage: {
    backgroundColor: 'maroon',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: 'grey',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
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
