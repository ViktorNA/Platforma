import {combineReducers} from 'redux';
import PointsReducer from './PointsReducer';
import RouterReducer from './RouterReducer';

export default combineReducers({points: PointsReducer, router: RouterReducer});
