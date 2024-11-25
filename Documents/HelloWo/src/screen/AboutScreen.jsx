import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Animated} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigation = useNavigation(); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const features = [
    {
      id: 1,
      title: 'AI-Powered Diagnostics',
      icon: 'psychology',
      description: 'Advanced GenAI technology analyzes car symptoms and provides accurate diagnostic solutions in real-time.',
      detail: 'Our sophisticated AI model is trained on millions of automotive diagnostic cases, enabling it to identify problems with unprecedented accuracy. Whether its a strange noise, vibration, or warning light, MechAI can help.',
    },
    {
      id: 2,
      title: 'Interactive Troubleshooting',
      icon: 'touch-app',
      description: 'User-friendly interface guides you through the diagnostic process with interactive questions and responses.',
      detail: 'Experience step-by-step guidance through our intuitive chat interface. MechAI asks relevant questions and provides clear instructions, making car diagnostics accessible to everyone.',
    },
    {
      id: 3,
      title: 'Instant Solutions',
      icon: 'flash-on',
      description: 'Get immediate recommendations for repairs, maintenance, and potential costs.',
      detail: 'Receive detailed repair estimates, find nearby mechanics, and access step-by-step DIY guides when applicable. Save time and money by knowing exactly whats wrong with your car.',
    },
    {
      id: 4,
      title: 'Expert Verification',
      icon: 'verified-user',
      description: 'AI diagnostics verified by certified automotive experts for reliability.',
      detail: 'Our AI solutions are continuously reviewed and verified by ASE-certified mechanics, ensuring you receive accurate and trustworthy advice every time.',
    },
  ];

  const stats = [
    { label: 'Problems Solved', value: '100K+' },
    { label: 'Active Users', value: '50K+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Car Models', value: '2000+' },
  ];

  const FeatureCard = ({ feature }) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => setSelectedFeature(feature)}
    >
      <MaterialIcons name={feature.icon} size={40} color="maroon" />
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureDescription}>{feature.description}</Text>
    </TouchableOpacity>
  );

  const StatCard = ({ label, value }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={'#222'} marginLeft={-190} marginTop={-40}/>
      </TouchableOpacity>
        <View style={styles.logoContainer}>
          <MaterialIcons name="engineering" size={60} color="grey" />
          <Text style={styles.heroTitle}>MechAI</Text>
        </View>
        <Text style={styles.heroSubtitle}>
          Your AI Mechanic Assistant
        </Text>
        <Text style={styles.heroText}>
          Solving car problems with the power of Generative AI
        </Text>
      </Animated.View>

      {/* Mission Statement */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          MechAI is revolutionizing car maintenance by making expert-level diagnostics 
          accessible to everyone. Using advanced AI technology, we empower car owners 
          to understand and resolve vehicle issues quickly, safely, and cost-effectively.
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} />
        ))}
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How MechAI Works</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </View>
      </View>

      {/* Technology Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Technology</Text>
        <View style={styles.techSection}>
          <MaterialIcons name="auto-awesome" size={40} color="maroon" />
          <Text style={styles.techTitle}>Powered by GenAI</Text>
          <Text style={styles.techDescription}>
            MechAI leverages cutting-edge generative AI technology to understand, 
            diagnose, and solve car problems. Our AI model continuously learns from 
            new cases and expert feedback, ensuring increasingly accurate diagnostics 
            and solutions.
          </Text>
        </View>
      </View>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={() => setSelectedFeature(null)}
        >
          <View style={styles.modalContent}>
            <MaterialIcons name={selectedFeature.icon} size={50} color="#1a73e8" />
            <Text style={styles.modalTitle}>{selectedFeature.title}</Text>
            <Text style={styles.modalDetail}>{selectedFeature.detail}</Text>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'maroon',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: 'maroon',
  },
  statCard: {
    width: '45%',
    padding: 15,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'maroon',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  techSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  techTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  techDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AboutUs;