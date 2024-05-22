import React from "react";
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { Colors, Sizes, Width,parseSize } from '~theme';

const Index =props=>{
    const {styleButton, styleTitle,title, onPress}= props;
    return(
        <View style={styles.footer}>
          <View style={styles.line}></View>
          <TouchableOpacity style={styleButton||styles.buttonAdd} onPress={onPress}>
            <Text style={styleTitle||styles.textButtonAdd}>{title}</Text>
          </TouchableOpacity>
        </View>
    )
}
export default Index;
const styles = StyleSheet.create({
    footer:{
        marginHorizontal:Sizes.margin,
        marginVertical:Sizes.margin/2,
      },
      line:{
        padding:0,
        alignSelf:'center',
        width:parseSize(30),
        height: parseSize(3),
        backgroundColor: Colors.lightDark,
        borderRadius:Sizes.radius,
      },
      buttonAdd: {
        height: parseSize(40),
        borderRadius:Sizes.radius/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.warning,
        marginVertical:Sizes.margin,
      },
      textButtonAdd: {
        fontFamily: 'Hahmlet-Bold',
        fontSize: 14,
        color: Colors.white,
      },
})