import React, { useState, useEffect } from 'react';
import { View ,Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';

export default Index = Props => {
    const {
        title,
        data,
        style,
        textStyle,
        labelStyle,
        defaultValue,
        placeholder,
        searchPlaceholder,
        onSelect,
        onOpen,
        onClose,
        autoOpen,
        itemKey,
        listMode,
        searchable 
    } = Props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);
    useEffect(()=>{
        setValue(defaultValue)
    },[defaultValue])
    return (
        <View style={styles.container}>
            <View style={styles.content}>
            {title&&title.length>0?<Text style={styles.textTitleStyle}>{title}</Text>:null}
                <DropDownPicker
                    placeholder={placeholder||''}
                    style={style||styles.selectStoreBox}
                    textStyle={textStyle||styles.textStyleSelect}
                    labelStyle={labelStyle||styles.labelStyleSelect}
                    open={autoOpen||open}
                    value={value}
                    items={data}
                    onOpen={onOpen}
                    onClose={onClose}
                    setOpen={setOpen}
                    itemKey={itemKey}
                    setValue={setValue}
                    onChangeValue={value=>onSelect(value)}
                    searchable={searchable}
                    searchPlaceholder={searchPlaceholder}
                    searchTextInputStyle={styles.searchTextInputStyle}
                    listMode={listMode||"MODAL"}
                />
            </View>
        </View>
    );
}
