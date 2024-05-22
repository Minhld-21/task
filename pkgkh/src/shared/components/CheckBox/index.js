import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

import { Colors, parseSize } from '~theme';

export default function CheckBox({ value, styleCheckBox, styleTitle, title, onSelect }) {
  const [ischeck, setIsCheck] = useState(value);

  const ClickCheckBox = () => {
    setIsCheck(!ischeck);
    onSelect(!ischeck); // Pass the updated value back to the parent component
  };

  useEffect(() => {
    setIsCheck(value);
  }, [value]);

  return (
    <TouchableOpacity onPress={ClickCheckBox}>
      <View style={styles.wrap_check}>
        <View style={[styles.checkbox, styleCheckBox]}>
          {ischeck ? <Icon style={styles.iconcheck} name={'check'} /> : null}
        </View>
        <Text style={[styles.txt_title_checkbox, styleTitle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap_check: {
    flexDirection: "row",
  },
  checkbox: {
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    height: parseSize(18),
    width: parseSize(18),
    borderWidth: 2,
    borderColor: Colors.darkGrey,
    backgroundColor: Colors.content,
  },
  txt_title_checkbox: {
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
  },
  iconcheck: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
  },
});
