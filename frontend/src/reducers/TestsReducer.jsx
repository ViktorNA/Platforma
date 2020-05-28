import { SET_MATRIX, SET_POSITIONS, TOGGLE_TEST } from '../actions/Tests.jsx';

const initialState = {
  positionX: 50,
  positionY: 50,
  isTestStarted: false,
  matrix: {
    actions: [],
    times: [],
  },
};

const TestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSITIONS: {
      const { positionX, positionY } = action;
      return {
        ...state,
        positionY,
        positionX,
      };
    }
    case TOGGLE_TEST: {
      const { isTestStarted } = action;
      return {
        ...state,
        isTestStarted,
      };
    }
    case SET_MATRIX: {
      const { matrix } = action;
      return {
        ...state,
        matrix,
      };
    }
    default: {
      return state;
    }
  }
};

export default TestsReducer;
