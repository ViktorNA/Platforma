import axios from 'axios';
import { BASE_URL } from './Constants.jsx';
import { setIsAdmin, setToken, setUsername } from './LocalStorageService.jsx';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const signIn = async (usernameOrEmail, password) => {
  try {
    const res = await instance.post('auth/signIn', {
      usernameOrEmail,
      password,
    });
    const { accessToken, username, roles } = res.data;
    setToken(accessToken);
    setUsername(username);
    setIsAdmin(roles.some((role) => role.name === 'ADMIN'));
    return { status: res.status };
  } catch (error) {
    const { status, message } = error.response.data;
    return { status, message };
  }
};

export const signUp = async (username, email, name, password) => {
  try {
    const res = await instance.post('auth/signUp', {
      username,
      email,
      name,
      password,
    });
    setToken(res.data.accessToken);
    setUsername(res.data.username);
    return { status: res.status };
  } catch (error) {
    const { status, message } = error.response.data;
    return { status, message };
  }
};
