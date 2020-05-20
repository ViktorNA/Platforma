export const SET_DEVICE_ANSWER = 'SET_DEVICE_ANSWER';

export const setDeviceAnswer = (isDevice) => {
  return {
    type: SET_DEVICE_ANSWER,
    isDevice,
  };
};
