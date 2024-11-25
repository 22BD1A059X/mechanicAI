import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const FeaturesScreen = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation(); 

  const features = [
    {
      id: 1,
      title: 'AI Diagnostics',
      symbol: '🔍',
      description: 'Advanced AI-powered car diagnostics that can identify issues with 99% accuracy.',
      details: 'Upload photos or describe symptoms, and our AI will analyze the problem using our vast database of car issues and solutions.'
    },
    {
      id: 2,
      title: 'Real-Time Support',
      symbol: '👨‍🔧',
      description: 'Connect with certified mechanics instantly through video or chat.',
      details: 'Get expert advice 24/7, share live video for better diagnosis, and receive step-by-step repair guidance.'
    },
    {
      id: 3,
      title: 'Cost Estimation',
      symbol: '💰',
      description: 'Get accurate repair cost estimates based on your location and vehicle model.',
      details: 'Compare prices from different workshops, view parts costs, and make informed decisions about repairs.'
    },
    {
      id: 4,
      title: 'Maintenance Tracker',
      symbol: '🔧',
      description: 'Keep track of your vehicle maintenance schedule and history.',
      details: 'Set reminders for regular maintenance, track repair history, and get AI-powered maintenance recommendations.'
    },
    {
      id: 5,
      title: 'Parts Finder',
      symbol: '⚙️',
      description: 'Locate and compare prices for genuine spare parts near you.',
      details: 'Browse through verified sellers, compare prices, and order parts directly through the app.'
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#800000',
      padding: 20,
      paddingTop: 60,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerText: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subHeaderText: {
      color: '#e0e0e0',
      fontSize: 16,
    },
    featureCard: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      marginHorizontal: 20,
      marginVertical: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    featureTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#800000',
      marginBottom: 8,
    },
    featureDescription: {
      color: '#666',
      fontSize: 16,
      lineHeight: 22,
    },
    featureDetails: {
      marginTop: 10,
      color: '#444',
      fontSize: 14,
      lineHeight: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    symbol: {
      fontSize: 24,
      marginRight: 10,
    },
    expandButton: {
      marginTop: 10,
      alignItems: 'center',
    },
    expandText: {
      color: '#800000',
      fontSize: 24,
    },
    scrollContent: {
      paddingVertical: 20,
    },
  });

  const renderFeatureCard = (feature) => {
    const isExpanded = expandedCard === feature.id;

    return (
      <TouchableOpacity
        key={feature.id}
        style={styles.featureCard}
        onPress={() => setExpandedCard(isExpanded ? null : feature.id)}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.symbol}>{feature.symbol}</Text>
          <Text style={styles.featureTitle}>{feature.title}</Text>
        </View>
        <Text style={styles.featureDescription}>{feature.description}</Text>
        {isExpanded && (
          <Text style={styles.featureDetails}>{feature.details}</Text>
        )}
        <View style={styles.expandButton}>
          <Text style={styles.expandText}>
            {isExpanded ? '▲' : '▼'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="white" marginTop={-40} marginLeft={-10}/>
      </TouchableOpacity>
        <Text style={styles.headerText}>Features</Text>
        <Text style={styles.subHeaderText}>
          Discover what our AI-powered mechanic can do for you
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {features.map((feature) => renderFeatureCard(feature))}
      </ScrollView>
    </View>
  );
};

export default FeaturesScreen;