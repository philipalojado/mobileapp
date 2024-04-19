// CommentScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

function CommentScreen({ route }) {
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObject = { id: comments.length + 1, text: newComment, sender: 'You' };
      setComments([...comments, newCommentObject]);
      setNewComment('');
    }
  };

  const handleSendMessage = () => {
    navigation.navigate('Chat', { sender: 'You', recipient: post.user.name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image source={{ uri: post.user.picture }} style={styles.profileImage} />
        <View style={styles.postTextContainer}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.postText}>{post.text}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentSender}>{item.sender}</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
          <Feather name="send" size={24} color="#6FA1F4" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sendMessageButton} onPress={handleSendMessage}>
        <Feather name="message-square" size={24} color="#fff" />
        <Text style={styles.sendMessageButtonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0', // Light background color
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 5,
  },
  postTextContainer: {
    flex: 1,
    marginLeft: 0,
  },
  userName: {
    color: '#333', // Dark text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  postText: {
    color: '#333', // Dark text color
    fontSize: 18,
  },
  sectionTitle: {
    color: '#333', // Dark text color
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  commentContainer: {
    backgroundColor: '#fff', // White background color for comments
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  commentSender: {
    color: '#6FA1F4', // Accent color for sender's name
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    color: '#333', // Dark text color for comments
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 5,
    borderWidth: 2,
    borderColor: '#6FA1F4',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#333', // Dark text color
  },
  commentButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff', // White background color
  },
  sendMessageButton: {
    backgroundColor: '#6FA1F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  sendMessageButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CommentScreen;
