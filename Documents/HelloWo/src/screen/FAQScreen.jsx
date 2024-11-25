import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const FAQScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const navigation = useNavigation();
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How accurate is the AI diagnosis?",
      answer: "Our AI diagnostic system has a 99% accuracy rate, validated through extensive testing with certified mechanics. It uses a database of millions of car repair cases and is continuously updated with new data.",
      category: "AI Features"
    },
    {
      id: 2,
      question: "What should I do if the app can't identify my car's problem?",
      answer: "If the AI cannot determine the issue, you'll be automatically connected to a certified mechanic for a live video consultation at no extra charge. They can help diagnose the problem and provide guidance.",
      category: "Troubleshooting"
    },
    {
      id: 3,
      question: "How do I share photos of my car problems?",
      answer: "Tap the camera icon in the diagnosis screen, take clear photos of the problem area, and our AI will analyze them. You can also upload existing photos from your gallery. Make sure to take photos in good lighting.",
      category: "Usage Guide"
    },
    {
      id: 4,
      question: "Are the cost estimates accurate?",
      answer: "Our cost estimates are based on real-time data from local repair shops and parts suppliers. They're typically accurate within 10% of the final cost, accounting for your specific location and vehicle model.",
      category: "Pricing"
    },
    {
      id: 5,
      question: "How do I schedule a repair appointment?",
      answer: "After receiving your diagnosis, tap 'Schedule Repair' to see available appointments at certified shops near you. You can compare prices, read reviews, and book directly through the app.",
      category: "Services"
    },
    {
      id: 6,
      question: "Is my vehicle data secure?",
      answer: "Yes, all vehicle data is encrypted and stored securely. We use industry-standard security protocols and never share your personal or vehicle information with third parties without your explicit consent.",
      category: "Privacy"
    },
    {
      id: 7,
      question: "Can I track my car's maintenance history?",
      answer: "Yes, the app automatically records all diagnoses, repairs, and maintenance work. You can also manually add previous maintenance records and set reminders for future service.",
      category: "Features"
    },
    {
      id: 8,
      question: "How do I contact live support?",
      answer: "Tap the 'Support' button in any screen to connect with our 24/7 support team. You can choose between chat, voice, or video support depending on your needs.",
      category: "Support"
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = useCallback(() => {
    if (!searchQuery) return faqs;
    
    const lowerQuery = searchQuery.toLowerCase();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#800000',
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerText: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    searchContainer: {
      marginHorizontal: 20,
      marginTop: -25,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    searchInput: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
      color: '#333',
    },
    faqContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 100,
    },
    faqCard: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.84,
    },
    category: {
      color: '#800000',
      fontSize: 15,
      fontWeight: '600',
      marginBottom: 8,
    },
    question: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    answer: {
      fontSize: 16,
      color: '#666',
      lineHeight: 20,
    },
    noResults: {
      textAlign: 'center',
      marginTop: 40,
      fontSize: 16,
      color: '#666',
    },
  });

  const renderFAQCard = (faq) => {
    const isExpanded = expandedId === faq.id;

    return (
      <TouchableOpacity
        key={faq.id}
        style={styles.faqCard}
        onPress={() => setExpandedId(isExpanded ? null : faq.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.category}>{faq.category}</Text>
        <Text style={styles.question}>{faq.question}</Text>
        {isExpanded && (
          <Text style={styles.answer}>{faq.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const filtered = filteredFAQs();

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="white" marginTop={-30} marginLeft={-10}/>
      </TouchableOpacity>
        <Text style={styles.headerText}>FAQs</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQs..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.faqContainer}>
        {filtered.length > 0 ? (
          filtered.map(renderFAQCard)
        ) : (
          <Text style={styles.noResults}>
            No FAQs found matching "{searchQuery}"
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FAQScreen;