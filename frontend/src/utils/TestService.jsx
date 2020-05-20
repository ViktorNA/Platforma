import instance from './AxiosInstance.jsx';
import axios from 'axios';
import { BASE_URL } from './Constants.jsx';
import { getToken } from './LocalStorageService.jsx';

const dataFull = {
  duration: 20000,
  graph: [1, 2, 2, 3, 4, 3, 2, 1, 3, 2, 3, 4, 2, 3],
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

const data = {
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

export const saveTestMock = () => {
  axios.post(`${BASE_URL}tests`, data, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const saveFullTestMock = () => {
  axios.post(`${BASE_URL}tests`, dataFull, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const getTests = () => {
  instance.get('tests');
};
