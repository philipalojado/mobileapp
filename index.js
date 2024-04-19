import { AppRegistry } from 'react-native';
import App from './App'; // Assuming App.js is in the same directory
import { name as appName } from './app.json';

// Register the app component
AppRegistry.registerComponent(appName, () => App);

// If you are using the Hermes JavaScript engine, add the following line:
global.HermesInternal = true;
