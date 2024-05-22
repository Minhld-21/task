import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Width, Colors, Sizes, parseSize } from '~theme';

export default styles = StyleSheet.create({
    warp_showdate:{
        marginHorizontal:Sizes.margin,
    },
    wrapdate:{
        backgroundColor:Colors.white,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:Colors.dark,
        borderWidth:Sizes.border,
        borderRadius:Sizes.radius,
        paddingHorizontal:Sizes.padding,
    },
    text_showdate: {
        flex:1,
        fontFamily:'Hahmlet-Regular',
        fontSize:14 ,
        color:Colors.dark,
        textAlign:'center',
    },
    icon: {
        fontSize:24,
        color:Colors.dark,
    }
})