import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors, Sizes, Width } from '~theme';
import CheckBox from "~shared/components/CheckBox";

export default Index = props => {
    const { data, updateData } = props;
    const [checkAll, setCheckAll] = useState(false);
    // Kiểm tra check all
    useEffect(()=>{
        data.every(item => item.isCheck === true)==true? setCheckAll(true):setCheckAll(false);
    },[data])
    const handleCheckAll = ({value})=>{
        const dataUpdate = data.map(item => {
              return {
                ...item,
                SoLuong: value==false ? 0 : 1, 
                isCheck: value, 
              };
            });
          updateData(dataUpdate);
    }
    const handleCheck = ({id,value})=>{
        const dataUpdate = data.map(item => {
            if (item.ID == id) {
              return {
                ...item,
                SoLuong: value==false ? 1 : 0, 
                isCheck: !value, 
              };
            }
            return item;
          });
          updateData(dataUpdate);
          
    }
    const handleChangeText = ({id,value})=>{
        const dataUpdate = data.map(item => {
            if (item.ID == id) {
              return {
                ...item,
                SoLuong: value==""?0:parseInt(value), 
                isCheck: value>0?true:false, 
              };
            }
            return item;
          });
          updateData(dataUpdate);
          dataUpdate.every(item => item.isCheck === true)==true? setCheckAll(true):setCheckAll(false);

    }
    return (
        <View style={styles.wrapExtraSevice}>
            <Text style={styles.textTitleStyle}>Dịch vụ cộng thêm</Text>
            <View style={styles.wrapCheckBox}>
                <CheckBox
                    value ={checkAll}
                    title={'Chọn tất cả'}
                    onSelect={value => handleCheckAll({ value: value })}
                />
            </View>
            <View style={styles.groupCheckBox}>
                {data.map((item, index) => {
                    return(
                    <View style={styles.wrapCheckBox} key={index}>
                        <CheckBox
                            value={item?.isCheck}
                            title={item?.Title}
                            onSelect={() => handleCheck({ id: item?.ID, value:item?.isCheck  })}
                        />
                        <View style={styles.wrapQuality}>
                            <TextInput
                                maxLength={2}
                                keyboardType={"number-pad"}
                                onChangeText={text => handleChangeText( {id: item?.ID, value: text} )}
                                value={item?.SoLuong.toString()}
                                style={styles.textNumber}
                            />
                        </View>
                    </View>)
                })}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    wrapExtraSevice: {

    },
    textTitleStyle: {
        position: 'relative',
        left: 10,
        fontFamily: 'Hahmlet-Regular',
        color: Colors.dark,
        fontSize: 8,
    },
    wrapCheckBox: {
        width: Width / 2.5,
        marginHorizontal: Sizes.margin,
        marginTop: Sizes.margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wrapQuality: {
        height: 20,
        width: 20,
        borderColor: Colors.dark,
        borderWidth: Sizes.border,
    },
    groupCheckBox: {
        alignItems: 'flex-start',
    },
    textNumber: {
        margin: 0,
        padding: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Hahmlet-Bold',
        color: Colors.dark,
        fontSize: 12,
    },
    iconUpDown: {
        color: Colors.dark,
        fontSize: 10,
    }
})