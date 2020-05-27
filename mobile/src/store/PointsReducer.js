import {ADD_POINT} from './PointsActions';

const initialState = {
  points: [1, 2, 2, 21, 4, 2, 31, 0, 4, 5, 5, 5, 5],
};

const PointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINT:
      {
        const {points} = state;
        return {
          ...state,
          points: [...points, action.x, action.y],
        };
      }
      break;
    default:
      return state;
  }
};

export default PointsReducer;
