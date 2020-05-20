import { ACCESS_TOKEN, IS_ADMIN, USERNAME } from './Constants.jsx';

export const setToken = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN);
};

export const setUsername = (username) => {
  window.localStorage.setItem(USERNAME, username);
};

export const getUsername = () => {
  return window.localStorage.getItem(USERNAME);
};

export const setIsAdmin = (isAdmin) => {
  window.localStorage.setItem(IS_ADMIN, isAdmin);
};

export const getIsAdmin = () => {
  return window.localStorage.getItem(IS_ADMIN) === 'true';
};
