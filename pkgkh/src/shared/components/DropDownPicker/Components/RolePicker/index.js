import React, { useState, useEffect } from "react";
import { showMessage } from 'react-native-flash-message';
import { View,StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import { Colors, Sizes, parseSize } from '~theme';
import { commonActions } from '~reduxCore/reducers';
import RolePicker from '~components/DropDownPicker';

export default Index = props => {
    const dispatch = useDispatch();
    const { defaultRole, getDataSelect } = props;
    const [dataRole, setDataRole] = useState([]);
    const [roleDedault, setRoleDedault] = useState();
    // Load data
    useEffect(() => {
        GetListRole();
    }, []);

    // get data city
    const GetListRole = async () => {
        const payload = await {
            params: {
                loai: 4,
                idvaitro: 1,
            },
            onSuccess: (data) => {
                handleData(data);
            },
            onError: () => {
                showMessage({
                    duration: 3000,
                    message: 'Load danh sách phân quyền không thành công',
                    type: 'danger',
                  });
            },
        }
        await dispatch(commonActions.getListRole(payload));
    }
    // handle data city
    const handleData = async (data) => {
        const transformedData = [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            const dataItem = {
                value: index.toString(),
                label: item?.label,
                val: item?.value,
            };
            if (item?.value ==defaultRole ) {
                setRoleDedault(index.toString());
            }
            transformedData.push(dataItem);
        }
        await setDataRole(transformedData);
    };
    // find cty select
    const handleSelectValue = value=>{
        const dataFind = dataRole.find((item) => item.value == value);
        if(dataFind)
        getDataSelect({IDVaiTro:dataFind?.val, VaiTro:dataFind?.label});
    } 
    return (
        <View>
            <RolePicker
                title={'Vị trí công việc'}
                data={dataRole}
                style={styles.styleSelectBox}
                labelStyle={styles.labelStyleSelect}
                defaultValue={roleDedault}
                itemKey={dataRole?.value}
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