import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, sendEmailVerification, reload } from 'firebase/auth';

function ConfirmScreen({ navigation }) {
  const auth = getAuth();
  const [resendTimer, setResendTimer] = useState(null); // State to manage the timer
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  // Resend function
  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      Alert.alert('Verification email resent', 'Please check your inbox for the verification code.');
    } catch (error) {
      Alert.alert('Error resending email', error.message);
    } finally {
      // Restart the timer
      startResendTimer();
    }
  };

  // Timer functionality
  const startResendTimer = () => {
    setIsResendEnabled(false);
    let timeLeft = 60; // Example: 60 seconds wait

    const timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        setResendTimer(null);
        setIsResendEnabled(true);
      } else {
        setResendTimer(timeLeft);
        timeLeft -= 1;
      }
    }, 1000); // Update every second
  };

  // Check if the user is already verified
  useEffect(() => {
    const checkVerified = async () => {
      await reload(auth.currentUser);
      if (auth.currentUser.emailVerified) {
        // Navigating to the home screen if email is confirmed
        navigation.navigate('Home');
      }
    };

    checkVerified();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Please check your email for a verification code. Enter the code to confirm your account.
      </Text>

      <TouchableOpacity 
        style={[styles.button, isResendEnabled ? styles.enabledButton : styles.disabledButton]}
        onPress={handleResendVerification} 
        disabled={!isResendEnabled}
      >
        <Text style={styles.buttonText}>
          {resendTimer ? `Resend Code (${resendTimer})` : 'Resend Code'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  enabledButton: {
    opacity: 1
  },
  disabledButton: {
    opacity: 0.5 
  },
  buttonText: {
    color: 'white'
  }
});

export default ConfirmScreen;
