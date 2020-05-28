import store from '../store/store';
import {setRoterScreen} from '../store/RouterActioins';

export const setScreenFunc = screen => {
  store.dispatch(setRoterScreen(screen));
};
