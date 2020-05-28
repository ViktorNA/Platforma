import {ACCESS_TOKEN, IS_ADMIN, USERNAME} from './constants';
import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async token => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  } catch (e) {
    // saving error
  }
};

export const setUsername = async username => {
  try {
    await AsyncStorage.setItem(USERNAME, username);
  } catch (e) {
    // saving error
  }
};

export const getUsername = async () => {
  return await AsyncStorage.getItem(USERNAME);
};

export const setIsAdmin = async isAdmin => {
  try {
    await AsyncStorage.setItem(IS_ADMIN, isAdmin);
  } catch (e) {
    // saving error
  }
};

export const getIsAdmin = async () => {
  return (await AsyncStorage.getItem(IS_ADMIN)) === 'true';
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
