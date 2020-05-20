import axios from 'axios';
import { BASE_URL } from './Constants.jsx';
import { getToken } from './LocalStorageService.jsx';

export default axios.create({
  baseURL: BASE_URL,
  transformRequest: (data, headers) => {
    headers.Authorization = `Bearer ${getToken()}`;
    return data || {};
  },
});
