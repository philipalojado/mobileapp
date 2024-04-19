import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig';

const backgroundImage = require('./1.png');

function FeedScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from Firebase Realtime Database
    const postsRef = ref(database, 'posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert data object to an array of posts
        const postsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setPosts(postsArray);
      }
    });
  }, []);

  // Temporary posts
  const temporaryPosts = [
    {
      id: 'temp1',
      user: {
        name: 'Morben',
        picture: 'https://placekitten.com/200/201', // Placeholder image
      },
      text: 'Missing you near the library',
      type: 'lost',
    },
    {
      id: 'temp2',
      user: {
        name: 'Vengeance',
        picture: 'https://placekitten.com/200/202', // Placeholder image
      },
      text: 'Found a candy',
      type: 'found',
    },
    {
      id: 'temp3',
      user: {
        name: 'Jim Morrison',
        picture: 'https://placekitten.com/200/203', // Placeholder image
      },
      text: 'Lost aquaflask at the canteen',
      type: 'lost',
    },
  ]

  // Handle navigation to comment screen
  const handlePostPress = (post) => {
    navigation.navigate('Comment', { post });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Temporary posts */}
        {temporaryPosts.map((tempPost) => (
          <TouchableOpacity
            key={tempPost.id}
            style={styles.postContainer}
            onPress={() => handlePostPress(tempPost)}
          >
            <Image source={{ uri: tempPost.user.picture }} style={styles.profileImage} />
            <View style={styles.postTextContainer}>
              <Text style={styles.userName}>{tempPost.user.name}</Text>
              <Text style={styles.postText}>{tempPost.text}</Text>
              <Text style={styles.postType}>{tempPost.type === 'lost' ? 'Lost' : 'Found'}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Existing posts */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.postContainer}
              onPress={() => handlePostPress(item)}
            >
              <Image source={{ uri: item.user.picture }} style={styles.profileImage} />
              <View style={styles.postTextContainer}>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.postText}>{item.text}</Text>
                <Text style={styles.postType}>{item.type === 'lost' ? 'Lost' : 'Found'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Bottom navigation with icons */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.bottomNavItem}
          >
            <Feather name="user" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={styles.searchIconContainer}
          >
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Lost/Found')}
            style={styles.bottomNavItem}
          >
            <Feather name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notify')}
            style={styles.bottomNavItem}
          >
            <Feather name="bell" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Message')}
            style={styles.bottomNavItem}
          >
            <Feather name="message-square" size={24} color="black" />
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
    padding: 20,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color for posts
    padding: 10,
    borderRadius: 10,
  },
  postTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black', // Text color for posts
  },
  postType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'orange', // You can use your color here
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  searchIconContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Text color for user names
  },
});

export default FeedScreen;
