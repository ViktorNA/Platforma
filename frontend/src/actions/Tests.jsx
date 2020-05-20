export const SET_POSITIONS = 'SET_POSITIONS';
export const TOGGLE_TEST = 'TOGGLE_TEST';

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
