import React, { useState, useEffect } from "react";
import { showMessage } from 'react-native-flash-message';
import { View,StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import { Colors, Sizes, parseSize } from '~theme';
import { managerActions } from '~reduxCore/reducers';
import UnitPicker from '~components/DropDownPicker';

export default Index = props => {
    const dispatch = useDispatch();
    const { defaultUnit, getDataSelect } = props;
    const [dataUnit, setDataUnit] = useState([]);
    const [unitDefault, setUnitDefault] = useState();
    // Load data
    useEffect(() => {
        getListUnit();
    }, []);

    // get data city
    const getListUnit = async () => {
        const payload = await {
            params: {
                loai: 20,
            },
            onSuccess: (data) => {
                handleData(data);
            },
            onError: () => {
                showMessage({
                    duration: 3000,
                    message: 'Load danh sách  đơn vị tính thất bại',
                    type: 'danger',
                  });
            },
        }
        await dispatch(managerActions.getUnitProduct(payload));
    }
    // handle data city
    const handleData = async (data) => {
        const transformedData = [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            const dataItem = {
                value: index.toString(),
                label: item?.TenDonViTinh,
                val: item?.IDDonViTinh,
            };
            if (item?.IDDonViTinh ==defaultUnit ) {
                setUnitDefault(index.toString());
            }
            transformedData.push(dataItem);
        }
        await setDataUnit(transformedData);
    };
    // find cty select
    const handleSelectValue = value=>{
        const dataFind = dataUnit.find((item) => item.value == value);
        if(dataFind)
        getDataSelect({id:dataFind?.val});
    } 
    return (
        <View>
            <UnitPicker
                title={'Đơn vị tính'}
                data={dataUnit}
                style={styles.styleSelectBox}
                labelStyle={styles.labelStyleSelect}
                defaultValue={unitDefault}
                itemKey={dataUnit?.value}
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