import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig.js';
import { FontAwesome } from '@expo/vector-icons';

const backgroundImage = require('./1.png');
const LogoImage = require('./4.png');

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the Feed screen upon successful login
      navigation.navigate('Feed');
    } catch (error) {
      console.error('Login failed', error.message);
      // Handle login error
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image source={LogoImage} style={styles.logo} />
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
            </View>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, styles.textInput]}
              keyboardType="email-address"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="lock" size={24} color="white" style={styles.icon} />
            </View>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, styles.textInput]}
              secureTextEntry
              placeholderTextColor="white"
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.button, styles.touchableOpacity]}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  iconContainer: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
  textInput: {
    borderColor: 'transparent',
  },
  icon: {},
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
  },
  touchableOpacity: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;
