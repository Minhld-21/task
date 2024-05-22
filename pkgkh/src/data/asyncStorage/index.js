import { ListCustomer } from '~data/dataCustomer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_DATA_CUSTOMER = '@dataCustomer';

const KEY_USER_DATA = '@userData';
const KEY_USER_TOKEN = '@userToken';
const KEY_USER_REFRESH_TOKEN = '@userRefreshToken';

export default class LocalDB {
    static async setDataCustomer(dataCustomer) {
        const  s= JSON.stringify(dataCustomer);
        await AsyncStorage.setItem(KEY_DATA_CUSTOMER, JSON.stringify(dataCustomer));
    }
    static async getDataCustomer () {
        return AsyncStorage.getItem(KEY_DATA_CUSTOMER).then((json) => JSON.parse(json));
    }
    static async setUserData(userData) {
        await AsyncStorage.setItem(KEY_USER_DATA, JSON.stringify(userData));
    }

    static async getUserData() {
        return AsyncStorage.getItem(KEY_USER_DATA).then((json) => JSON.parse(json));
    }
    static async setUserToken(userData) {
        await AsyncStorage.setItem(KEY_USER_TOKEN, JSON.stringify(userData));
    }

    static async setUserRefreshToken(userData) {
        await AsyncStorage.setItem(KEY_USER_REFRESH_TOKEN, JSON.stringify(userData));
    }

    static async getUserToken() {
        return AsyncStorage.getItem(KEY_USER_TOKEN).then((json) =>
            JSON.parse(json),
        );
    }

    static async getUserRefreshToken() {
        return AsyncStorage.getItem(KEY_USER_REFRESH_TOKEN).then((json) =>
            JSON.parse(json),
        );
    }

    static async logOut() {
        await AsyncStorage.multiRemove([
            KEY_USER_TOKEN,
            KEY_USER_DATA,
            KEY_USER_REFRESH_TOKEN,
        ]);
    }
}