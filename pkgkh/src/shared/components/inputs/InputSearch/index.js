import React from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';


const Index = props => {
    const {value, placeholder, getString, onSearch } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.wrapInputSearch}>
                    <TouchableOpacity onPress={() => onSearch()}>
                        <Icon name="search" style={styles.iconSearch} />
                    </TouchableOpacity>
                        <TextInput
                            value={value}
                            onChangeText={text => getString(text)}
                            onSubmitEditing={() => onSearch()}
                            style={styles.textInputSearch}
                            placeholder={placeholder}
                            returnKeyType={"search"}
                        />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Index;
