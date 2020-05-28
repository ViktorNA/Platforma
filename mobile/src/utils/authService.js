import {BASE_URL} from './constants';
import axios from 'axios';
import {setToken, setUsername, setIsAdmin} from './storageService';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const signIn = async (usernameOrEmail, password) => {
  try {
    const res = await instance.post('auth/signIn', {
      usernameOrEmail,
      password,
    });
    const {accessToken, username, roles} = res.data;
    await setToken(accessToken);
    await setUsername(username);
    await setIsAdmin(
      roles.some(role => role.name === 'ADMIN') ? 'true' : 'false',
    );
    return {status: res.status};
  } catch (error) {
    const {status, message} = error.response.data;
    return {status, message};
  }
};
