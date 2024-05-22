import React from 'react';
import { Text, View ,StyleSheet } from 'react-native';
import {Colors,Sizes, Width} from '~theme';

export default Index = () => {
    return (
        <View style={styles.notify}>
            <Text style={styles.textNotify}>Hiện chưa có dữ liệu</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    notify:{
        width:Width-Sizes.margin,
        justifyContent:'center',
        alignItems:'center',
      },
      textNotify:{
        textAlign:'center',
        fontFamily:'Hahmlet-Regular',
        fontSize:14,
        fontWeight:'bold',
        color:'#766969',
      }
})