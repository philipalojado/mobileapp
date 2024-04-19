import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';

function ChatScreen({ route }) {
  const { sender } = route.params;

  // Sample data for the chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'You', message: 'Hello!' },
    { id: '2', sender: sender, message: 'Hi there! How can I help you?' },
    // Add more messages as needed
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      // Add the new message to the chat
      const newMessageObject = { id: chatMessages.length + 1, sender: 'You', message: newMessage };
      setChatMessages([...chatMessages, newMessageObject]);

      // Clear the input field
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={item.sender === 'You' ? styles.sentMessage : styles.receivedMessage}
          >
            <Text style={styles.messageSender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6FA1F4', // Light blue background for sent messages
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA', // Light gray background for received messages
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6FA1F4', // Matching the color of the sent messages
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6FA1F4', // Light blue background for the send button
    padding: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
