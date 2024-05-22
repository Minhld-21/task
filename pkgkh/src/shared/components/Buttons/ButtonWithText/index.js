import { size } from "lodash";
import React from "react";
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { Sizes, Colors} from "~theme";

const ButtonWithText =props=>{
    const {styleButton, styleTitle,title, onPress}= props;
    return(
        <TouchableOpacity style ={[styles.wrapButton, styleButton]} onPress= {onPress}>
            <Text style ={[styles.titleButton, styleTitle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default ButtonWithText;
const styles = StyleSheet.create({
    wrapButton :{
       marginVertical:Sizes.margin,
       height:Sizes.button,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:Colors.info,
       borderRadius:Sizes.radius/2,
    },
    titleButton:{
        position:'relative',
        fontFamily: 'Hahmlet-Bold',
        fontWeight:'bold',
        fontSize:14,
        color:Colors.white,
        paddingHorizontal:Sizes.padding,
    }
})