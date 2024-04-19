// SearchScreen.js
import React from 'react';
import { View, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import Feather icons

const backgroundImage = require('./1.png'); // Replace with your image path

function SearchScreen({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Search input with search icon */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color="white" style={styles.searchIcon} />
          <TextInput
            placeholder=""
            placeholderTextColor="white"
            style={styles.searchInput}
            // Implement your search functionality here
          />
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
    opacity: 0.8, // Add opacity to the background
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dark background with opacity
    borderRadius: 10,
    paddingHorizontal: 20, // Increase padding horizontally
    paddingVertical: 15, // Increase padding vertically
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Make the TextInput adjustable in size
    color: 'white',
    fontSize: 18, // Increase font size to make it bigger
  },
});

export default SearchScreen;
