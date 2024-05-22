import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

import HeaderBar from '~components/HeaderBar';
import {Colors, Sizes, parseSize, Width} from '~theme';
import HeaderTitle from '~components/HeaderTitle';
import RadioButton from '~shared/components/RadioButton';
import CustomerPicker from '~shared/components/DropDownPicker/Components/CustomerPicker';
import InputLabelValueText from '~shared/components/inputs/InputLabelValueText';
import ButtonWithText from '~shared/components/Buttons/ButtonWithText';
import {commonActions} from '~reduxCore/reducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [cutomerSelect, setCustomerSelect] = useState();
  const [optionPush, setOptionPush] = useState(1);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const options = [
    {label: 'Gửi tất cả khách', value: 1},
    {label: 'Chọn khách gửi', value: 2},
  ];

  // handle push notification
  const pushNotify = async () => {
    await dispatch(commonActions.toggleLoading(true));
    const payload = await {
      params: {
        to: optionPush === 1 ? '/topics/phuckhangshop' : cutomerSelect?.token,
        title: title,
        body: body,
      },
      onSuccess: async () => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: `${t('sendNotifySuccess')}`,
          type: 'success',
        });
      },
      onError: async error => {
        await dispatch(commonActions.toggleLoading(false));
        showMessage({
          duration: 3000,
          message: error,
          type: 'danger',
        });
      },
    };
    await dispatch(commonActions.pushNotify(payload));
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <HeaderTitle nameHeaderTitle={t('createNotify')} />
      <KeyboardAwareScrollView style={styles.content}>
        <RadioButton
          styleContainer={styles.containerRadio}
          options={options}
          selected={optionPush}
          onValueChange={value => setOptionPush(value)}
        />
        {optionPush === 2 ? (
          <CustomerPicker getDataSelect={data => setCustomerSelect(data)} />
        ) : null}
        <InputLabelValueText
          titleLabel={t('title')}
          value={title}
          maxLength={500}
          changeText={value => setTitle(value)}
        />
        <InputLabelValueText
          titleLabel={t('body')}
          value={body}
          styleText={styles.textNote}
          maxLength={1000}
          numberOfLines={2}
          multiline={true}
          returnKeyType={'done'}
          changeText={value => setBody(value)}
        />
        <ButtonWithText
          styleButton={styles.buttonReister}
          title={t('pushNotify')}
          onPress={() => pushNotify()}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    paddingHorizontal: Sizes.margin,
  },
  containerRadio: {
    flexDirection: 'row',
    marginHorizontal: Sizes.magin,
  },
  textNote: {
    height: parseSize(80),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 12,
    color: Colors.dark,
  },
});
