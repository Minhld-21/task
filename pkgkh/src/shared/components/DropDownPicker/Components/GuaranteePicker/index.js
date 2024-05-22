import React, { useState, useEffect } from "react";
import { showMessage } from 'react-native-flash-message';
import { View,StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import { Colors, Sizes, parseSize } from '~theme';
import { managerActions } from '~reduxCore/reducers';
import GuaranteePicker from '~components/DropDownPicker';

export default Index = props => {
    const dispatch = useDispatch();
    const { defaultGuarantee, getDataSelect } = props;
    const [dataGuarantee, setDataGuarantee] = useState([]);
    const [guaranteeDefault, setGuaranteeDefault] = useState();
    // Load data
    useEffect(() => {
        getListGuarantee();
    }, []);

    // get data city
    const getListGuarantee = async () => {
        const payload = await {
            params: {
                loai: 23,
            },
            onSuccess: (data) => {
                handleData(data);
            },
            onError: () => {
                showMessage({
                    duration: 3000,
                    message: 'Load danh sách bảo hành thất bại',
                    type: 'danger',
                  });
            },
        }
        await dispatch(managerActions.getGuaranteeProduct(payload));
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
            if (item?.value ==defaultGuarantee ) {
                setGuaranteeDefault(index.toString());
            }
            transformedData.push(dataItem);
        }
        await setDataGuarantee(transformedData);
    };
    // find cty select
    const handleSelectValue = value=>{
        const dataFind = dataGuarantee.find((item) => item.value == value);
        if(dataFind)
        getDataSelect({id:dataFind?.val});
    } 
    return (
        <View>
            <GuaranteePicker
                title={'Thời gian bảo hành'}
                data={dataGuarantee}
                style={styles.styleSelectBox}
                labelStyle={styles.labelStyleSelect}
                defaultValue={guaranteeDefault}
                itemKey={dataGuarantee?.value}
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