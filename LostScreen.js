import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, ref, uploadString } from 'firebase/firestore';
import { db } from './firebaseConfig.js'; // Import your Firestore instance

const backgroundImage = require('./1.png');

const LostScreen = () => {
  const [postType, setPostType] = useState('lost');
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access media library.');
      }
    })();
  }, []);

  const togglePostType = () => {
    setPostType(postType === 'lost' ? 'found' : 'lost');
  };

  const getToggleText = () => {
    return postType === 'lost' ? 'Lost Item' : 'Found Item';
  };

  const handlePost = async () => {
    try {
      // Prepare the post data
      const newPost = {
        user: {
          name: 'Your Name', // Replace with the actual user's name
          picture: 'https://example.com/profile.jpg', // Replace with the actual user's profile picture URL
        },
        text: postText,
        type: postType,
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);

      if (postImage) {
        const imageRef = ref(db, `images/${docRef.id}`);
        await uploadString(imageRef, postImage, 'data_url');
      }

      // Navigate to FeedScreen
      navigation.navigate('Feed', { postId: docRef.id });
    } catch (error) {
      console.error('Error posting:', error.message);
      Alert.alert('Error', 'Failed to post. Please try again.');
    }
  };

  const handleChooseImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPostImage(result.uri);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={togglePostType} style={styles.toggleButton}>
          <Text style={[styles.toggleText, postType === 'found' && styles.foundText]}>
            {getToggleText()}
          </Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Describe the item..."
            value={postText}
            onChangeText={setPostText}
            style={styles.input}
            multiline
          />
          {postImage && (
            <Image source={{ uri: postImage }} style={styles.image} />
          )}
          <TouchableOpacity onPress={handleChooseImage} style={styles.iconButton}>
            <Feather name="camera" size={24} color="skyblue" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
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
    backgroundColor: 'transparent',
    padding: 20,
  },
  toggleButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  foundText: {
    color: 'green',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 0,
    marginRight: 10,
    color: 'black',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  postButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LostScreen;
