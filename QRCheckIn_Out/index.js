/**
 * @format
 */
import {LogBox} from 'react-native';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  // Exact message
  'Warning: componentWillReceiveProps has been renamed',

  // Substring or regex match
  /GraphQL error: .*/,
]);

AppRegistry.registerComponent(appName, () => App);
