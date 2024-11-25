import React, { useEffect, useRef, useState } from "react";
import { Text, Animated, View, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "./ThemeContext";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from "../utils/fonts";

const HomeScreen = () => {
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;
    const [showLoginImage, setShowLoginImage] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            height: 50,
            width: 80,
        },
        menuButton: {
            position: 'absolute',
            right: 20,
            top: 20,
        },
        banner: {
            height: 250,
            width: 300,
            marginVertical: 10,
        },
        title: {
            fontSize: 30,
            fontFamily: fonts.Light,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: theme.primary,
            marginBottom: 40,
            marginTop: -60,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: theme.modalOverlay,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: theme.modalBackground,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
        },
        modalOption: {
            paddingVertical: 10,
            borderBottomColor: theme.primary,
            borderBottomWidth: 1,
            width: 200,
            alignItems: 'center',
        },
        logo1: {
            height: 60,
            width: 60,
            left: -160,
            top: -270,
            resizeMode: 'contain',
        },
        modalOptionText: {
            fontSize: 18,
            color: theme.text,
            fontFamily: fonts.Regular,
        },
        getbtn: {
            backgroundColor: theme.primary,
            height: 50,
            width: 150,
            alignItems: 'center',
            justifyContent: 'center',
        },
        getText: {
            fontSize: 20,
            color: '#fff',
        },
        work: {
            height: 50,
            width: 150,
            backgroundColor: theme.secondary,
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center',
        },
        worktext: {
            fontSize: 18,
            color: '#fff',
        },
        themeButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomColor: theme.primary,
            borderBottomWidth: 1,
            width: 200,
            justifyContent: 'center',
            gap: 10,
        },
    });

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 2,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(opacityValue, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start(() => {
            setShowLoginImage(true);
        });
    }, []);

    const navigation = useNavigation();

    const handleNavigate = (screen) => {
        setModalVisible(false);
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={30} color={theme.primary} />
            </TouchableOpacity>

            {!showLoginImage && (
                <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: opacityValue }}>
                    <Image source={require("../assests/LogoT.png")} style={styles.logo} />
                </Animated.View>
            )}

            {showLoginImage && (
                <>
                    <Image source={require("../utils/LogoT.png")} style={styles.logo1}/>
                    <Text style={styles.title}>Resolve your problems here.</Text>
                    <TouchableOpacity onPress={() => handleNavigate('Chat')} style={styles.getbtn}>
                            <Text style={styles.getText}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigate('works')} style={styles.work}>
                        <Text style={styles.worktext}>How it works?</Text>
                    </TouchableOpacity>
                </>
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => handleNavigate('Home')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNavigate('Features')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Features</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNavigate('About')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNavigate('Login')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNavigate('Signup')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNavigate('FAQ')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>FAQ's</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                            <Ionicons 
                                name={isDarkMode ? "sunny" : "moon"} 
                                size={24} 
                                color={theme.text} 
                            />
                            <Text style={styles.modalOptionText}>
                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default HomeScreen;