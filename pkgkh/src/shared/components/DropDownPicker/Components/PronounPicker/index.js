import React from "react";
import { StyleSheet } from "react-native";

import { Colors, Sizes, parseSize } from '~theme';
import DropDownPicker from '~components/DropDownPicker';
const dataPronoun = [
    
{
    value: "Anh",
    label: "Anh",
    },
    
    {
    value: "Chị",
    label: "Chị",
    },
    
    {
    value: "Bác",
    label: "Bác",
    },
    
    {
    value: "Bạn",
    label: "Bạn",
    },
    
    {
    value: "Cô",
    label: "Cô",
    },
    
    {
    value: "Dì",
    label: "Dì",
    },
    
    {
    value: "Chú",
    label: "Chú",
    },
    
    {
    value: "Em",
    label: "Em",
    }    
];

export default Index = props => {
    const { defaultValue,onChange } = props;
    return (
        <DropDownPicker
            title={'Danh xưng'}
            data={dataPronoun}
            defaultValue={defaultValue}
            searchable={false}
            style={styles.styleSelectBox}
            labelStyle={styles.labelStyleSelect}
            onSelect={value => onChange(value)}
            listMode={'MODAL'}
        />
    )
}

const styles = StyleSheet.create({
    styleSelectBox: {
        borderWidth: 0,
        minHeight: parseSize(30),
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    labelStyleSelect: {
        fontFamily: 'Hahmlet-Regular',
        fontSize: 12,
        color: Colors.dark,
    },
    wrapTitleInfo: {
        marginHorizontal: Sizes.margin,
        borderBottomWidth: Sizes.border,
        borderBottomColor: Colors.border,
        paddingVertical: Sizes.padding,
    },
    textTitleInfo: {
        fontFamily: 'Hahmlet-Bold',
        fontSize: 14,
        color: Colors.green,
    },
    textTitleStyle: {
        position: 'relative',
        left: 10,
        fontFamily: 'Hahmlet-Regular',
        color: "#5B5353",
        fontSize: 8,
    }
})