export const ADD_POINT = 'ADD_POINT';

export const addPoint = (x, y) => {
  return {
    type: ADD_POINT,
    x,
    y,
  };
};
