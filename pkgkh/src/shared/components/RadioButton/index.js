import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize} from '~theme';

const RadioButtonGroup = ({
  styleContainer,
  options,
  selected,
  onValueChange,
}) => {
  return (
    <View style={styleContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onValueChange(option.value)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.styleOption}>
              {selected === option.value && (
                <View style={styles.styleSelected} />
              )}
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  styleOption: {
    width: parseSize(15),
    height: parseSize(15),
    borderRadius: Sizes.radius,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.margin,
  },
  styleSelected: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  label:{
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark,
  }
});
