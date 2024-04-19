import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Modal, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from 'firebase/app';

function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [editableDetails, setEditableDetails] = useState({
    name: '',
    address: '',
    course: '',
    age: '',
  });
  const [editModalVisible, setEditModalVisible] = useState(false);

  const auth = getAuth();
  const storageRef = ref(storage);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadProfileDetails(user.uid);
        loadProfilePicture(user.uid);
      } else {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigation]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access media library.');
      }
    })();
  }, []);

  const loadProfilePicture = (userId) => {
    const profileRef = ref(storageRef, `profiles/${userId}`);
    getDownloadURL(profileRef)
      .then((url) => setProfilePicture(url))
      .catch((error) => console.log('Error loading profile picture:', error));
  };

  const loadProfileDetails = async (userId) => {
    try {
      const details = await AsyncStorage.getItem(`profile_details_${userId}`);
      if (details) {
        setEditableDetails(JSON.parse(details));
      }
    } catch (error) {
      console.error('Error loading profile details:', error);
    }
  };

  const saveProfileDetails = async (details) => {
    try {
      await AsyncStorage.setItem(`profile_details_${user.uid}`, JSON.stringify(details));
    } catch (error) {
      console.error('Error saving profile details:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  const handleChooseImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        await uploadProfilePicture(result.uri, user.uid);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const uploadProfilePicture = async (uri, userId) => {
    const profileRef = ref(storageRef, `profiles/${userId}`);
    const imageBlob = await fetch(uri).then((res) => res.blob());
  
    try {
      await uploadBytesResumable(profileRef, imageBlob);
      loadProfilePicture(userId);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Upload Error', 'Failed to upload profile picture. Please try again.');
    }
  };

  const saveEditedDetails = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: editableDetails.name.trim(),
      });

      await saveProfileDetails(editableDetails);

      setEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', `Failed to update profile: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ImageBackground source={require('./hs.png')} style={styles.backgroundImage}>
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={handleChooseImage}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <Text style={styles.noImageText}>No Image</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.profileName}>{editableDetails.name}</Text>
        </View>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Name:</Text>
        <TextInput
          style={styles.detailText}
          value={editableDetails.name}
          onChangeText={(text) => setEditableDetails({...editableDetails, name: text})}
        />

        <Text style={styles.detailLabel}>Address:</Text>
        <TextInput
          style={styles.detailText}
          value={editableDetails.address}
          onChangeText={(text) => setEditableDetails({...editableDetails, address: text})}
        />

        <Text style={styles.detailLabel}>Course:</Text>
        <TextInput
          style={styles.detailText}
          value={editableDetails.course}
          onChangeText={(text) => setEditableDetails({...editableDetails, course: text})}
        />

        <Text style={styles.detailLabel}>Age:</Text>
        <TextInput
          style={styles.detailText}
          value={editableDetails.age}
          onChangeText={(text) => setEditableDetails({...editableDetails, age: text})}
        />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.detailLabel}>Name:</Text>
            <TextInput
              style={styles.detailText}
              value={editableDetails.name}
              onChangeText={(text) => setEditableDetails({...editableDetails, name: text})}
            />

            <Text style={styles.detailLabel}>Address:</Text>
            <TextInput
              style={styles.detailText}
              value={editableDetails.address}
              onChangeText={(text) => setEditableDetails({...editableDetails, address: text})}
            />

            <Text style={styles.detailLabel}>Course:</Text>
            <TextInput
              style={styles.detailText}
              value={editableDetails.course}
              onChangeText={(text) => setEditableDetails({...editableDetails, course: text})}
            />

            <Text style={styles.detailLabel}>Age:</Text>
            <TextInput
              style={styles.detailText}
              value={editableDetails.age}
              onChangeText={(text) => setEditableDetails({...editableDetails, age: text})}
            />

            <Button title="Save" onPress={saveEditedDetails} />
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    top: -100,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
    top: 100,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  noImageText: {
    color: 'white',
    fontSize: 18,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    top: 90,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    top: -10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 5,
    color: 'black',
    top: -10,
  },
  editButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    top: -10,
    marginHorizontal:30
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    top: -10,
    marginHorizontal:30
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
