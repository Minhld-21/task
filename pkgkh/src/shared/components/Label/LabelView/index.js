import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Colors, Sizes} from '~theme';

const LabelView = ({title, styleLabelView, children}) => {
  return (
    <View style={styleLabelView}>
      <Text style={styles.textTitleStyle}>{title}</Text>
      {children}
    </View>
  );
};
export default LabelView;

const styles = StyleSheet.create({
  textTitleStyle: {
    marginLeft: Sizes.margin,
    marginBottom: Sizes.margin / 2,
    fontFamily: 'Hahmlet-Regular',
    color: Colors.dark,
    fontSize: 10,
  },
});
