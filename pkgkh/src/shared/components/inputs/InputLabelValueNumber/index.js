import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Sizes, parseSize } from '~theme';
import LabelView from '~shared/components/Label/LabelView';


export default Index = (props) => {
    const { titleLabel, maxLength, value, changeText, returnKeyType, blockText, styleContainer, styleText } = props; 
    const handleChangeText = async (value) => {
        if (value != '') {
            const cash = parseInt(value.split(',').join(''), 10);
            await changeText(cash);
        }
        else {
            await changeText(0);
        }
    }
    return (
        <LabelView title={titleLabel} styleLabelView={styleContainer || styles.styleLabelView}>
            <View style={styles.wrapInput}>
                <TextInput
                    keyboardType={'number-pad'}
                    maxLength={maxLength}
                    style={styleText || styles.textInput}
                    value={value!=null?value.toLocaleString("en-US"):'0'}
                    onChangeText={(text) => handleChangeText(text)}
                    returnKeyType={returnKeyType || 'next'}
                    editable={blockText} // Đặt editable thành true nếu muốn cho phép chỉnh sửa, và false nếu không muốn
                />
            </View>
        </LabelView>
    );
}

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
    },
    textInput: {
        padding: 0,
        fontFamily: 'Hahmlet-Regular',
        fontSize: 12,
        color: Colors.dark,
    },
})