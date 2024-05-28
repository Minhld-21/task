import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpILp90EXwT5rr4Z1sELBiBncJ8Dh5hRg';

const Index = () => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log('Selected Place Data:', data);
          console.log('Selected Place Details:', details);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            width: '100%',
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        fetchDetails
        enablePoweredByContainer={false}
        debounce={200}
        onFail={error => console.error('Google Places API Error:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Index;
