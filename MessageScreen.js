import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define your color scheme
const colors = {
  primary: '#6FA1F4', // Light blue
  background: '#F2F2F2', // Light gray
  text: 'black',
};

// Custom component for displaying messages with a Messenger-like UI
const MessageItem = ({ sender, message, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.messageContainer}>
      <Text style={styles.messageSender}>{sender}</Text>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  </TouchableOpacity>
);

function MessageScreen() {
  const navigation = useNavigation();

  // Sample data for messages
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Roberto Sanchez', message: 'Hello there!' },
    { id: '2', sender: 'Ryan Gosling', message: 'Hi, How are you?' },
    { id: '3', sender: 'Alrayan Ali', message: 'Pakopya' },
    { id: '4', sender: 'Marvin Dala', message: 'Wala mi API' },
    { id: '5', sender: 'Godfrey Rodriguez', message: 'Pasar unta mi' },
    { id: '6', sender: 'Philip Alojado', message: 'Pasar na grado sa SE og Mob Prog' },
    // Add more messages as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const goToChatScreen = (sender) => {
    // Navigate to a dedicated chat screen with the selected user
    navigation.navigate('Chat', { sender });
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter((item) =>
    item.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredMessages.map((item) => (
          <MessageItem
            key={item.id}
            sender={item.sender}
            message={item.message}
            onPress={() => goToChatScreen(item.sender)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  searchBarContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white', // Set background color for the search input
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    backgroundColor: colors.primary, // Set background color for received messages
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  messageSender: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white', // Set text color for sender's name
    marginBottom: 5,
  },
  messageText: {
    color: colors.text, // Set text color for message text
    fontSize: 18,
  },
});

export default MessageScreen;
