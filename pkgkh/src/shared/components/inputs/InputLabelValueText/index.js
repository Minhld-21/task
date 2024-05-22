import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors, Sizes, parseSize} from '~theme';
import LabelView from '~shared/components/Label/LabelView';

export default Index = props => {
  const {
    titleLabel,
    maxLength,
    value,
    changeText,
    onBlur,
    returnKeyType,
    editable,
    styleContainer,
    styleText,
    keyboardType,
    secureTextEntry,
    multiline,
    numberOfLines,
  } = props;
  return (
    <LabelView
      title={titleLabel}
      styleLabelView={styleContainer || styles.styleLabelView}>
      <View style={styles.wrapInput}>
        <TextInput
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          maxLength={maxLength}
          style={styleText || styles.textInput}
          value={value != null ? value.toString() : ''}
          onChangeText={text => changeText(text)}
          returnKeyType={returnKeyType || 'next'}
          editable={editable || true}
          onBlur ={onBlur}
        />
      </View>
    </LabelView>
  );
};

const styles = StyleSheet.create({
  styleLabelView: {
    flex: 1,
    marginTop: parseSize(5),
  },
  wrapInput: {
    borderBottomWidth: Sizes.border,
    borderBottomColor: Colors.border,
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.padding / 4,
    marginHorizontal: Sizes.margin / 4,
    backgroundColor:Colors.white,
    borderRadius:Sizes.radius,
  },
  textInput: {
    padding: 0,
    height:parseSize(35),
    fontFamily: 'Hahmlet-Regular',
    fontSize: 12,
    color: Colors.dark,
    backgroundColor:Colors.white,
  }
});
