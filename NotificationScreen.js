// NotificationScreen.js
import React from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
import backgroundImage from './1.png'; // Replace with the actual background image source

const notifications = [
  {
    id: '1',
    text: 'New post from Your Mama',
  },
  {
    id: '2',
    text: 'Your post "Lost Brain" received a comment',
  },
  {
    id: '3',
    text: 'Someone commented on your post',
  },
  {
    id: '4',
    text: 'Boktam Posted A Found Item',
  },
];

const NotificationScreen = () => {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Set the background color to match FeedScreen
    padding: 20,
  },
  notification: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
  },
});

export default NotificationScreen;
