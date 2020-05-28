import axios from 'axios';
import {BASE_URL} from './constants';
import {getToken} from './storageService';

const headers = async () => {
  const token = await getToken();
  return {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const saveTestMock = async data => {
  const config = await headers();
  try {
    await axios.post(`${BASE_URL}tests`, data, config);
  } catch (e) {
    console.log(e);
  }
};

const ndata = {
  duration: 20000,
  id: 1,
  matrix: {
    actions: [
      {
        positionX: 2,
        positionY: 40,
      },
      {
        positionX: 20,
        positionY: 12,
      },
      {
        positionX: 90,
        positionY: 70,
      },
    ],
    times: [5000, 3000, 1000],
  },
  testType: 'RombergTest',
};
