import React, {useRef,useState, useLayoutEffect} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import IconVector from '../../icons/IconVector';
import {Sizes, Colors, Height, Width} from '~theme';

const InputWithIcon = props => {
  const [secureTextEntry, setSecureTextEntry] =useState(false);
  const [iconRight, setIconRight] =useState('eye');
  const {
    refInput,
    value,
    type, // type default = text, type = password input default Security
    style,
    maxLength,
    returnKeyType,
    keyboardType,
    placeholder,
    onChangeText,
    onBlur,
    onSubmitEditing,
    nameLeftIcon,
    typeLeftIcon,
    sizeLeftIcon,
    colorLeftIcon,
    nameRightIcon,
    typeRightIcon,
    sizeRightIcon,
    colorRightIcon
  } = props;

  useLayoutEffect(()=>{
    if(type ==='password')
    {
        setSecureTextEntry(true);
    }
  },[])
  const onClickIconRight= () => {
    if(type === 'password')
    {
        if(iconRight==='eye')
        {
            setSecureTextEntry(false);
            setIconRight('eye-off');
        }
        else{
            setSecureTextEntry(true);
            setIconRight('eye');
        }
    }
  }
  return (
    <View style ={styles.container}>
        <View style={styles.wrapInput}>
        {nameLeftIcon ? (
            <View style={styles.wrapLeftIcon}>
            <IconVector name={nameLeftIcon}
            type = {typeLeftIcon}
            size ={sizeLeftIcon}
            color ={colorLeftIcon} />
            </View>
        ) : null}
        <TextInput 
            ref={refInput}
            value={value}
            style={styles.inputText}
            secureTextEntry= {secureTextEntry}
            placeholder={placeholder || ''}
            maxLength={maxLength || 100}
            keyboardType={keyboardType || 'default'}
            returnKeyType={returnKeyType || 'next'}
            onChangeText={onChangeText}
            onBlur ={onBlur}
            onSubmitEditing={onSubmitEditing}
        />
        {type && type === 'password' ? <TouchableOpacity style={styles.wrapRightIcon} onPress={onClickIconRight}>
        <IconVector name={iconRight}
            type = {typeRightIcon}
            size ={sizeRightIcon}
            color ={colorRightIcon}
            />
        </TouchableOpacity> : null}
        </View>
    </View>
  );
};
export default InputWithIcon;

const styles = StyleSheet.create({
    container:{
        marginTop:Sizes.padding,
        opacity:0.7,
       
    },
    wrapInput:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:Sizes.inputHeight,
        borderColor:Colors.dark,
        borderWidth: Sizes.border*2,
        backgroundColor:Colors.white,
        borderRadius:Sizes.radius,
    },
    wrapLeftIcon: {
        paddingLeft:Sizes.padding,
        paddingRight:Sizes.padding,
    },
    inputText:{
        fontFamily: 'Hahmlet-Regular',
        position:'relative',
        bottom:0,
        flex:1,
        fontWeight:'400',
        color:Colors.darkGrey,
        fontSize:Sizes.text,
    },
    wrapRightIcon: {
        paddingLeft:Sizes.padding,
        paddingRight:Sizes.padding,
    },
});
