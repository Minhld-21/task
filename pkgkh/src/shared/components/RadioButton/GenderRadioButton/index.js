import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, StyleSheet, ViewBase} from 'react-native';
import {Colors, Sizes, Width, parseSize} from '~theme';

const RadioGroup = ({data, titleStyle, valueSelected, getValueSelected}) => {
  const [selectedOption, setSelectedOption] = useState(valueSelected);

  const handleOptionChange = value => {
    getValueSelected(value);
    setSelectedOption(value);
  };

  return (
    <View style={styles.container}>
      <Text style={titleStyle || styles.title}>Giới tính</Text>
      <View style={styles.content}>
        {data.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.radioButton,
              selectedOption === option.value && styles.selectedRadioButton,
            ]}
            onPress={() => handleOptionChange(option.value)}>
            <Icon
              style={[
                styles.iconGender,
                {color: option?.value === 'male' ? 'blue' : 'violet'},
              ]}
              name={option.value}
            />
            <Text
              style={[
                styles.radioText,
                selectedOption === option.value && styles.selectedRadioText,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    color: Colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.padding,
    marginVertical: Sizes.margin,
  },
  radioButton: {
    borderWidth: 1,
    width: parseSize(60),
    height: parseSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightDark,
    paddingVertical: Sizes.padding / 2,
    paddingHorizontal: Sizes.padding,
    borderRadius: 5,
    marginHorizontal: Sizes.margin,
  },
  selectedRadioButton: {
    backgroundColor: 'wheat',
    borderColor: Colors.danger,
  },
  radioText: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: '500',
    fontSize: 12,
    color: 'black',
  },
  iconGender: {
    fontWeight: '500',
    fontSize: 24,
    color: 'black',
  },
  selectedRadioText: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: '500',
    fontSize: 12,
    color: Colors.price,
  },
});

export default RadioGroup;
