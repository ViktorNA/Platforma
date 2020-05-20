import { combineReducers, createStore } from 'redux';
import TestsReducer from './TestsReducer.jsx';
import GlobalReducer from './GlobalReducer.jsx';

const reducers = combineReducers({
  tests: TestsReducer,
  globals: GlobalReducer,
});
const store = createStore(reducers);

export default store;
