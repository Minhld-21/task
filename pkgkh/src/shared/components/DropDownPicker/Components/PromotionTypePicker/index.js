import React, { useState, useEffect } from "react";
import { showMessage } from 'react-native-flash-message';
import { View,StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import { Colors, Sizes, parseSize } from '~theme';
import { managerActions } from '~reduxCore/reducers';
import PromotionPicker from '~components/DropDownPicker';

export default Index = props => {
    const dispatch = useDispatch();
    const { defaultPromotion, getDataSelect } = props;
    const [dataPromotion, setDataPromotion] = useState([]);
    const [promotionDedault, setPromotionDedault] = useState();
    // Load data
    useEffect(() => {
        GetTypePromotion();
    }, []);

    // get data city
    const GetTypePromotion = async () => {
        const payload = await {
            params: {
                loai: 6,
            },
            onSuccess: (data) => {
                handleData(data);
            },
            onError: () => {
                showMessage({
                    duration: 3000,
                    message: 'Load danh sách loại khuyễn mãi không thành công',
                    type: 'danger',
                  });
            },
        }
        await dispatch(managerActions.getTypePromotion(payload));
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
            if (item?.value ==defaultPromotion ) {
                setPromotionDedault(index.toString());
            }
            transformedData.push(dataItem);
        }
        await setDataPromotion(transformedData);
    };
    // find cty select
    const handleSelectValue = value=>{
        const dataFind = dataPromotion.find((item) => item.value == value);
        if(dataFind)
        getDataSelect({loaiKhuyenMai:dataFind?.val, tenLoaiKhuyenMai:dataFind?.label});
    } 
    return (
        <View>
            <PromotionPicker
                title={'Loại khuyến mãi'}
                data={dataPromotion}
                style={styles.styleSelectBox}
                labelStyle={styles.labelStyleSelect}
                defaultValue={promotionDedault}
                itemKey={dataPromotion?.value}
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