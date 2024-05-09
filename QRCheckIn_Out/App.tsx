import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import QRCheck from './src/component/QRCheck';
import ConfirmCheck from './src/component/ConfirmCheck';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="QRCheck">
          <Stack.Screen name="QRCheck" component={QRCheck} />
          <Stack.Screen name="ConfirmCheck" component={ConfirmCheck} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
