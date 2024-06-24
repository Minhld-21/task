import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const index = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          style={styles.iconHeader}
          name="chevron-left"
          size={30}
          color="black"
        />
      </TouchableOpacity>
      <Text style={styles.txtHeader}>Bán Hàng</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: 22,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#454545',
    flex: 1,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
