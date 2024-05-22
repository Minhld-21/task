import React, { useState, useEffect } from "react";
import { showMessage } from 'react-native-flash-message';
import { View,StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import { Colors, Sizes, parseSize } from '~theme';
import { commonActions } from '~reduxCore/reducers';
import StorePicker from '~components/DropDownPicker';

export default Index = props => {
    const dispatch = useDispatch();
    const { defaultStore, getDataSelect } = props;
    const [dataStore, setDataStore] = useState([]);
    const [storeDefault, setStoreDefault] = useState();
    // Load data
    useEffect(() => {
        getListStore();
    }, []);

    // get data city
    const getListStore = async () => {
        const payload = await {
            params: {
                loai: 21,
                idcuahang:0,
                idvaitro: 1
            },
            onSuccess: (data) => {
                handleData(data);
            },
            onError: () => {
                showMessage({
                    duration: 3000,
                    message: 'Load danh sách cửa hàng thất bại',
                    type: 'danger',
                  });
            },
        }
        await dispatch(commonActions.getListStore(payload));
    }
    // handle data city
    const handleData = async (data) => {
        const transformedData = [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            const dataItem = {
                value: index.toString(),
                label: item?.TenCuaHang,
                val: item?.IDCuaHang,
            };
            if (item?.IDCuaHang ==defaultStore ) {
                setStoreDefault(index.toString());
            }
            transformedData.push(dataItem);
        }
        await setDataStore(transformedData);
    };
    // find cty select
    const handleSelectValue = value=>{
        const dataFind = dataStore.find((item) => item.value == value);
        if(dataFind)
        getDataSelect({IDCuaHang:dataFind?.val, TenCuaHang:dataFind?.label});
    } 
    return (
        <View>
            <StorePicker
                title={'Cửa hàng'}
                data={dataStore}
                style={styles.styleSelectBox}
                labelStyle={styles.labelStyleSelect}
                defaultValue={storeDefault}
                itemKey={dataStore?.value}
                searchable={true}
                searchPlaceholder={"Tìm kiếm..."}
                onOpen ={handleData}
                onSelect={value => handleSelectValue(value)}
                listMode={'MODAL'}
            />
        </View>

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