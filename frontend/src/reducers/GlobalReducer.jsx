import { SET_DEVICE_ANSWER } from '../actions/GlobalActions.jsx';

const initialState = {
  isDevice: false,
};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE_ANSWER:
      {
        return {
          ...state,
          isDevice: action.isDevice,
        };
      }
      break;
    default: {
      return state;
    }
  }
};

export default GlobalReducer;
