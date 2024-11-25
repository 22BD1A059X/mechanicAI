import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Sample steps and capabilities data
const steps = [
  {
    icon: 'person-add',
    title: "Create Your Account",
    description: "Sign up in seconds with just your email. No credit card required to get started.",
    details: [
      "Secure authentication",
      "Personalized dashboard",
      "Free trial access"
    ]
  },
  {
    icon: 'chatbubble',
    title: "Start a Conversation",
    description: "Type your question or request in natural language. Our AI understands context and nuance.",
    details: [
      "Natural language processing",
      "Context awareness",
      "Multi-language support"
    ]
  },
  // More steps can be added here
];

const capabilities = [
  {
    icon: 'car',
    title: "Problem troubleShooting",
    description: "Generate clean, efficient solutions for the problems with detailed explanations."
  },
  {
    icon: 'file-text',
    title: "Content Creation",
    description: "Create high-quality written content, from technical documentation to creative writing."
  },
  // More capabilities can be added here
];

const HowItWorks = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="black" marginLeft={-190}/>
      </TouchableOpacity>
        <Text style={styles.heroTitle}>How It Works</Text>
        <Text style={styles.heroDescription}>
          Our AI-powered platform simplifies complex tasks and provides intelligent assistance.
        </Text>
      </View>

      {/* Steps Section */}
      <View style={styles.section}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <Ionicons name={step.icon} size={30} color="#800000" />
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
            {step.details.map((detail, idx) => (
              <Text key={idx} style={styles.stepDetail}>- {detail}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Capabilities Section */}
      <View style={styles.section}>
        {capabilities.map((capability, index) => (
          <View key={index} style={styles.capabilityCard}>
            <FontAwesome name={capability.icon} size={30} color="#800000" />
            <Text style={styles.capabilityTitle}>{capability.title}</Text>
            <Text style={styles.capabilityDescription}>{capability.description}</Text>
          </View>
        ))}
      </View>

      {/* Call to Action Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>Ready to experience it yourself?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.ctaButton}>Get Started Free</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  heroDescription: {
    marginTop: 12,
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginHorizontal: 32,
  },
  section: {
    marginBottom: 32,
  },
  stepCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  stepDescription: {
    marginTop: 8,
    color: '#475569',
  },
  stepDetail: {
    marginTop: 4,
    color: '#475569',
  },
  capabilityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  capabilityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  capabilityDescription: {
    marginTop: 8,
    color: '#475569',
  },
  ctaSection: {
    alignItems: 'center',
    backgroundColor: 'maroon',
    paddingVertical: 32,
    borderRadius: 8,
  },
  ctaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  ctaButton: {
    marginTop: 16,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
});

export default HowItWorks;
