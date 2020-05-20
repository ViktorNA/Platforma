import instance from './AxiosInstance.jsx';
import axios from 'axios';
import { getToken } from './LocalStorageService.jsx';
import { BASE_URL } from './Constants.jsx';

export const getAllTags = async () => {
  try {
    const res = await instance.get(`tags`);
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    return { status, message };
  }
};

export const getTagsByName = async (name) => {
  try {
    const res = await instance.get(`tags/findAllByName/${name}`);
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    return { status, message };
  }
};

export const getTagById = async (tagId) => {
  try {
    const res = await instance.get(`tags/${tagId}`);
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    return { status, message };
  }
};

export const createTag = async (name) => {
  try {
    const res = await axios.post(
      `${BASE_URL}tags`,
      { name },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    return { status, message };
  }
};
