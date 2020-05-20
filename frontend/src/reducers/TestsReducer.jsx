import { SET_POSITIONS, TOGGLE_TEST } from '../actions/Tests.jsx';

const initialState = {
  positionX: 50,
  positionY: 50,
  isTestStarted: false,
};

const TestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSITIONS:
      {
        const { positionX, positionY } = action;
        return {
          ...state,
          positionY,
          positionX,
        };
      }
      break;
    case TOGGLE_TEST: {
      const { isTestStarted } = action;
      return {
        ...state,
        isTestStarted,
      };
    }
    default: {
      return state;
    }
  }
};

export default TestsReducer;
