import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = (item, value) => {
  try {
    console.log('AsyncStorage save ' + item, value);
    AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.warn('AsyncStorage error save: ' + error.message);
  }
};

export const get = item => {
  return AsyncStorage.getItem(item).then(res => {
    if (res && res.length) {
      console.log('AsyncStorage get ' + item, res);
      return JSON.parse(res);
    } else {
      console.warn('AsyncStorage error get ' + item, res);
      return false;
    }
  });
};

export const deleteAsyn = item => {
  return AsyncStorage.removeItem(item)
    .then(() => {
      console.log('AsyncStorage remove ' + item);
    })
    .catch(err => {
      console.warn('AsyncStorage error remove' + item);
    });
};
