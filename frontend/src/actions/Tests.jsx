export const SET_POSITIONS = 'SET_POSITIONS';
export const TOGGLE_TEST = 'TOGGLE_TEST';
export const SET_MATRIX = 'SET_MATRIX';

export const setPositions = (positionX, positionY) => ({
  type: SET_POSITIONS,
  positionX,
  positionY,
});

export const startTest = () => {
  return {
    type: TOGGLE_TEST,
    isTestStarted: true,
  };
};

export const stopTest = () => {
  return {
    type: TOGGLE_TEST,
    isTestStarted: false,
  };
};

export const setMatrix = (matrix) => {
  return {
    type: SET_MATRIX,
    matrix,
  };
};
