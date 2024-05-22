import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import styles from "./styles";

const  DateTimePicker = props=> {
    const {value,isShowPicker,styleContainer,styleContent,styleText,minDate,maxDate,selectDate} = props
    let values =value === undefined || value==null  ? "": (moment(value).format("DD/MM/YYYY"));
    // Data useState function  datetimepicker
    const [isDatePickerVisible, setDateTimePickerVisible] = useState(isShowPicker||false);
    const handleConfirm = (date) => {
        selectDate(date);
        setDateTimePickerVisible(false);
    };

    const showDatePicker = () => {
        setDateTimePickerVisible(true)
    };
    const hideDatePicker = () => {
        setDateTimePickerVisible(false)
    };
    return (
        <View style={styleContainer||styles.warp_showdate}>
            <TouchableOpacity onPress={showDatePicker} style={styleContent||styles.wrapdate}>
                <Text style={styleText||styles.text_showdate}>{values}</Text>
                <Icon style={styles.icon} name="calendar" />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                locale="vi" // Use "en_GB" here
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={minDate}
                maximumDate={maxDate}
            />
        </View>
    )
}

export default React.memo(DateTimePicker);