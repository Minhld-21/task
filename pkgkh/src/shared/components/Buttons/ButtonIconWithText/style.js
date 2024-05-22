import React from 'react';
import { StyleSheet} from 'react-native';
import {FontStyles, Sizes, Colors} from '~theme'

const styles = StyleSheet.create({
    buttonDefault:{
        height: 100,
        width: 80,
        justifyContent:'center',
        alignItems:'center',
        
    },
    titleDefault : {
        fontSize:Sizes.titleDefault,
        color:'#000',
        textAlign:'center',
    },
    iconDefault :{
        fontSize: Sizes.icon,
        color: Colors.white,
    },
    linearDefault: {
        borderRadius:20,
        padding:Sizes.padding/2,
    }

});
export default styles;