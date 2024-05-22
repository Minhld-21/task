import React, { useCallback, useState, memo } from 'react';
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { DatePickerModal } from 'react-native-paper-dates';
import moment from "moment";

import styles from "./styles";
export default Index = props => {
  const {selectDate, minDate, maxDate, styleWrapContent,styleText, styleIcon} =props;
  const [range, setRange] = useState({ startDate: minDate, endDate: maxDate });
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
      selectDate({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  return (
    <View style ={styles.container}>
       <TouchableOpacity onPress={() => setOpen(true)} style={styleWrapContent||styles.wrapdate}>
          <TextInput
           value ={(moment(range?.startDate).format("DD/MM/YYYY")) +' - '+ (moment(range?.endDate).format("DD/MM/YYYY"))  }
            placeholder={''}
            editable={false}
            selectTextOnFocus={false}
            style={styleText||styles.text_showdate}
          />
          <Icon style={styleIcon||styles.icon} name="calendar" />
        </TouchableOpacity>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <DatePickerModal
          locale="vi"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
      </View>
    </View>
  );
}