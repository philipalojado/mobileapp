import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebaseConfig.js';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LostScreen from './LostScreen';
import MessageScreen from './MessageScreen';
import NotificationScreen from './NotificationScreen';
import LoginScreen from './LoginScreen';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import ChatScreen from './ChatScreen';
import CommentScreen from './CommentScreen';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ConfirmScreen from './ConfirmScreen';
const Stack = createStackNavigator();

function RootApp() {
  // Check if the user is already authenticated
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Comment" 
          component={CommentScreen} 
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Lost/Found" component={LostScreen} 
       />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Notify" component={NotificationScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent(appName, () => App);
export default RootApp;
