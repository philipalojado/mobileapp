import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const backgroundImage = require('./1.png'); // Replace with your image path

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Upper Container with Background Image */}
      <ImageBackground source={backgroundImage} style={styles.upperContainer}>
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Lower Container with Welcome Message and Buttons */}
      <View style={styles.lowerContainer}>
        <Text style={styles.welcomeText}>
          <Text style={styles.welcomePart}>Welcome to</Text> LootFinder
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#2196F3' }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>Log in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#fff' }]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={[styles.buttonText, { color: '#2196F3' }]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 60, // Adjust the radius to your preference
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent black
  },
  lowerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // White background for lower container
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40, 
    paddingHorizontal: 20, // Add padding for the buttons
    marginTop: -30, // Adjust to your preference
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333', // default color
    textAlign: 'center',
  },
  welcomePart: {
    color: '#2196F3', // color for "Welcome to"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Arrange buttons with space between
    width: '100%',
    marginTop: 20, // Add some space between the welcome text and buttons
  },
  buttonWrapper: {
    width: '48%', // Adjusted width to fit buttons with some space between them
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
